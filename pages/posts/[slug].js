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
      <div style={{ textAlign: "center", margin: "3rem 0" }}>
        <iframe
          src="https://polvara.substack.com/embed"
          width="480"
          height="320"
          style={{
            border: "1px solid #EEE",
            background: "white",
          }}
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
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
