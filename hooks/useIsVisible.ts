import React from "react";

export default function useIsVisible({
  threshold = 0,
  stopAfterFirst = false,
} = {}): [boolean, React.MutableRefObject<null>] {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(true);
  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const { isIntersecting } = entries[0];
        if (stopAfterFirst && isIntersecting) {
          intersectionObserver.disconnect();
        }
        setIsVisible(isIntersecting);
      },
      { threshold }
    );
    if (ref.current) intersectionObserver.observe(ref.current);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [ref.current]);

  return [isVisible, ref];
}
