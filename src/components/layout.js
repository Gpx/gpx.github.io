import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

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
    render={data => (
      <div>
        <h1>{data.site.siteMetadata.title}</h1>
        {children}
      </div>
    )}
  />
);
