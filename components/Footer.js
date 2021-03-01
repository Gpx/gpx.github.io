import styles from "./Footer.module.scss";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function load() {
  return `0.${random(1, 99).toString().padStart(2, "0")}`;
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()} by Giorgio Polvara
      <code>:q!&lt;Enter&gt;</code>
    </footer>
  );
}
