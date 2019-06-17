module.exports = {
  siteMetadata: {
    title: "Giorgio Polvara's Blog",
    siteUrl: "https://www.polvara.me"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    { resolve: "gatsby-plugin-styled-components", options: {} },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "src", path: `${__dirname}/src/` }
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          { resolve: "gatsby-remark-embed-video", width: 800 },
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
          "@weknow/gatsby-remark-twitter",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 650
            }
          },
          "gatsby-remark-copy-linked-files"
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
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml"
          }
        ]
      }
    }
  ]
};
