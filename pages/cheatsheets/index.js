import Balancer from "react-wrap-balancer";
import Header from "components/Header";
import Image from "next/image";
import rtlCheatsheet from "public/rtl-opaque.png";
import nextCheatsheet from "public/next-opaque.png";
import Newsletter from "components/Newsletter";
import Marquee from "components/Marquee";

export default function Cheatsheets() {
  return (
    <>
      <Header small />
      <div className="bg-pink-500 px-16 py-32">
        <Balancer as="h1" className="mx-auto w-1/2 text-8xl">
          Get all my Cheatsheets{" "}
          <em className="font-extrabold not-italic text-red-50">for Free</em>
        </Balancer>
      </div>

      <Marquee>⭐️</Marquee>

      <div className="grid grid-cols-2 items-stretch border-b-4 border-black bg-red-400 text-slate-950">
        <div className="flex items-center justify-center border-r-4 border-black">
          <h2 className="text-5xl">Testing Library</h2>
        </div>
        <Image src={rtlCheatsheet} className="-rotate-0" />
      </div>

      <div className="grid grid-cols-2 border-b-4 border-black bg-black text-white">
        <Image src={nextCheatsheet} className="border-r-4 border-black" />
        <div className="flex items-center justify-center">
          <h2 className="text-5xl">Next.js App Router</h2>
        </div>
      </div>

      <div className="px-16 py-32 text-center">
        <Balancer as="h1" className="mx-auto mb-32 w-1/2 text-center text-8xl">
          Subscribe and I'll send them to you.
        </Balancer>

        <Newsletter />
      </div>
    </>
  );
}
