function Section({ title, children, className }) {
  return (
    <div className={`m-2 border border-red-50 px-4 py-2 ${className}`}>
      <h2 className="mb-2 text-xl text-red-400">{title}</h2>
      {children}
    </div>
  );
}

function Table({ data }) {
  return (
    <table className="w-full table-auto">
      <thead className="bg-red-400 text-slate-950">
        <tr>
          {data[0].map((header) => (
            <th className="p-4">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row) => (
          <tr className="odd:bg-white even:bg-slate-50">
            {row.map((cell) => (
              <td className="p-4">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Code({ children }) {
  return (
    <code className="rounded border border-red-500 bg-red-300 px-1 py-0.5 text-slate-950">
      {children}
    </code>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="rounded border border-slate-50 bg-slate-950 px-4 py-2 text-slate-50">
      {children}
    </pre>
  );
}

export default function Cheatsheet() {
  return (
    <div className="w-full pb-4">
      <h1 className="my-16 text-center text-4xl text-red-500">
        Testing Library Cheatsheet 🐙
      </h1>
      <div className="mx-auto max-w-screen-lg">
        <Section title="The Golden Rule">
          <p className="my-4 text-2xl italic text-slate-950">
            Does this test give me confidence?
          </p>
          <p className="text-slate-600">
            If the answer is "no" you need to redo the test.
          </p>
        </Section>
        <Section title="What to Test">
          <ul className="list-inside list-decimal">
            <li>Describe your app to a user</li>
            <li>Test what you described</li>
            <li>Run test coverage to see if you missed something</li>
            <li>Repeat until satisfied</li>
          </ul>
        </Section>
        <Section title="How to Test">
          <ul className="list-inside list-decimal">
            <li>Manually test</li>
            <li>Write down the steps you took</li>
            <li>Automate those steps</li>
          </ul>
        </Section>
        <Section title="Query types">
          <Table
            data={[
              [
                "Type of Query",
                "0 Matches",
                "1 Match",
                "1+ Matches",
                "Retry (Async/Await)",
              ],
              [
                <Code>getBy*</Code>,
                "Throw error",
                "Return element",
                "Throw error",
                <div className="text-center">No</div>,
              ],
              [
                <Code>queryBy*</Code>,
                <>
                  Return <Code>null</Code>
                </>,
                "Return element",
                "Throw error",
                <div className="text-center">No</div>,
              ],
              [
                <Code>findBy*</Code>,
                "Throw error",
                "Return element",
                "Throw error",
                <div className="text-center">Yes</div>,
              ],
              [
                <Code>getAllBy*</Code>,
                "Throw error",
                "Return array",
                "Return array",
                <div className="text-center">No</div>,
              ],
              [
                <Code>queryAllBy*</Code>,
                <>
                  Return <Code>[]</Code>
                </>,
                "Return array",
                "Return array",
                <div className="text-center">No</div>,
              ],
              [
                <Code>findAllBy*</Code>,
                "Throw error",
                "Return array",
                "Return array",
                <div className="text-center">Yes</div>,
              ],
            ]}
          />
        </Section>
        <Section title="Query Priorities">
          <ol className="list-inside list-decimal leading-loose">
            <li>
              Queries Accessible to Everyone
              <ol className="ml-8 list-outside list-[lower-roman]">
                <li>
                  <Code>getByRole</Code>
                </li>
                <li>
                  <Code>getByLabelText</Code>
                </li>
                <li>
                  <Code>getByPlaceholderText</Code>
                </li>
                <li>
                  <Code>getByText</Code>
                </li>
                <li>
                  <Code>getByDisplayVlue</Code>
                </li>
              </ol>
            </li>
            <li>
              Semanitic Queries
              <ol className="ml-8 list-outside list-[lower-roman]">
                <li>
                  <Code>getByAltText</Code>
                </li>
                <li>
                  <Code>getByTitle</Code>
                </li>
              </ol>
            </li>
            <li>
              Test IDs <Code>getByTestId</Code>
            </li>
          </ol>
        </Section>
        <Section title="Wait for element to appear">
          <CodeBlock>{`await screen.findByText("hello")`}</CodeBlock>
        </Section>
        <Section title="Wait for element to disappear">
          <CodeBlock>
            {`await waitForElementToBeRemoved(() => screen.queryByText("hello"))`}
          </CodeBlock>
        </Section>
        <Section title="Debugging">
          <CodeBlock>{`screen.debug()`}</CodeBlock>
        </Section>
        <Section title="Querying Within Elements">
          <CodeBlock>{`import { within } from "@testing-library/react"

const messages = screen.getById("messages");
const helloMessage = within(messages).getByText("hello");`}</CodeBlock>
        </Section>
      </div>
    </div>
  );
}
