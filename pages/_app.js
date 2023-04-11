import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import "../styles/code.scss";
import { Analytics } from "@vercel/analytics/react";
import { Caveat_Brush, Public_Sans, Space_Mono, VT323 } from "next/font/google";

const caveatBrush = Caveat_Brush({ subsets: ["latin"], weight: ["400"] });
const publicSans = Public_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["200", "400", "500", "700", "800", "900"],
});
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });
const vt323 = VT323({ subsets: ["latin"], weight: ["400"] });

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <style jsx global>{`
        :root {
          --font-emphasis: ${caveatBrush.style.fontFamily};
          --font-sans: ${publicSans.style.fontFamily};
          --font-mono: ${spaceMono.style.fontFamily};
          --font-console: ${vt323.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Gio Polvara</title>
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
