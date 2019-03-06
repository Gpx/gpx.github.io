import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import "../styles/blog.css";
import Layout from "../components/layout";

const Meta = styled.span`
  display: block;
  font-size: 0.65em;
  font-weight: 400;
  color: #666;
  margin-top: 0.5em;
`;

const Footer = styled.footer`
  font-size: 0.85rem;
  text-align: center;
  margin-bottom: 3rem;
  padding: 0.5em 0;
  background: #e8eaf6;

  a {
    text-decoration: underline;
  }
`;

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <article lang="en">
        <h1>
          <span dangerouslySetInnerHTML={{ __html: post.frontmatter.title }} />
          <Meta>
            {post.frontmatter.date} &middot; {post.timeToRead} min read
          </Meta>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <Footer>
        Would you like to have a civil discussion about this post? Hit me up on{" "}
        <a
          href="https://twitter.com/Gpx"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>
        .
      </Footer>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
