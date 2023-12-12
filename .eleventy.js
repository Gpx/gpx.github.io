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
  eleventyConfig.addFilter("figure", (url, alt) => {
    return `<figure>
      <img src="${url}" alt="${alt}" />
      <figcaption>${alt}</figcaption>
    </figure>`;
  });
  eleventyConfig.addFilter("date", function (date) {
    return date.toLocaleDateString("en-US", {
      dateStyle: "medium",
    });
  });
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
    })
  );
};
