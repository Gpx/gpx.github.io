import React from "react";
import styled from "styled-components";
import Footer from "../components/footer";

const Container = styled.div`
  padding: 0 0.5em;
  max-width: calc(65 * 9px);
  margin: auto;
`;

export default ({ children }) => (
  <>
    <Container>{children}</Container>
    <Footer />
  </>
);
