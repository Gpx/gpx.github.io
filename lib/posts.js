import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "pages/posts");

async function getMetaBySlug(slug) {
  const { meta } = await import("../pages/posts/" + slug);
  return meta;
}

export async function getPosts() {
  const slugs = fs
    .readdirSync(postsDirectory)
    .filter((slug) => slug.endsWith(".mdx"));

  const posts = [];
  for (const slug of slugs) {
    const { title, date } = await getMetaBySlug(slug);
    posts.push({ slug: slug.replace(/\.mdx$/, ""), title, date });
  }

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
