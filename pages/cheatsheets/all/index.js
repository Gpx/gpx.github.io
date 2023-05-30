import Link from "next/link";
import Header from "components/Header";
import Balancer from "react-wrap-balancer";

export default function All() {
  return (
    <>
      <Header small />
      <div className="bg-pink-500 px-16 py-32">
        <Balancer as="h1" className="mx-auto w-1/2 text-8xl">
          Get all my Cheatsheets{" "}
          <em className="font-extrabold not-italic text-red-50">for Free</em>
        </Balancer>
      </div>

      <div className="flex py-16">
        <ul className="mx-auto list-inside list-disc text-5xl leading-loose">
          <li>
            <Link
              href="/rtl-cheatsheet.png"
              target="_blank"
              download="Testing-Library-Cheatsheet.png"
            >
              Testing Library
            </Link>
          </li>
          <li>
            <Link
              href="/next-app-router-cheatsheet.png"
              target="_blank"
              download="Next-App-Router-Cheatsheet.png"
            >
              Next App Route
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
