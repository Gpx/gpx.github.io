import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Header from "../components/header";

const Post = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;

export default ({ data }) => (
  <>
    <Header />
    <Layout>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link key={node.id} to={node.fields.slug} style={{ color: "inherit" }}>
          <Post>
            <Title
              dangerouslySetInnerHTML={{ __html: node.frontmatter.title }}
            />
            {node.frontmatter.date} &middot; {node.timeToRead} min read
          </Post>
        </Link>
      ))}
    </Layout>
  </>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
