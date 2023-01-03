import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Link from "next/link";
import styles from "./Header.module.scss";

function Logo() {
  const today = new Date();
  return today.getMonth() === 12 ? "🎅 " : <div className={styles.logo} />;
}

export default function Header() {
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  function handleScroll() {
    const position = window.pageYOffset;
    if (position === 0 && scrolled) setScrolled(false);
    else if (position !== 0 && !scrolled) setScrolled(true);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header className={cx(styles.header, { [styles.scrolled]: scrolled })}>
        <Link href="/" className={styles.name}>
          <Logo />
          Giorgio Polvara
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link
                href="/"
                className={router.asPath === "/" ? styles.activeLink : ""}
              >
                About me
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={
                  router.asPath === "/blog" ||
                  router.asPath.startsWith("/posts")
                    ? styles.activeLink
                    : ""
                }
              >
                Blog
              </Link>
            </li>
            {/*
            <li>
              <Link href="/now">
                <a
                  className={router.asPath === "/now" ? styles.activeLink : ""}
                >
                  Now
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Contact</a>
              </Link>
            </li>
            */}
          </ul>
        </nav>
      </header>
      <div className={styles.margin} />
    </>
  );
}
