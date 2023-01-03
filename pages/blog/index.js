import Link from "next/link";
import cx from "classnames";
import { getPosts } from "../../lib/posts";
import Post from "../../components/Post";
import styles from "./index.module.scss";
import React from "react";

export default function Index({ posts }) {
  return (
    <div className={styles.posts}>
      {posts.map((post, index) => (
        <React.Fragment key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            <Post post={post} index={index} />
          </Link>
          {posts.length !== index + 1 ? (
            <hr
              className={cx(styles.hr, {
                [styles.even]: (index + 1) % 2 === 0,
              })}
            />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const posts = getPosts();
  return { props: { posts } };
}
