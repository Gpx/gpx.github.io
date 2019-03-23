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
          },
          { resolve: "gatsby-remark-external-links" },
          "@weknow/gatsby-remark-twitter"
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
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: { trackingId: "UA-40681255-1" }
    }
  ]
};
