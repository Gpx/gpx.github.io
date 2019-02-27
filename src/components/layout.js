import React from "react";
import styled from "styled-components";
import Header from "../components/header";

const Container = styled.div`
  max-width: calc(65 * 9px);
  margin: auto;
`;

export default ({ children }) => (
  <Container>
    <Header />
    {children}
  </Container>
);
