"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  return (
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
  );
}
