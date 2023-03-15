import { getPosts } from "../../lib/posts";
import PostsList from "../../components/PostsList";
import Layout from "../../components/Layout";

export default function Index({ posts }) {
  return (
    <>
      <PostsList posts={posts} />
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
