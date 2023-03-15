import Link from "next/link";
import styles from "./PostsList.module.scss";

export default function PostsList({ posts, showMore = false }) {
  return (
    <ol className={styles.posts}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
      {showMore && (
        <li>
          <Link href="/blog">and more&hellip;</Link>
        </li>
      )}
    </ol>
  );
}
