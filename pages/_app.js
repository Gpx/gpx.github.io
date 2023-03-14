import "../styles/globals.css";
import "../styles/code.scss";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@500;900&display=swap"
        rel="stylesheet"
      ></link>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
