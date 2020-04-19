import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";
import BackgroundImage from "gatsby-background-image";

const BackgroundSection = ({ className, children }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "images/bg.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={(data) => {
      const imageData = data.desktop.childImageSharp.fluid;
      return (
        <BackgroundImage
          Tag="header"
          className={className}
          fluid={imageData}
          background="#6eb632"
        >
          {children}
        </BackgroundImage>
      );
    }}
  />
);

const Header = styled(BackgroundSection)`
  height: 90vh;
  width: 100vw;
  background-size: cover;
  background-align: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5em;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Border = styled.div`
  flex-direction: column;
  position: relative;
  height: 90%;
  width: 90%;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;

  @media (max-width: 768px) {
    border: none;
    padding-top: 4em;
  }

  @media (max-width: 576px) {
    padding-top: 1em;
  }
`;

const Text = styled.span`
  color: #fff;
  font-size: 20vmin;
  font-weight: 700;
  line-height: 1;
  text-shadow: 1px 0 2px #0005;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-transform: uppercase;
  text-align: right;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 10vw;
  }

  @media (max-width: 576px) {
    font-size: 11vw;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: baseline;
  position: absolute;
  left: 5%;
  top: 6%;
`;

const MenuItem = styled(Link)`
  color: #fff;
  writing-mode: vertical-lr;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 1.2em;
  border-left: 10px solid #fff;
  margin-right: 1em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-shadow: 1px 0 2px #0005;

  @media (max-width: 768px) {
    writing-mode: horizontal-tb;
    border-left: none;
    border-bottom: 5px solid #fff;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

export default () => {
  return (
    <Header>
      <Border>
        <Menu>
          <MenuItem to="/">Home</MenuItem>
          <MenuItem
            as="a"
            href="https://twitter.com/gpx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </MenuItem>
          <MenuItem
            as="a"
            href="https://github.com/gpx/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </MenuItem>
          <MenuItem to="/rss.xml">RSS</MenuItem>
        </Menu>
        <Text>Giorgio</Text>
        <Text>Polvara</Text>
      </Border>
    </Header>
  );
};
