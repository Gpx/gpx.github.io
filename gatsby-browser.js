import "./src/styles/global.css";
import "./src/styles/code.css";

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    // eslint-disable-next-line no-unused-expressions
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
  }
};
