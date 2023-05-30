import { section, table, code, codeBlock } from "components/cheatsheet-utils";

const Section = section({ border: "border-slate-400", text: "text-black" });

const Table = table({
  background: "bg-black",
  text: "text-white",
  oddRow: "bg-slate-100",
});

const Code = code({ background: "bg-black", text: "text-white" });

const CodeBlock = codeBlock({
  background: "bg-black",
  text: "text-white",
});

export default function Cheatsheet() {
  return (
    <div className="w-full pb-4">
      <h1 className="my-16 text-center text-4xl text-black">
        Next.js App Router Cheatsheet ▲
      </h1>
      <div className="mx-auto max-w-screen-lg">
        <Section title="Define a route">
          <p>
            Create a <Code>Page.js</Code> (or <Code>.jsx</Code>, or{" "}
            <Code>.tsx</Code>) file to define a route. You can create folders
            for nested routes.
          </p>
          <CodeBlock>{`
📁 app
├ 📄 page.js
└ 📁 dashboard
  └ 📄 page.js
          `}</CodeBlock>
          <Table
            data={[
              ["URL", "File"],
              [<Code>/</Code>, <Code>/app/page.js</Code>],
              [<Code>/dashboard</Code>, <Code>/app/dashboard/page.js</Code>],
            ]}
            aligns={["left", "left"]}
          />
        </Section>

        <Section title="Layouts">
          <p>
            Create a <Code>layout.js</Code> file to define a layout for your{" "}
            <Code>page.js</Code>. A layout is applied to all nested routes.
          </p>
          <CodeBlock>{`
📁 app
├ 📄 layout.js
├ 📄 page.js
└ 📁 dashboard
  ├ 📄 layout.js
  └ 📄 page.js
          `}</CodeBlock>
          <CodeBlock>
            {`// app/layout.js

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}
          </CodeBlock>
          <CodeBlock>
            {`// app/dashboard/layout.js

export default function Layout({ children }) {
  return (
    <section>
      <nav>...</nav>

      {children}
    </section>
  );
}`}
          </CodeBlock>
        </Section>
        <Section title="File conventions">
          <Table
            data={[
              ["Convention", "Description"],
              [
                <Code>page.js</Code>,
                "Unique UI of a route and makes routes publicly accessible",
              ],
              [
                <Code>layout.js</Code>,
                "Shared UI for a segment and its children",
              ],
              [
                <Code>loading.js</Code>,
                "Loading UI for a segment and its children",
              ],
              [
                <Code>not-found.js</Code>,
                "Not found UI for a segment and its children",
              ],
              [
                <Code>error.js</Code>,
                "Error UI for a segment and its children",
              ],
              [<Code>gloal-error.js</Code>, "Global Error UI"],
              [<Code>route.js</Code>, "Server-side API endpoint"],
              [<Code>template.js</Code>, "Specialized re-rendered Layout UI"],
              [<Code>default.js</Code>, "Fallback UI for Parallel Routes"],
            ]}
            aligns={["left", "left"]}
          />
        </Section>

        <Section title="Component hierarchy">
          <ol className="list-inside list-decimal">
            <li>
              <Code>layout.js</Code>
            </li>
            <li>
              <Code>template.js</Code>
            </li>
            <li>
              <Code>error.js</Code> (React error boundary)
            </li>
            <li>
              <Code>loading.js</Code> (React suspense boundary)
            </li>
            <li>
              <Code>not-found.js</Code> (React error boundary)
            </li>
            <li>
              <Code>page.js</Code> or nested <Code>layout.js</Code>
            </li>
          </ol>
          <CodeBlock>{`<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<NotFound />}>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
          `}</CodeBlock>
        </Section>

        <Section title="Route conventions">
          <Table
            data={[
              ["Convention", "Example", "Description"],
              [
                "Route group",
                <Code>(folderName)</Code>,
                "A logical group that is not reflected in the URL.",
              ],
              [
                "Dynamic routes",
                <Code>[folderName]</Code>,
                <>
                  A segment that can be dynamic. Its value is passed as a prop{" "}
                  <Code>params</Code> to the page.
                </>,
              ],
              [
                "Catch-all segment",
                <Code>[...folderName]</Code>,
                "Similar to dynamic routes, but matches all paths. The returned prop is an array.",
              ],
              [
                "Paralles routes",
                <Code>@folderName</Code>,
                "Allows to render one or more pages in the same layout.",
              ],
              [
                "Intercepting routes",
                <>
                  <Code>(.)</Code>, <Code>(..)</Code>, <Code>(..)(..)</Code> or{" "}
                  <Code>(...)</Code>
                </>,
                "Allows to load a route withing the current layout while keeping the context for the current page.",
              ],
            ]}
            aligns={["left", "left", "left"]}
          />
        </Section>
      </div>
    </div>
  );
}
