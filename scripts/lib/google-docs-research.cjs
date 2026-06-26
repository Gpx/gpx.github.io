const fs = require("fs");
const path = require("path");
const {
  slugify,
  buildResearchPost,
  summarizeMathConversion,
  resolveTags,
} = require("./gemini-research.cjs");

function docIdFromUrl(url) {
  const match = String(url).match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function normalizeGoogleDocUrl(url) {
  const id = docIdFromUrl(url);
  if (!id) return url;
  return `https://docs.google.com/document/d/${id}/edit`;
}

/** Runs in the browser on a Google Doc HTML export page. */
function extractGdocContent() {
  function unwrapGoogleUrl(href) {
    try {
      const u = new URL(href);
      if (u.searchParams.has("q")) return u.searchParams.get("q");
    } catch {
      /* ignore */
    }
    return href;
  }

  function getBoldClasses() {
    const bold = new Set();
    const styleText = document.querySelector("style")?.textContent || "";
    for (const match of styleText.matchAll(
      /\.([a-zA-Z0-9_-]+)\{[^}]*font-weight:\s*(?:700|bold)/g
    )) {
      bold.add(match[1]);
    }
    return bold;
  }

  function getMonospaceClasses() {
    const mono = new Set();
    const styleText = document.querySelector("style")?.textContent || "";
    for (const match of styleText.matchAll(
      /\.([a-zA-Z0-9_-]+)\{[^}]*font-family:[^;}]*(?:Roboto Mono|Courier|Consolas|monospace)/gi
    )) {
      mono.add(match[1]);
    }
    return mono;
  }

  const boldClasses = getBoldClasses();
  const monoClasses = getMonospaceClasses();

  function isCitationSpan(el) {
    if (el.tagName !== "SPAN") return false;
    const text = el.textContent.trim();
    if (!/^\d{1,2}$/.test(text)) return false;
    const style = window.getComputedStyle(el);
    return (
      style.verticalAlign === "super" ||
      el.classList.contains("c5") ||
      el.classList.contains("c15")
    );
  }

  function isBold(el) {
    if (el.tagName !== "SPAN") return false;
    for (const cls of el.classList) {
      if (boldClasses.has(cls)) return true;
    }
    return false;
  }

  function isCode(el) {
    if (el.tagName !== "SPAN") return false;
    for (const cls of el.classList) {
      if (monoClasses.has(cls)) return true;
    }
    const ff = window.getComputedStyle(el).fontFamily || "";
    return /mono|courier|consolas/i.test(ff);
  }

  function inlineMarkdown(el) {
    let out = "";
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        out += node.textContent;
      } else if (node.nodeName === "SPAN") {
        if (isCitationSpan(node)) {
          /* superscript citation numbers — bibliography only, not inline */
        } else if (isCode(node)) {
          const inner = inlineMarkdown(node).trim();
          out += inner ? `\`${inner}\`` : "";
        } else if (isBold(node)) {
          const inner = inlineMarkdown(node).trim();
          out += inner ? `**${inner}**` : "";
        } else {
          out += inlineMarkdown(node);
        }
      } else if (node.nodeName === "A") {
        out += `[${node.textContent.trim()}](${unwrapGoogleUrl(node.href)})`;
      } else if (node.nodeName === "BR") {
        out += "\n";
      } else {
        out += inlineMarkdown(node);
      }
    }
    return out;
  }

  function tableToMd(table) {
    const rows = Array.from(table.querySelectorAll("tr")).map((tr) =>
      Array.from(tr.querySelectorAll("th,td")).map((cell) =>
        inlineMarkdown(cell).replace(/\|/g, "\\|").replace(/\n/g, " ").trim()
      )
    );
    if (!rows.length) return "";
    const header = `| ${rows[0].join(" | ")} |`;
    const sep = `| ${rows[0].map(() => "---").join(" | ")} |`;
    return [header, sep, ...rows.slice(1).map((r) => `| ${r.join(" | ")} |`)].join("\n");
  }

  function blockToMd(el) {
    const tag = el.tagName;
    if (tag === "H1") return null;
    if (tag === "H2") return `\n## ${el.innerText.trim()}\n`;
    if (tag === "H3") return `\n### ${el.innerText.trim()}\n`;
    if (tag === "H4") return `\n#### ${el.innerText.trim()}\n`;
    if (tag === "P") {
      const text = inlineMarkdown(el).replace(/\s+/g, " ").trim();
      return text ? `${text}\n` : "";
    }
    if (tag === "TABLE") return `\n${tableToMd(el)}\n`;
    if (tag === "UL") {
      const items = Array.from(el.querySelectorAll(":scope > li")).map(
        (li) => `- ${inlineMarkdown(li).replace(/\s+/g, " ").trim()}`
      );
      return items.length ? `${items.join("\n")}\n` : "";
    }
    if (tag === "OL") {
      const items = Array.from(el.querySelectorAll(":scope > li")).map(
        (li, i) => `${i + 1}. ${inlineMarkdown(li).replace(/\s+/g, " ").trim()}`
      );
      return items.length ? `${items.join("\n")}\n` : "";
    }
    return "";
  }

  const worksHeading = Array.from(document.querySelectorAll("h2, h3, h4, h5")).find((h) =>
    /^works cited$/i.test(h.innerText.trim())
  );

  const parts = [];
  for (const child of document.body.children) {
    if (child === worksHeading) break;
    const md = blockToMd(child);
    if (md) parts.push(md);
  }

  const sources = [];
  if (worksHeading) {
    const list = worksHeading.nextElementSibling;
    const items = list ? list.querySelectorAll(":scope > li") : [];
    items.forEach((li, index) => {
      const link = li.querySelector("a[href^='http']");
      if (!link) return;
      const url = unwrapGoogleUrl(link.href);
      let title = li.innerText
        .replace(link.innerText, "")
        .replace(/,?\s*accessed\b[\s\S]*$/i, "")
        .replace(/\s+/g, " ")
        .trim();
      if (!title) title = url.replace(/^https?:\/\//, "");
      sources.push({ title, url });
    });
  }

  const title = document.querySelector("h1")?.innerText.trim() || "Untitled";
  return { title, body: parts.join("\n"), sources };
}

async function extractFromGoogleDoc(page, docUrl) {
  const id = docIdFromUrl(docUrl);
  if (!id) throw new Error("Invalid Google Doc URL");

  const exportUrl = `https://docs.google.com/document/d/${id}/export?format=html`;
  const response = await fetch(exportUrl);
  if (!response.ok) {
    throw new Error(`Failed to export Google Doc (${response.status})`);
  }
  const html = await response.text();
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  const data = await page.evaluate(extractGdocContent);

  return {
    meta: {
      title: data.title,
      slug: slugify(data.title),
      date: new Date().toISOString().slice(0, 10),
      googleDoc: normalizeGoogleDocUrl(docUrl),
      draft: false,
    },
    body: data.body,
    sources: data.sources,
  };
}

function writePost(data, options = {}) {
  const slug = options.slug || data.meta.slug;
  const outPath = options.out || path.join(process.cwd(), "posts", `${slug}.md`);
  const meta = {
    ...data.meta,
    slug,
    date: options.date || data.meta.date,
    draft: options.draft ?? data.meta.draft ?? false,
    googleDoc: options.doc || data.meta.googleDoc,
    geminiShare: options.geminiShare || data.meta.geminiShare,
    tags: resolveTags(options, outPath),
  };
  fs.writeFileSync(outPath, buildResearchPost({ meta, body: data.body, sources: data.sources }));
  return { outPath, math: summarizeMathConversion(data.body), tags: meta.tags };
}

function saveFixture(data, docUrl) {
  const id = docIdFromUrl(docUrl) || data.meta.slug;
  const dir = path.join(process.cwd(), "scripts", "fixtures");
  fs.mkdirSync(dir, { recursive: true });
  const fixturePath = path.join(dir, `gdoc-${id}.json`);
  fs.writeFileSync(fixturePath, JSON.stringify(data, null, 2));
  return fixturePath;
}

function loadFixture(fixturePath) {
  return JSON.parse(fs.readFileSync(fixturePath, "utf8"));
}

module.exports = {
  docIdFromUrl,
  normalizeGoogleDocUrl,
  extractGdocContent,
  extractFromGoogleDoc,
  writePost,
  saveFixture,
  loadFixture,
};
