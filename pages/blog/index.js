import Link from "next/link";
import cx from "classnames";
import { getPosts } from "../../lib/posts";
import Post from "../../components/Post";
import styles from "./index.module.scss";

export default function Index({ posts }) {
  return (
    <div className={styles.posts}>
      {posts.map((post, index) => (
        <>
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <a>
              <Post post={post} index={index} />
            </a>
          </Link>
          {posts.length !== index + 1 ? (
            <hr
              className={cx(styles.hr, {
                [styles.even]: (index + 1) % 2 === 0,
              })}
            />
          ) : null}
        </>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const posts = getPosts();
  return { props: { posts } };
}
