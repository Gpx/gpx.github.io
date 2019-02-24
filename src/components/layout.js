import React from "react";
import styled from "styled-components";
import Header from "../components/header";

const Container = styled.div`
  max-width: 65ch;
  margin: auto;
`;

export default ({ children }) => (
  <Container>
    <Header />
    {children}
  </Container>
);
