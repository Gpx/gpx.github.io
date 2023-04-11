import cx from "classnames";
import Link from "next/link";

function Li({ children, href }) {
  return (
    <li>
      <Link
        href={href}
        className="mx-auto my-8 block max-w-3xl rounded-lg border-4 border-black bg-rose-50 px-8 py-4 text-2xl font-bold text-rose-500 shadow-3d transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-3d-hover active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        {children}
      </Link>
    </li>
  );
}

export default function PostsList({ posts, showMore = false, className }) {
  return (
    <ol className={cx("bg-rose-500 px-8 py-16", className)}>
      {posts.map((post) => (
        <Li key={post.slug} href={`/posts/${post.slug}`}>
          {post.title}
        </Li>
      ))}
      {showMore && <Li href="/blog">and more&hellip;</Li>}
    </ol>
  );
}
