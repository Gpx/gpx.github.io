import cx from "classnames";

export function section({ border, text }) {
  return function Section({ title, children, className }) {
    return (
      <div className={`m-2 border ${border} px-4 py-2 ${className}`}>
        <h2 className={`mb-2 text-xl ${text}`}>{title}</h2>
        {children}
      </div>
    );
  };
}

export function table({ background, text, oddRow }) {
  return function Table({ data, aligns }) {
    return (
      <table className="w-full table-auto">
        <thead className={`${background} ${text}`}>
          <tr>
            {data[0].map((header, index) => (
              <th
                className={cx("p-4", {
                  ["text-left"]: aligns[index] === "left",
                  ["text-center"]: aligns[index] === "center",
                  ["text-right"]: aligns[index] === "right",
                })}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row) => (
            <tr className={`even:${oddRow} odd:bg-white`}>
              {row.map((cell) => (
                <td className="p-4">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
}

export function code({ background, text }) {
  return function Code({ children }) {
    return (
      <code className={`rounded ${background} px-1 py-0.5 ${text}`}>
        {children}
      </code>
    );
  };
}

export function codeBlock({ background, text }) {
  return function CodeBlock({ children }) {
    return (
      <pre
        className={`my-4 rounded ${background} px-4 py-2 leading-tight ${text}`}
      >
        {children}
      </pre>
    );
  };
}
