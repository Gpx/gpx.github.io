import React from "react";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function CodeHero({ entries }) {
  const [text, setText] = React.useState("");
  const timeout = React.useRef(null);
  React.useState(() => {
    let i = 0;
    let direction = 1;
    let wordCount = 0;
    function nextLetter() {
      if (i > entries[wordCount].length) direction = -1;
      if (i == 0) {
        direction = 1;
        wordCount = (wordCount + 1) % entries.length;
      }
      timeout.current = setTimeout(() => {
        setText(entries[wordCount].slice(0, i));
        i += direction;
        nextLetter();
      }, random(50, 500));
    }
    nextLetter();

    return () => clearTimeout(timeout.current);
  }, [timeout]);

  return (
    <div className="cursor-none bg-black py-96 text-center font-console text-9xl text-white">
      &gt; {text}
      <span className="animate-ping">|</span>
    </div>
  );
}
