import React from "react";
import styled from "styled-components";
import me from "./me.jpg";

const Card = styled.div`
  max-width: 300px;
  margin: auto;
  border: 3px solid #df441b;
`;

const Form = styled.form``;

export default () => {
  return (
    <Card>
      Join the Newsletter
      <Form
        action="https://buttondown.email/api/emails/embed-subscribe/gpx"
        method="post"
        target="popupwindow"
        onsubmit="window.open('https://buttondown.email/gpx', 'popupwindow')"
      >
        <label for="bd-email">Enter your email</label>
        <input type="email" name="email" id="bd-email" />
        <input type="hidden" value="1" name="embed" />
        <input type="submit" value="Subscribe" />
      </Form>
    </Card>
  );
};
