import Link from "next/link";
import Image from "next/image";
import { getPosts } from "../lib/posts";
import styles from "./Home.module.scss";

export default function Home({ posts }) {
  return (
    <>
      <div className={styles.main}>
        <div>
          <p>
            I'm Giorgio, I love talking about{" "}
            <span className={styles.highlight}>programming</span> and helping
            teams and individuals shipping better software
            <span className={styles.period}>.</span>
          </p>
          <div>
            <div className={styles.title}>
              <h2>Ciao!</h2>
            </div>
            <Image src="/me.jpg" width={205} height={205} />
          </div>
        </div>
      </div>

      <ol className={styles.posts}>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
        <li>
          <Link href="/blog">and more&hellip;</Link>
        </li>
      </ol>
    </>
  );
}

export async function getStaticProps() {
  const posts = getPosts().slice(0, 10);
  return { props: { posts } };
}
