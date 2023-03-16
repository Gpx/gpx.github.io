import Balancer from "react-wrap-balancer";
import Follow from "../../components/Follow";
import Layout from "../../components/Layout";
import Newsletter from "../../components/Newsletter";
import SuggestedPosts from "../../components/SuggestedPosts";
import { getPosts, getFullPostBySlug } from "../../lib/posts";
import styles from "./post.module.scss";

export default function Post({ post, suggestedPosts }) {
  return (
    <>
      <article className={styles.article}>
        <h1 className={styles.title}>
          <Balancer dangerouslySetInnerHTML={{ __html: post.title }} />
        </h1>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <Follow />
    </>
  );
}

Post.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await getFullPostBySlug(slug);

  const posts = getPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, 3);

  return { props: { post, suggestedPosts: posts } };
}

export async function getStaticPaths() {
  const posts = getPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}
