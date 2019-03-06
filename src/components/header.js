import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";

const Title = styled(Link)`
  display: inline-block;
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
  padding: 2em 0;
  margin: 2em 0;
  border-bottom: 1px solid #00000033;
  color: #333;
  text-decoration: none;
  width: 100%;
`;

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <Title to="/">{data.site.siteMetadata.title}</Title>}
  />
);
