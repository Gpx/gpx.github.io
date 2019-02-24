import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => (
  <Layout>
    {data.allMarkdownRemark.totalCount}
    <br />
    {data.allFile.edges.map(({ node }) => node.relativePath)}
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Link to={node.fields.slug}>
        {node.frontmatter.title}
        {node.excerpt}
        {node.fields.slug}
      </Link>
    ))}
  </Layout>
);

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
        }
      }
    }
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`;
