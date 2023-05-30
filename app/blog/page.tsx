import { getPosts } from "lib/posts";
import PostsList from "components/PostsList";

export default async function Page() {
  const posts = await getPosts();
  return <PostsList posts={posts} />;
}
