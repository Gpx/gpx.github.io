import React from "react";
import Link from "next/link";
import cx from "classnames";
import styles from "./SuggestedPosts.module.scss";

export default function SuggestedPosts({ posts }) {
  const mainRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    if (mainRef.current === null || isVisible) return;
    function callback(entries) {
      if (entries.some(({ isIntersecting }) => isIntersecting))
        setIsVisible(true);
    }
    new IntersectionObserver(callback, { threshold: 0.8 }).observe(
      mainRef.current
    );
  }, []);

  return (
    <div
      ref={mainRef}
      className={cx(styles.main, { [styles.visible]: isVisible })}
    >
      <h3>You might also like</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
