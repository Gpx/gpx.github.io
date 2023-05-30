import React from "react";
import Link from "next/link";
import cx from "classnames";

export default function NewsletterCTA() {
  const [showCTA, setShowCTA] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem("hideNewsletterCTA")) return;
    const timeout = setTimeout(() => setShowCTA(true), 10_000);
    return () => clearTimeout(timeout);
  }, []);

  function hideCTA() {
    localStorage.setItem("hideNewsletterCTA", true);
    setShowCTA(false);
  }

  return (
    <div
      className={cx(
        "fixed bottom-1/2 rounded-lg rounded-s-none border-4 border-l-0 border-black bg-white p-8 transition-transform",
        { ["translate-x-0"]: showCTA, ["-translate-x-full"]: !showCTA }
      )}
    >
      <p className="text-2xl">
        Hey! Would you like a{" "}
        <em className="font-bold">free Testing Library cheat sheet?</em>
      </p>
      <Link
        className="my-8 block w-full rounded-lg bg-emerald-400 p-4 text-center text-xl text-emerald-50 shadow-3d transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-3d-hover active:translate-x-1 active:translate-y-1 active:shadow-none"
        href="/cheatsheets"
        target="_blank"
        onClick={hideCTA}
      >
        Yes please!
      </Link>
      <button
        className="block w-full text-center text-red-400"
        onClick={hideCTA}
      >
        No thanks
      </button>
    </div>
  );
}
