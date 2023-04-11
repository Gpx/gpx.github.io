import cx from "classnames";
import useIsVisible from "hooks/useIsVisible";

export default function TitleBlock({ title, emoji, children }) {
  const [isVisible, ref] = useIsVisible({
    threshold: 0.7,
    stopAfterFirst: true,
  });

  return (
    <div
      ref={ref}
      className="relative border-t-4 border-black px-8 py-32 text-center"
    >
      <h2
        className={cx("mb-14 text-7xl transition duration-500", {
          ["-translate-y-full opacity-0"]: !isVisible,
          ["translate-y-0 opacity-100"]: isVisible,
        })}
      >
        {title}
      </h2>
      <p
        className={cx(
          "mx-auto max-w-2xl text-3xl font-light leading-normal delay-300 duration-500",
          {
            ["-translate-y-1/3 opacity-0"]: !isVisible,
            ["translate-y-0 opacity-100"]: isVisible,
          }
        )}
      >
        {children}
      </p>
      <div className="abso absolute bottom-1/4 right-1/4 rotate-45 text-9xl opacity-40">
        {emoji}
      </div>
      <div className="abso absolute bottom-24 right-2/4 -rotate-12 text-6xl opacity-40">
        {emoji}
      </div>
    </div>
  );
}
