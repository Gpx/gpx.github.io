import React from "react";
import Script from "next/script";
import styles from "./Newsletter.module.scss";
("");

export default function Newsletter() {
  return (
    <iframe
      src="https://dashboard.mailerlite.com/forms/367869/82797341317268730/share"
      width={400}
      height={285}
      className={styles.frame}
    />
  );
  return (
    <>
      <Script>
        {`
            (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
            .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
            n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
            (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            //ml('account', '367869');
        `}
      </Script>

      <div className="ml-embedded" data-form="hqftmp"></div>
    </>
  );
}
