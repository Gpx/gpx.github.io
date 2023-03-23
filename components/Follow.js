import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Newsletter from "./Newsletter";
import styles from "./Follow.module.scss";

export default function Follow() {
  return (
    <div className={styles.follow}>
      <h2>
        Like what you see? <span className={styles.highlight}>Follow me!</span>
      </h2>

      <Newsletter />

      <h2>Or</h2>

      <div className={styles.social}>
        <a
          href="https://twitter.com/gpx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "hsl(203 75% 50%)" }}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href="https://github.com/gpx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "hsl(0 75% 98%)" }}
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="https://www.linkedin.com/in/polvara/?locale=en_US"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "hsl(201 50% 90%)",
            background: "hsl(201 70% 40%)",
          }}
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a
          href="https://stackoverflow.com/users/1047903/gio-polvara"
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "hsl(27 75% 50%)" }}
        >
          <FontAwesomeIcon icon={faStackOverflow} />
        </a>
      </div>
    </div>
  );
}
