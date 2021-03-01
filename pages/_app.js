import "../styles/globals.css";
import "../styles/code.scss";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (router.asPath === "/cv") return <Component {...pageProps} />;

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
