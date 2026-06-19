const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownItAnchor = require("markdown-it-anchor");
const texmath = require("markdown-it-texmath");
const katex = require("katex");
const { splitResearchTitle } = require("./scripts/lib/gemini-research.cjs");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("AGENTS.md");
  eleventyConfig.addPassthroughCopy("main.css");
  eleventyConfig.addPassthroughCopy("code.css");
  eleventyConfig.addPassthroughCopy("theme.js");
  eleventyConfig.addPassthroughCopy("transitions.js");
  eleventyConfig.addPassthroughCopy("writing-filter.js");
  eleventyConfig.addPassthroughCopy("toc.js");
  eleventyConfig.addPassthroughCopy({
    "node_modules/katex/dist/katex.min.css": "katex.min.css",
    "node_modules/katex/dist/fonts": "katex/fonts",
  });
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("android-chrome-512x512.png");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addFilter("figure", (url, description, alt = description) => {
    return `<figure>
      <img src="${url}" alt="${alt}" loading="lazy" decoding="async" />
      <figcaption>${description}</figcaption>
    </figure>`;
  });
  eleventyConfig.addFilter("date", function (date) {
    return date.toLocaleDateString("en-US", {
      dateStyle: "medium",
    });
  });
  eleventyConfig.addFilter("isoDate", function (date) {
    return date.toISOString().slice(0, 10);
  });
  eleventyConfig.addFilter("tocFromContent", function (html, minH2 = 3) {
    if (!html) return "";

    const decodeEntities = (value) =>
      value
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

    const escape = (value) =>
      value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const headingRe = /<h([23])([^>]*?)id="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/gi;
    const headings = [];
    let match;
    while ((match = headingRe.exec(html)) !== null) {
      headings.push({
        level: match[1],
        id: match[3],
        text: decodeEntities(match[4].replace(/<[^>]+>/g, "").trim()),
      });
    }

    const h2Count = headings.filter((h) => h.level === "2").length;
    if (h2Count < minH2) return "";

    const items = headings
      .map((h) => {
        const cls =
          h.level === "3"
            ? ' class="post-toc-item post-toc-h3"'
            : ' class="post-toc-item"';
        return `<li${cls}><a href="#${h.id}">${escape(h.text)}</a></li>`;
      })
      .join("");

    return `<nav class="post-toc" aria-label="On this page">
  <details class="post-toc-details">
    <summary class="post-toc-label">On this page</summary>
    <ol class="post-toc-list">${items}</ol>
  </details>
</nav>`;
  });
  eleventyConfig.addFilter("splitResearchTitle", splitResearchTitle);
  eleventyConfig.addFilter("topicTagsList", function (tags) {
    if (!tags) return "";
    const list = Array.isArray(tags) ? tags : [tags];
    return list.filter((tag) => tag !== "post").join(",");
  });
  eleventyConfig.addCollection("topicTagsByRecency", function (collectionApi) {
    const posts = collectionApi
      .getFilteredByTag("post")
      .sort((a, b) => b.date - a.date);
    const tagDates = new Map();

    for (const post of posts) {
      const tags = post.data.tags;
      if (!tags) continue;
      const topicTags = Array.isArray(tags) ? tags : [tags];
      for (const tag of topicTags) {
        if (tag === "post") continue;
        if (!tagDates.has(tag)) {
          tagDates.set(tag, post.date);
        }
      }
    }

    return [...tagDates.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, lastUsed]) => ({ name, lastUsed }));
  });
  eleventyConfig.addFilter("vtName", function (url) {
    if (!url) return "none";
    let path = url;
    try {
      path = decodeURIComponent(url);
    } catch (_) {
      /* keep encoded path */
    }
    const safe = path
      .replace(/^\/+|\/+$/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
    return safe ? `vt-${safe}` : "none";
  });
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.amendLibrary("md", (mdLib) => {
    const proxy = (tokens, idx, options, env, self) =>
      self.renderToken(tokens, idx, options);
    const defaultLinkOpen = mdLib.renderer.rules.link_open || proxy;
    mdLib.renderer.rules.link_open = function (
      tokens,
      idx,
      options,
      env,
      self
    ) {
      const href = tokens[idx].attrGet("href");
      if (href.startsWith("http")) {
        tokens[idx].attrPush(["target", "_blank"]);
        tokens[idx].attrPush(["rel", "noopener noreferrer"]);
        const classIndex = tokens[idx].attrIndex("class");
        if (classIndex < 0) {
          tokens[idx].attrPush(["class", "external-link"]);
        } else {
          tokens[idx].attrs[classIndex][1] += " external-link";
        }
      }
      return defaultLinkOpen(tokens, idx, options, env, self);
    };

    mdLib.use(texmath, {
      engine: katex,
      delimiters: "brackets",
      katexOptions: { throwOnError: false },
    });

    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
    });
  });
};
