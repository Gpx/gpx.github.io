import React from "react";
import cx from "classnames";
import Link from "next/link";
import useIsVisible from "hooks/useIsVisible";

export default function Header({ small = false }) {
  const [isBigHeaderVisible, bigHeaderRef] = useIsVisible();

  return (
    <>
      <style jsx global>{`
        body {
          ${small && "padding-top: 76px;"}
        }
      `}</style>

      {!small && (
        <header ref={bigHeaderRef}>
          <div className="border-b-4 border-black px-10 py-8">
            <img
              src="/header.png"
              className="mx-auto w-full max-w-screen-2xl"
            />
          </div>

          <nav className="px-10 py-5">
            <ul className="flex gap-8 text-xl font-extralight">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      )}

      <header
        className={cx(
          "fixed left-0 right-0 top-0 z-10 flex h-[76px] items-center justify-between border-b-4 border-black bg-white px-8 py-4 transition-transform",
          {
            ["-translate-y-full"]: isBigHeaderVisible,
            ["translate-y-0"]: !isBigHeaderVisible || small,
          }
        )}
      >
        <Link href="/" className="hidden text-4xl md:block">
          polvara.me
        </Link>

        <nav>
          <ul className="flex gap-8 text-xl font-extralight">
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
