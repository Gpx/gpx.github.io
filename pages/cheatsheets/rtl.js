import { section, table, code, codeBlock } from "components/cheatsheet-utils";

const Section = section({ border: "border-red-50", text: "text-red-400" });

const Table = table({
  background: "bg-red-400",
  text: "text-slate-950",
  oddRow: "bg-slate-50",
});

const Code = code({ background: "bg-red-300", text: "text-slate-950" });

const CodeBlock = codeBlock({
  background: "bg-slate-950",
  text: "text-slate-50",
});

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
            aligns={["left", "left", "left", "left", "center"]}
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
