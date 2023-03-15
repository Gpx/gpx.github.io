import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">Giorgio Polvara!</Link>
    </header>
  );
}
