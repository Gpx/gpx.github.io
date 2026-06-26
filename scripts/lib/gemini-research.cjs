const fs = require("fs");
const path = require("path");

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function shareIdFromUrl(url) {
  const match = String(url).match(/\/share\/([a-f0-9]+)/i);
  return match ? match[1] : null;
}

function yamlEscape(str) {
  return String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/** Split "Main title: Subtitle" on the first colon-space (Deep Research format). */
function splitResearchTitle(rawTitle) {
  const str = String(rawTitle || "").trim();
  const idx = str.indexOf(": ");
  if (idx === -1) {
    return { title: str, subtitle: null };
  }
  return {
    title: str.slice(0, idx).trim(),
    subtitle: str.slice(idx + 2).trim(),
  };
}

function buildSourcesYaml(sources) {
  const lines = ["sources:"];
  for (const src of sources) {
    lines.push(`  - title: "${yamlEscape(src.title)}"`);
    lines.push(`    url: "${src.url}"`);
  }
  return lines.join("\n");
}

function buildTagsYaml(topicTags) {
  const lines = ["tags:", "  - post"];
  for (const tag of topicTags) {
    lines.push(`  - ${tag}`);
  }
  return lines.join("\n");
}

function parseTagsArg(str) {
  return String(str)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function readTopicTagsFromPost(outPath) {
  if (!fs.existsSync(outPath)) return null;
  const content = fs.readFileSync(outPath, "utf8");
  const listMatch = content.match(/^tags:\s*\n((?:\s+-\s+.+\n)+)/m);
  if (listMatch) {
    return listMatch[1]
      .split("\n")
      .map((line) => line.match(/^\s+-\s+(.+)$/))
      .filter(Boolean)
      .map((match) => match[1].trim())
      .filter((tag) => tag !== "post");
  }
  if (/^tags:\s*post\s*$/m.test(content)) {
    return [];
  }
  return null;
}

function resolveTags(options, outPath) {
  if (options.tags) {
    return parseTagsArg(options.tags);
  }
  const existing = readTopicTagsFromPost(outPath);
  if (existing && existing.length) {
    return existing;
  }
  throw new Error(
    "Missing --tags. Pass comma-separated topic tags (e.g. --tags AI,Engineering)."
  );
}

/** One source per Gemini citation carousel index (sequential bibliography list). */
function buildSourcesFromByIndex(byIndex) {
  const sources = [];
  const indices = Object.keys(byIndex)
    .map(Number)
    .sort((a, b) => a - b);

  for (const idx of indices) {
    const links = (byIndex[String(idx)] || []).filter(
      (link) => link.url && !link.url.includes("gemini.google.com")
    );
    if (!links.length) continue;
    sources.push({
      title: links[0].title,
      url: links[0].url,
    });
  }

  return sources;
}

/** @deprecated Use buildSourcesFromByIndex — deduped URLs break citation anchors. */
function buildGlobalSources(byIndex) {
  const sources = [];
  const urlToId = new Map();

  const indices = Object.keys(byIndex)
    .map(Number)
    .sort((a, b) => a - b);

  for (const idx of indices) {
    for (const link of byIndex[String(idx)] || []) {
      if (!link.url || link.url.includes("gemini.google.com")) continue;
      if (urlToId.has(link.url)) continue;
      const id = sources.length + 1;
      urlToId.set(link.url, id);
      sources.push({
        id,
        title: link.title.replace(/^https?:\/\//, ""),
        url: link.url,
      });
    }
  }

  return sources;
}

function stripCitationOnlyLines(body) {
  return body
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return true;
      return trimmed.replace(/(\[\d+\]\(#source-\d+\)\s*)+/g, "").trim() !== "";
    })
    .join("\n");
}

function stripInlineCitations(body) {
  return body.replace(/\s*\[\d+\]\(#source-\d+\)/g, "");
}

const INVISIBLE_CHARS = /[\u200b-\u200d\ufeff]/g;

/** Gemini exports equations as plain text; these helpers convert them to KaTeX/LaTeX on import. */

function exprToLatex(expr) {
  const placeholders = [];
  let s = expr
    .replace(INVISIBLE_CHARS, "")
    .replace(/−/g, "-")
    .replace(/×/g, " \\times ")
    .replace(/÷/g, " \\div ")
    .replace(/Δt([a-z]+)/g, (_, tail) => {
      const key = `@@DT${placeholders.length}@@`;
      placeholders.push(`\\Delta t_{${tail}}`);
      return key;
    })
    .replace(/\b([A-Z])([a-z]+)\b/g, "$1_{$2}");

  for (const [i, latex] of placeholders.entries()) {
    s = s.replace(`@@DT${i}@@`, latex);
  }
  return s;
}

function isFormulaLine(line) {
  const text = line.trim().replace(INVISIBLE_CHARS, "");
  if (!text || text.startsWith("-") || text.startsWith("|") || text.startsWith("#")) {
    return false;
  }
  if (text.length > 200 || /[.!?]$/.test(text)) return false;
  return /^[A-Z][A-Z0-9]*=/.test(text) && /[×÷−]/.test(text);
}

function variableNameToLatex(name) {
  const clean = name.replace(INVISIBLE_CHARS, "");
  const deltaT = clean.match(/^Δt([a-z]+)$/);
  if (deltaT) return `\\Delta t_{${deltaT[1]}}`;
  const sub = clean.match(/^([A-Z])([a-z]+)$/);
  if (sub) return `${sub[1]}_{${sub[2]}}`;
  return clean;
}

function collectFormulaVariables(body) {
  const vars = new Set();
  for (const line of body.split("\n")) {
    if (!isFormulaLine(line)) continue;
    const text = line.trim().replace(INVISIBLE_CHARS, "");
    const match = text.match(/^([A-Z][A-Z0-9]*)=(.+)$/);
    if (!match) continue;
    vars.add(match[1]);
    const expr = match[2].replace(INVISIBLE_CHARS, "");
    for (const m of expr.matchAll(/Δt[a-z]+|[A-Z][a-z]+/g)) {
      vars.add(m[0]);
    }
  }
  return [...vars].sort((a, b) => b.length - a.length);
}

function buildVariablePattern(name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const invisible = "(?:\\u200b|\\u200c|\\u200d|\\ufeff)*";
  if (/^[A-Z]+$/.test(name)) {
    return new RegExp(`(?<![A-Z])${escaped}${invisible}(?![A-Z])`, "gu");
  }
  if (/^Δt[a-z]+$/.test(name)) {
    return new RegExp(`(?<![A-Za-z])${escaped}${invisible}`, "gu");
  }
  return new RegExp(`(?<![A-Za-z])${escaped}${invisible}(?![a-z])`, "gu");
}

function formatInlineVariables(body, variables) {
  if (!variables.length) return body;

  const lines = body.split("\n");
  let inDisplayMath = false;

  return lines
    .map((line) => {
      if (line.trim() === "\\[") {
        inDisplayMath = true;
        return line;
      }
      if (line.trim() === "\\]") {
        inDisplayMath = false;
        return line;
      }
      if (inDisplayMath) return line;

      let result = line;
      for (const name of variables) {
        result = result.replace(buildVariablePattern(name), (match, offset) => {
          const before = result.slice(0, offset);
          const inlineOpens = (before.match(/\\\(/g) || []).length;
          const inlineCloses = (before.match(/\\\)/g) || []).length;
          if (inlineOpens > inlineCloses) return match;
          return `\\(${variableNameToLatex(name)}\\)`;
        });
      }
      return result;
    })
    .join("\n");
}

function formatEquations(body) {
  return body
    .split("\n")
    .map((line) => {
      if (!isFormulaLine(line)) return line;
      const text = line.trim().replace(INVISIBLE_CHARS, "");
      const match = text.match(/^([A-Z][A-Z0-9]*)=(.+)$/);
      if (!match) return line;
      const [, name, expr] = match;
      return `\\[\n${name} = ${exprToLatex(expr)}\n\\]`;
    })
    .join("\n");
}

function summarizeMathConversion(body) {
  const variables = collectFormulaVariables(body);
  const blockFormulas = body.split("\n").filter(isFormulaLine).length;
  return { blockFormulas, variables: variables.length };
}

function cleanBody(body) {
  body = body.replace(/\[[^\]]*\]\(https?:[^)]+\)/g, "");
  body = stripInlineCitations(body);
  body = stripCitationOnlyLines(body);
  const variables = collectFormulaVariables(body);
  body = formatEquations(body);
  body = formatInlineVariables(body, variables);
  body = body.replace(/ {2,}/g, " ");
  body = body.replace(/\n{3,}/g, "\n\n");
  return body.trim();
}

/** Wrap shell commands and code literals that Google Docs exports as plain text. */
function formatInlineCodeLiterals(body) {
  body = body.replace(/(?<!`)rm -rf src\/(?!`)/g, "`rm -rf src/`");
  body = body.replace(
    /\(e\.g\., "Warning: this function only accepts positive integers"\)/g,
    "(e.g., `Warning: this function only accepts positive integers`)"
  );
  return body;
}

/** Strips Gemini junk links, inline citations, and runs math conversion. */
function cleanBodyForPublish(body) {
  body = body.replace(/\[[^\]]*\]\(https?:[^)]+\)/g, "");
  body = stripInlineCitations(body);
  body = stripCitationOnlyLines(body);
  const variables = collectFormulaVariables(body);
  body = formatEquations(body);
  body = formatInlineVariables(body, variables);
  body = formatInlineCodeLiterals(body);
  body = body.replace(/ {2,}/g, " ");
  body = body.replace(/\n{3,}/g, "\n\n");
  return body.trim();
}

function buildResearchPost({ meta, body, sources }) {
  const { title, subtitle } =
    meta.subtitle != null && meta.subtitle !== ""
      ? { title: meta.title, subtitle: meta.subtitle }
      : splitResearchTitle(meta.title);

  const frontmatter = [
    "---",
    buildTagsYaml(meta.tags || []),
    "layout: research.liquid",
    `title: "${yamlEscape(title)}"`,
    subtitle ? `subtitle: "${yamlEscape(subtitle)}"` : null,
    `date: "${meta.date}"`,
    meta.draft ? "eleventyExcludeFromCollections: true" : null,
    meta.geminiShare ? `geminiShare: "${meta.geminiShare}"` : null,
    meta.googleDoc ? `googleDoc: "${meta.googleDoc}"` : null,
    buildSourcesYaml(sources),
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  return `${frontmatter}\n\n${cleanBodyForPublish(body)}\n`;
}

/** Assembles front matter + body from a Gemini extraction (`byIndex`). */
function buildPost({ meta, body, byIndex }) {
  const sources = buildSourcesFromByIndex(byIndex);
  return buildResearchPost({ meta, body, sources });
}

/** Runs inside the browser on gemini.google.com/share/… */
function extractBodyFromPanel() {
  function isCitationOnly(text) {
    return text.replace(/\[\d+\]\(#source-\d+\)/g, "").trim() === "";
  }

  function textOf(el) {
    return Array.from(el.childNodes)
      .map((n) => {
        if (n.nodeType === 3) return n.textContent;
        if (n.nodeName === "SOURCE-FOOTNOTE") return "";
        if (n.nodeName === "B") return `**${n.innerText}**`;
        if (n.nodeName === "I") return `*${n.innerText}*`;
        if (n.nodeName === "CODE") return `\`${n.innerText}\``;
        if (n.nodeName === "A") return `[${n.innerText}](${n.href})`;
        if (n.nodeName === "BR") return "\n";
        return textOf(n);
      })
      .join("");
  }

  function tableToMd(table) {
    const rows = Array.from(table.querySelectorAll("tr")).map((tr) =>
      Array.from(tr.querySelectorAll("th,td")).map((td) =>
        textOf(td).replace(/\|/g, "\\|").trim()
      )
    );
    if (!rows.length) return "";
    const header = `| ${rows[0].join(" | ")} |`;
    const sep = `| ${rows[0].map(() => "---").join(" | ")} |`;
    return [header, sep, ...rows.slice(1).map((r) => `| ${r.join(" | ")} |`)].join("\n");
  }

  const panel = document.querySelector(".markdown-main-panel");
  if (!panel) return "";

  const parts = [];
  for (const child of panel.children) {
    const tag = child.tagName;
    if (tag === "H1") continue;
    if (tag === "H2") parts.push(`\n## ${child.innerText.trim()}\n`);
    else if (tag === "H3") parts.push(`\n### ${child.innerText.trim()}\n`);
    else if (tag === "TABLE-BLOCK" || tag === "TABLE") {
      const t = tag === "TABLE" ? child : child.querySelector("table");
      if (t) parts.push(`\n${tableToMd(t)}\n`);
    } else if (tag === "P" || tag === "DIV") {
      const tableEl = child.querySelector("table");
      if (tableEl) {
        parts.push(`\n${tableToMd(tableEl)}\n`);
      } else {
        const t = textOf(child).replace(/\s+/g, " ").trim();
        if (t && !isCitationOnly(t)) parts.push(`${t}\n`);
      }
    } else if (tag === "OL" || tag === "UL") {
      const items = Array.from(child.querySelectorAll(":scope > li")).map((li, i) =>
        tag === "OL" ? `${i + 1}. ${textOf(li).trim()}` : `- ${textOf(li).trim()}`
      );
      parts.push(`${items.join("\n")}\n`);
    }
  }
  return parts.join("\n");
}

/** Runs inside the browser — opens one citation carousel. */
function openCitationCarousel(index) {
  const panel = document.querySelector(".markdown-main-panel");
  if (!panel) return;
  const sup = panel.querySelector(`sup[data-turn-source-index="${index}"]`);
  if (!sup) return;
  const block =
    sup.closest("p,li,td,blockquote") || sup.closest("h2,h3")?.parentElement;
  const btn = block?.querySelector("sources-carousel-inline button");
  btn?.click();
}

/** Runs inside the browser — reads visible carousel links. */
function readCarouselLinks() {
  return Array.from(document.querySelectorAll("sources-carousel a[href^='http']"))
    .map((a) => ({
      title: a.innerText.replace(/\n.*/s, "").trim() || a.href,
      url: a.href,
    }))
    .filter((l) => !l.url.includes("gemini.google.com"));
}

async function harvestSources(page) {
  const indices = await page
    .locator(".markdown-main-panel sup[data-turn-source-index]")
    .evaluateAll((els) =>
      [...new Set(els.map((e) => e.getAttribute("data-turn-source-index")))].sort(
        (a, b) => Number(a) - Number(b)
      )
    );

  const byIndex = {};
  for (const idx of indices) {
    await page.evaluate(openCitationCarousel, idx);
    await page.waitForTimeout(200);
    const links = await page.evaluate(readCarouselLinks);
    const seen = new Set();
    byIndex[idx] = [];
    for (const link of links) {
      if (seen.has(link.url)) continue;
      seen.add(link.url);
      byIndex[idx].push(link);
    }
  }
  return byIndex;
}

async function extractFromShare(page, shareUrl) {
  await page.goto(shareUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForSelector(".markdown-main-panel h1", { timeout: 120000 });

  const accept = page.getByRole("button", { name: "Accept all" });
  if (await accept.isVisible({ timeout: 2000 }).catch(() => false)) {
    await accept.click();
  }

  const title = await page.locator(".markdown-main-panel h1").innerText();
  const body = await page.locator(".markdown-main-panel").evaluate(extractBodyFromPanel);
  const byIndex = await harvestSources(page);

  return {
    meta: {
      title: title.trim(),
      slug: slugify(title),
      date: new Date().toISOString().slice(0, 10),
      geminiShare: shareUrl,
      draft: false,
    },
    body,
    byIndex,
  };
}

function writePost(data, options = {}) {
  const slug = options.slug || data.meta.slug;
  const outPath =
    options.out || path.join(process.cwd(), "posts", `${slug}.md`);
  const meta = {
    ...data.meta,
    slug,
    date: options.date || data.meta.date,
    draft: options.draft ?? data.meta.draft ?? false,
    geminiShare: options.share || data.meta.geminiShare,
    tags: resolveTags(options, outPath),
  };
  fs.writeFileSync(outPath, buildPost({ meta, body: data.body, byIndex: data.byIndex }));
  return { outPath, math: summarizeMathConversion(data.body), tags: meta.tags };
}

function saveFixture(data, shareUrl) {
  const id = shareIdFromUrl(shareUrl) || data.meta.slug;
  const dir = path.join(process.cwd(), "scripts", "fixtures");
  fs.mkdirSync(dir, { recursive: true });
  const fixturePath = path.join(dir, `gemini-${id}.json`);
  fs.writeFileSync(fixturePath, JSON.stringify(data, null, 2));
  return fixturePath;
}

function loadFixture(fixturePath) {
  return JSON.parse(fs.readFileSync(fixturePath, "utf8"));
}

module.exports = {
  slugify,
  shareIdFromUrl,
  yamlEscape,
  splitResearchTitle,
  buildPost,
  buildResearchPost,
  buildSourcesFromByIndex,
  buildGlobalSources,
  buildSourcesYaml,
  buildTagsYaml,
  parseTagsArg,
  readTopicTagsFromPost,
  resolveTags,
  cleanBody,
  cleanBodyForPublish,
  stripCitationOnlyLines,
  stripInlineCitations,
  formatEquations,
  formatInlineVariables,
  formatInlineCodeLiterals,
  collectFormulaVariables,
  summarizeMathConversion,
  exprToLatex,
  extractBodyFromPanel,
  extractFromShare,
  writePost,
  saveFixture,
  loadFixture,
};
