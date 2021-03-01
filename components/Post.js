import cx from "classnames";
import styles from "./Post.module.scss";

export default function Post({ post, index }) {
  return (
    <>
      <div
        className={cx(styles.title, { [styles.even]: (index + 1) % 2 === 0 })}
        dangerouslySetInnerHTML={{ __html: post.title }}
      />
    </>
  );
}
