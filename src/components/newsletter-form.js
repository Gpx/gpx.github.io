import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: block;
  max-width: 500px;
  margin: auto;
  margin-top: 3em;
  box-shadow: 2px 2px 3px 2px #0003;
  padding: 2em 2.5em;
  text-align: center;
  transition: transform 0.2s;
  border-radius: 6px;
`;

const Button = styled.input.attrs({ type: "submit", value: "Subscribe" })`
  color: red;
`;

const Form = styled.form``;

const Title = styled.h1`
  margin: 0;
  font-size: 1.6em;
  font-weight: 500;
  line-height: 1;
`;

const Sub = styled.div``;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;

  label {
    text-align: left;
    margin-bottom: 0.3em;
  }

  [type="email"] {
    font-size: 1.3em;
    border: 1px solid #333;
    padding: 0.3em 0.6em;
    border-radius: 6px;
    margin-bottom: 0.5em;
  }

  [type="submit"] {
    background: #3a6;
    border: none;
    font-size: 1.3em;
    padding: 0.6em;
    color: #fff;
    text-shadow: 1px 0 1px #0004;
    border-radius: 6px;
    cursor: pointer;
  }
`;

export default () => {
  return (
    <Card>
      <Title>Subscribe to my newsletter</Title>
      <Sub>No spam. Unsubscribe when you want.</Sub>
      <Form
        action="https://buttondown.email/api/emails/embed-subscribe/gpx"
        method="post"
        target="popupwindow"
        onsubmit="window.open('https://buttondown.email/gpx', 'popupwindow')"
      >
        <InputGroup>
          <label for="bd-email">Email</label>
          <input
            type="email"
            name="email"
            id="bd-email"
            placeholder="Your email"
            required
          />
          <Button />
        </InputGroup>
        <input type="hidden" value="1" name="embed" />
      </Form>
    </Card>
  );
};
