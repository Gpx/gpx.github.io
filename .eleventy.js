const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("AGENTS.md");
  eleventyConfig.addPassthroughCopy("main.css");
  eleventyConfig.addPassthroughCopy("code.css");
  eleventyConfig.addPassthroughCopy("theme.js");
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

    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
    });
  });
};
