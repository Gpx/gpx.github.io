import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";
import Header from "../components/header";
import Img from "gatsby-image";

const Posts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2em;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  > *:first-child {
    grid-column: 1 / 3;

    .gatsby-image-wrapper {
      height: 16vw;
    }

    .title {
      font-size: 1.7em;
    }

    @media (max-width: 768px) {
      grid-column: 1;

      .gatsby-image-wrapper {
        height: auto;
      }

      .title {
        font-size: 1.2em;
      }
    }
  }

  .gatsby-image-wrapper {
    height: 7vw;

    @media (max-width: 768px) {
      height: auto;
    }
  }
`;

const Post = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.div.attrs({ className: "title" })`
  margin-top: 0.4em;
  font-size: 1.2em;
  font-weight: 600;
`;

const Index = ({ data }) => (
  <>
    <Header />
    <Layout wide>
      <Posts>
        {data.allMarkdownRemark.edges.map(({ node: post }) => {
          return (
            <Link
              key={post.id}
              to={post.fields.slug}
              style={{ color: "inherit" }}
            >
              <Post>
                {post.frontmatter.cover != null && (
                  <Img
                    fluid={post.frontmatter.cover.file.childImageSharp.fluid}
                  />
                )}
                <Title
                  dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
                />
              </Post>
            </Link>
          );
        })}
      </Posts>
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
          frontmatter {
            title
            cover {
              file {
                childImageSharp {
                  fluid(quality: 100, maxWidth: 600) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Index;
