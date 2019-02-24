import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";

const Title = styled.div`
  font-size: 1.5em;
  font-weight: 600;
`;

export default ({ data }) => (
  <Layout>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Link key={node.id} to={node.fields.slug} style={{ color: "inherit" }}>
        <Title>{node.frontmatter.title}</Title>
        {node.frontmatter.date} &middot; {node.timeToRead} min read
      </Link>
    ))}
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          timeToRead
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
