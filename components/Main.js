import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Main.module.scss";

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <Image
          className={styles.image}
          src="/me.jpg"
          width={205}
          height={205}
          priority
          alt="Giorgio Polvara"
        />
        <span className={styles.name}>Giorgio Polvara</span>
        <hr className={styles.divider} />
        <div className={styles.footer}>
          <a
            href="https://twitter.com/gpx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://github.com/gpx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/polvara/?locale=en_US"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            href="https://stackoverflow.com/users/1047903/giorgio-polvara-gpx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faStackOverflow} />
          </a>
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.salute}>Ciao!</div>
        <p className={styles.subtitle}>It's nice to meet you</p>
        <p>
          Born and raised in Italy surrounded by mountains and lakes 🏔, I now
          enjoy life in sunny Barcelona 🏖. I've been working in software
          development for more than{" "}
          {Math.round(
            (new Date().getTime() - new Date("2006-01-01").getTime()) /
              1000 /
              60 /
              60 /
              24 /
              365
          )}{" "}
          years.
        </p>
        <p>
          I have experience working in small and bigger companies, and I've
          worked with a vast spectrum of technologies from DBs to CSS and
          everything in between.
        </p>
        <p>
          Currently I'm working as a Tech Lead at{" "}
          <a href="https://about.wallapop.com/en" target="_blank">
            Wallapop
          </a>
          .
        </p>
      </div>
    </div>
  );
}
