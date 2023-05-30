import Header from "components/Header";
import Footer from "components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header small />
      <main>{children}</main>
      <Footer />
    </>
  );
}
