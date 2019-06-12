import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Container = styled.div`
  margin-top: 4em;
  padding: 3em 0;
  text-align: right;
  background: #3a6;
  color: #fff;
  text-shadow: 1px 0 1px #0004;
`;

const Content = styled.div`
  max-width: calc(65 * 9px);
  margin: auto;
  > * {
    margin: 0.7em;
  }
  > *:first-child {
    margin-left: 0;
  }
  > *:last-child {
    margin-right: 0;
  }
`;

const Copy = styled.div`
  max-width: calc(65 * 9px);
  margin: auto;
  font-size: 0.85em;
  margin-top: 1em;
`;

export default () => (
  <Container>
    <Content>
      <Link to="/">Home</Link>&middot;<a href="/rss.xml">RSS</a>&middot;
      <a
        href="https://twitter.com/Gpx"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
      &middot;
      <a
        href="https://github.com/Gpx"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </Content>
    <Copy>&copy; 2014&ndash;{new Date().getFullYear()} Giorgio Polvara</Copy>
  </Container>
);
