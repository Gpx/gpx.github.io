module.exports = {
  siteMetadata: {
    title: "Giorgio Polvara's Blog"
  },
  plugins: [
    { resolve: "gatsby-plugin-styled-components", options: {} },
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
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: "EB Garamond",
            subset: ["latin-ext"],
            variants: ["400", "400i", "500", "500i", "600"]
          },
          { family: "Ubuntu Mono" }
        ]
      }
    }
  ]
};
