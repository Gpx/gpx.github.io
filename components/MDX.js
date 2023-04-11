export function Img(props) {
  return (
    <figure className="my-8 text-center">
      <img
        src={props.src}
        alt={props.alt}
        className="rounded-lg border-4 border-black shadow-3d"
      />
      <figcaption className="mt-4 text-lg text-neutral-500">
        {props.alt}
      </figcaption>
    </figure>
  );
}
