import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";

const Title = styled(Link)`
  margin-bottom: 2.5em;
  display: block;
  font-weight: 500;
  font-size: 2rem;
  text-align: center;
  padding: 2em 0;
  color: #fff;
  text-shadow: 1px 0 1px #0004;
  text-decoration: none;
  width: 100%;
  background: #3a6;
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
