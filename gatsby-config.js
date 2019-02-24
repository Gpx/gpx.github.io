module.exports = {
  siteMetadata: {
    title: "My Blog"
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "src", path: `${__dirname}/src/` }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false
            }
          }
        ]
      }
    }
  ]
};
