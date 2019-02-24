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

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <article>
        <h1>
          {post.frontmatter.title}
          <Meta>
            {post.frontmatter.date} &middot; {post.timeToRead} min read
          </Meta>
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
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
