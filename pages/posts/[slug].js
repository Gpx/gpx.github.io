import { getPosts, getFullPostBySlug } from "../../lib/posts";
import styles from "./post.module.scss";

export default function Post({ post }) {
  return (
    <>
      <h1
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: post.title }}
      />
      <hr className={styles.hr} />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await getFullPostBySlug(slug);
  return { props: { post } };
}

export async function getStaticPaths() {
  const posts = getPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}
