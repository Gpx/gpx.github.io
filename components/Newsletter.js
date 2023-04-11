import React from "react";

export default function Newsletter() {
  return (
    <>
      <iframe
        src="https://dashboard.mailerlite.com/forms/367869/82797341317268730/share"
        width={400}
        height={285}
        className="mx-auto hidden rounded-lg border-4 border-black shadow-3d md:block"
      />
      <a
        className="block rounded-lg border-4 border-black bg-pink-500 px-8 py-4 text-2xl font-black tracking-wide text-pink-50 shadow-3d transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-3d-hover active:translate-x-1 active:translate-y-1 active:shadow-none md:hidden"
        href="https://dashboard.mailerlite.com/forms/367869/82797341317268730/share"
        target="_blank"
      >
        Newsletter!
      </a>
    </>
  );
}
