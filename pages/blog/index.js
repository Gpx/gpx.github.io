import { getPosts } from "../../lib/posts";
import PostsList from "../../components/PostsList";
import Layout from "../../components/Layout";
import Marquee from "../../components/Marquee";

export default function Index({ posts }) {
  return (
    <>
      <PostsList posts={posts} />
      <Marquee>Ciao!</Marquee>
    </>
  );
}

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const posts = getPosts();
  return { props: { posts } };
}
