"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Newsletter from "./Newsletter";

function SocialLink({ href, icon, background, color = "#000" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ background, color }}
      className="inline-flex h-20 w-20 items-center justify-center place-self-center rounded border-4 border-black bg-white text-5xl shadow-3d transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-3d-hover active:translate-x-1 active:translate-y-1 active:shadow-none"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}

export default function Follow() {
  return (
    <div className="bg-sky-500 bg-cross px-8 py-16 text-center">
      <h2 className="my-8 text-3xl text-sky-50">
        Like what you see? Follow me!
      </h2>

      <Newsletter />

      <h2 className="my-8 text-3xl text-sky-50">Or</h2>

      <div className="mx-auto grid max-w-lg grid-cols-2 gap-12 md:grid-cols-4">
        <SocialLink
          href="https://twitter.com/gpx"
          icon={faTwitter}
          background="hsl(203 75% 50%)"
        />
        <SocialLink
          href="https://github.com/gpx"
          icon={faGithub}
          background="hsl(0 75% 98%)"
        />
        <SocialLink
          href="https://www.linkedin.com/in/polvara/?locale=en_US"
          icon={faLinkedinIn}
          background="hsl(201 70% 40%)"
          color="hsl(201 50% 90%)"
        />
        <SocialLink
          href="https://stackoverflow.com/users/1047903/gio-polvara"
          icon={faStackOverflow}
          background="hsl(27 75% 50%)"
        />
      </div>
    </div>
  );
}
