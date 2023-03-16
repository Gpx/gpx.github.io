import React from "react";
import Script from "next/script";
import styles from "./Newsletter.module.scss";
("");

export default function Newsletter() {
  return (
    <>
      <iframe
        src="https://dashboard.mailerlite.com/forms/367869/82797341317268730/share"
        width={400}
        height={285}
        className={styles.frame}
      />
      <a
        className={styles.link}
        href="https://dashboard.mailerlite.com/forms/367869/82797341317268730/share"
        target="_blank"
      >
        Newsletter!
      </a>
    </>
  );
}
