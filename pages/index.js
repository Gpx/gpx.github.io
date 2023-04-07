import Balancer from "react-wrap-balancer";
import Image from "next/image";
import Marquee from "../components/Marquee";
import PostsList from "../components/PostsList";
import { getPosts } from "../lib/posts";
import styles from "./Home.module.scss";
import Follow from "../components/Follow";

export default function Home({ posts }) {
  return (
    <>
      <div className={styles.main}>
        <div>
          <p>
            <Balancer>
              Hi there, I'm Gio!
              <br />I love talking about{" "}
              <span className={styles.highlight}>programming</span> and helping
              teams and individuals ship better software
              <span className={styles.period}>.</span>
            </Balancer>
          </p>
          <div>
            <div className={styles.title}>
              <h2>Ciao!</h2>
            </div>
            <Image src="/me.jpg" width={205} height={205} alt="Gio Polvara" />
          </div>
        </div>
      </div>

      <PostsList posts={posts} showMore />

      <Marquee>Ciao!</Marquee>

      <Follow />
    </>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()).slice(0, 5);
  return { props: { posts } };
}
