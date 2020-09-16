import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  background: #7986cb;
  background-image: linear-gradient(90deg, #7986cb, #3f51b5);
  color: #fff;
  text-align: center;
  padding: 1.1em 0.05em;

  a {
    color: #ffa801;
  }
`;

export default function () {
  return (
    <Banner>
      I'm open to work. If you're looking for an experienced frontend developer
      check out my{" "}
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.linkedin.com/in/polvara/"
      >
        LinkedIn
      </a>{" "}
      profile and get in touch.
    </Banner>
  );
}
