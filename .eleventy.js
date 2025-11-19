const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("main.css");
  eleventyConfig.addPassthroughCopy("code.css");
  eleventyConfig.addPassthroughCopy("bundle.js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("android-chrome-512x512.png");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addFilter("figure", (url, description, alt = description) => {
    return `<figure>
      <img src="${url}" alt="${alt}" />
      <figcaption>${description}</figcaption>
    </figure>`;
  });
  eleventyConfig.addFilter("date", function (date) {
    return date.toLocaleDateString("en-US", {
      dateStyle: "medium",
    });
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
      if (tokens[idx].attrGet("href").startsWith("http"))
        tokens[idx].attrPush(["target", "_blank"]);
      return defaultLinkOpen(tokens, idx, options, env, self);
    };

    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
    });
  });
};
