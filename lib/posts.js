import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";

const postsDirectory = join(process.cwd(), "_posts");

export async function getFullPostBySlug(slug) {
  const post = getPostBySlug(slug);
  const result = await remark()
    .use(prism, { transformInlineCode: true })
    .use(html)
    .use(function attacher() {
      return transformer;
      function transformer(tree, file) {
        //console.log(file);
      }
    })
    .process(post.content);
  return { html: result.toString(), ...post };
}

function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);
  return { slug: realSlug, ...data, content };
}

export function getPosts() {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
