const fs = require("fs");
const path = require("path");

/** Topic tags per post filename (Eleventy collection tag `post` is added separately). */
const TAGS_BY_FILE = {
  "A JS trick I stopped using.md": ["JavaScript"],
  "Advent of TypeScript 2023.md": ["TypeScript"],
  "Branded types in TypeScript.md": ["TypeScript"],
  "How to deprecate a component.md": ["Engineering", "React"],
  "My ChatGPT Configuration.md": ["AI", "Productivity"],
  "On the switch true pattern 0f050a03896245dc9b697d8e15e278c6.md": ["JavaScript"],
  "RTL-cheatsheet.md": ["Testing"],
  "Take decisions for the junior developer you haven.md": ["Leadership", "Engineering"],
  "The downfall of a software company.md": ["Engineering", "Leadership"],
  "When introducing pain is useful.md": ["Leadership", "Engineering"],
  "create-an-array-containing-1-to-N-in-JS.md": ["JavaScript"],
  "css-modules-and-react.md": ["React", "CSS"],
  "effective-query-functions-for-react-query-with-zod.md": ["React", "TypeScript"],
  "error-test-on-network-with-msw.md": ["Testing"],
  "es6-tail-call-optimization.md": ["JavaScript"],
  "fetching-asynchronous-data-with-react-hooks.md": ["React"],
  "five-things-you-didnt-know-about-testing-library.md": ["Testing", "React"],
  "flags-attribute-in-typescript.md": ["TypeScript"],
  "hedge-funds-for-developers.md": ["Finance"],
  "how-to-start-with-open-source.md": ["Open Source"],
  "how-to-style-text.md": ["CSS"],
  "how-to-test-asynchronous-methods.md": ["Testing", "React"],
  "javascript-function-composition.md": ["JavaScript"],
  "learning-with-ai-without-losing-the-ability-to-think.md": ["AI", "Education"],
  "making-sense-of-useeffect.md": ["React"],
  "mind-the-gap-when-upgrading-to-http-2.md": ["Web", "Performance"],
  "mock-next-router.md": ["Testing", "React", "Next.js"],
  "mocking-context-with-react-testing-library.md": ["Testing", "React"],
  "my-approach-when-it-comes-to-testing.md": ["Testing"],
  "null-components-should-be-hooks.md": ["React"],
  "optimizing-javascript-with-lazy-evaluation-and-memoization.md": [
    "JavaScript",
    "Performance",
  ],
  "phoenix-architecture-regenerative-software-design.md": ["AI", "Architecture"],
  "primary-ux-states.md": ["UX"],
  "strategic-transition-from-asynchronous-code-review-to-synchronous-pair-programming-an-analytical-framework-for-engineering-leadership.md":
    ["Leadership", "Engineering"],
  "testing-a-custom-select-with-react-testing-library.md": ["Testing", "React"],
  "the-architecture-of-aligned-incentives-engineering-productivity-ai-leverage-and-the-future-of-value-sharing.md":
    ["AI", "Leadership", "Engineering"],
  "the-cutting-edge-of-socio-technical-architecture-transforming-systems-teams-and-flow-in-the-ai-era.md":
    ["Architecture", "AI", "Leadership"],
  "the-paradox-of-technological-deflation-historical-cost-trajectories-and-the-economic-scaling-of-generative-artificial-intelligence.md":
    ["AI", "Economics"],
  "the-persistence-of-theory-reevaluating-naur-s-programming-as-theory-building-in-the-generative-ai-era.md":
    ["AI", "Engineering"],
  "web-apps-the-best-is-yet-to-come.md": ["Web"],
  "what-similarwebs-data-tells-us-about-the-ai-market-today.md": ["AI"],
  "when-ai-gets-typescript-wrong.md": ["AI", "TypeScript"],
};

function buildTagsYaml(topicTags) {
  const lines = ["tags:", "  - post"];
  for (const tag of topicTags) {
    lines.push(`  - ${tag}`);
  }
  return lines.join("\n");
}

function replaceTagsFrontmatter(content, topicTags) {
  const tagsYaml = buildTagsYaml(topicTags);
  if (/^tags:\s*$/m.test(content)) {
    return content.replace(/^tags:\s*$/m, tagsYaml);
  }
  if (/^  tags:\s*post\s*$/m.test(content)) {
    return content.replace(/^  tags:\s*post\s*$/m, tagsYaml.replace(/^/gm, "  "));
  }
  return content.replace(/^tags:\s*post\s*$/m, tagsYaml);
}

const postsDir = path.join(__dirname, "..", "posts");
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

let updated = 0;
for (const file of files) {
  const topicTags = TAGS_BY_FILE[file];
  if (!topicTags) {
    console.warn(`No tags mapped for ${file}`);
    continue;
  }

  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, "utf8");
  const next = replaceTagsFrontmatter(content, topicTags);
  if (next === content) {
    console.warn(`No tags: post frontmatter found in ${file}`);
    continue;
  }
  fs.writeFileSync(filePath, next);
  updated += 1;
}

console.log(`Updated tags in ${updated} posts.`);
