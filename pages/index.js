import Balancer from "react-wrap-balancer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
import Marquee from "../components/Marquee";
import PostsList from "../components/PostsList";
import { getPosts } from "../lib/posts";
import styles from "./Home.module.scss";

export default function Home({ posts }) {
  return (
    <>
      <div className={styles.main}>
        <div>
          <p>
            <Balancer>
              I'm Giorgio. I love talking about{" "}
              <span className={styles.highlight}>programming</span> and helping
              teams and individuals ship better software
              <span className={styles.period}>.</span>
            </Balancer>
          </p>
          <div>
            <div className={styles.title}>
              <h2>Ciao!</h2>
            </div>
            <Image
              src="/me.jpg"
              width={205}
              height={205}
              alt="Giorgio Polvara"
            />
          </div>
        </div>
      </div>

      <PostsList posts={posts} showMore />

      <Marquee>Ciao!</Marquee>

      <div className={styles.follow}>
        <h2>
          Like what you see?{" "}
          <span className={styles.highlight}>Follow me!</span>
        </h2>
        <iframe
          src="https://polvara.substack.com/embed"
          width="480"
          height="320"
          className={styles.subscription}
        ></iframe>

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
            href="https://stackoverflow.com/users/1047903/giorgio-polvara-gpx"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "hsl(27 75% 50%)" }}
          >
            <FontAwesomeIcon icon={faStackOverflow} />
          </a>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getPosts().slice(0, 5);
  return { props: { posts } };
}
