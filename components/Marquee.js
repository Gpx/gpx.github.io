import cx from "classnames";
import styles from "./Marquee.module.scss";

export default function Marquee({ children, italic = false }) {
  return (
    <div className={cx(styles.main, { [styles.italic]: italic })} aria-hidden>
      <div className={styles.content}>
        {Array.from({ length: 100 }).map((_, i) => (
          <span key={i}>{children}</span>
        ))}
      </div>
      <div className={styles.content} aria-hidden>
        {Array.from({ length: 100 }).map((_, i) => (
          <span key={i}>{children}</span>
        ))}
      </div>
    </div>
  );
}
