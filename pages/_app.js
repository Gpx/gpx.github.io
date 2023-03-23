import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import "../styles/code.scss";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <Head>
        <title>Gio Polvara</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Public+Sans:ital,wght@0,400;0,500;0,900;1,400;1,900&family=Space+Mono&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-9Z7PG23CS5"
        onLoad={() => {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "G-9Z7PG23CS5");
        }}
      />

      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
