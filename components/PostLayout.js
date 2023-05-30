import React from "react";
import Head from "next/head";
import Balancer from "react-wrap-balancer";
import Follow from "./Follow";
import Layout from "./Layout";
import styles from "./PostLayout.module.scss";
import NewsletterCTA from "./NewsletterCTA";

function PostLayout({ meta, children }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="twitter:card" />
        <meta name="twitter:site" value="@gpx" />
        <meta name="twitter:creator" value="@gpx" />
        <meta name="twitter:title" value={meta.title} />
      </Head>

      <NewsletterCTA />

      <article className={styles.article}>
        <h1 className={styles.title}>
          <Balancer dangerouslySetInnerHTML={{ __html: meta.title }} />
        </h1>
        <div className={styles.content}>{children}</div>
      </article>
      <Follow />
    </>
  );
}

export default function ({ meta, children }) {
  return (
    <Layout>
      <PostLayout meta={meta}>{children}</PostLayout>
    </Layout>
  );
}
