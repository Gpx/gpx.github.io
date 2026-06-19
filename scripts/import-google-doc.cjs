#!/usr/bin/env node
/**
 * Import a public Google Doc into posts/*.md (research layout + sources list).
 *
 *   npm run import:gdoc -- --doc https://docs.google.com/document/d/abc123/edit
 *   npm run import:gdoc -- --from-json scripts/fixtures/gdoc-abc123.json
 */

const path = require("path");
const {
  docIdFromUrl,
  extractFromGoogleDoc,
  loadFixture,
  saveFixture,
  writePost,
} = require("./lib/google-docs-research.cjs");

function parseArgs(argv) {
  const opts = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--doc") opts.doc = argv[++i];
    else if (arg === "--from-json") opts.fromJson = argv[++i];
    else if (arg === "--slug") opts.slug = argv[++i];
    else if (arg === "--title") opts.title = argv[++i];
    else if (arg === "--date") opts.date = argv[++i];
    else if (arg === "--out") opts.out = argv[++i];
    else if (arg === "--draft") opts.draft = true;
    else if (arg === "--save-fixture") opts.saveFixture = true;
    else if (arg === "--help" || arg === "-h") opts.help = true;
  }
  return opts;
}

function printHelp() {
  console.log(`Import a Google Doc into the blog (research layout + sources)

Usage:
  npm run import:gdoc -- --doc <google-doc-url> [options]
  npm run import:gdoc -- --from-json <fixture.json> [options]

Options:
  --doc URL          Public Google Doc link (required unless --from-json)
  --from-json PATH   Rebuild from scripts/fixtures/gdoc-*.json
  --slug SLUG        Output filename without .md
  --title TITLE      Override title when using --from-json
  --date YYYY-MM-DD  Publication date (default: today)
  --out PATH         Output path (default: posts/<slug>.md)
  --draft            Exclude from homepage until ready
  --save-fixture     Save extraction JSON to scripts/fixtures/

Setup (once):
  npx playwright install chromium
`);
}

function logImportResult(outPath, math, sourceCount) {
  console.log(`Wrote ${path.relative(process.cwd(), outPath)}`);
  console.log(`Sources: ${sourceCount}`);
  if (math.blockFormulas || math.variables) {
    console.log(
      `Math: ${math.blockFormulas} block formula(s), ${math.variables} variable(s) as inline math`
    );
  }
}

async function importFromDoc(opts) {
  let playwright;
  try {
    playwright = require("playwright");
  } catch {
    console.error(
      "Playwright is required for --doc imports.\nRun: npm install && npx playwright install chromium"
    );
    process.exit(1);
  }

  const browser = await playwright.chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    console.log(`Fetching ${opts.doc} …`);
    const data = await extractFromGoogleDoc(page, opts.doc);
    if (opts.title) data.meta.title = opts.title;
    if (opts.slug) data.meta.slug = opts.slug;
    if (opts.draft) data.meta.draft = true;

    if (opts.saveFixture) {
      const fixturePath = saveFixture(data, opts.doc);
      console.log(`Saved fixture ${fixturePath}`);
    }

    const { outPath, math } = writePost(data, opts);
    logImportResult(outPath, math, data.sources.length);
    console.log("\nNext: review the post, then npm run build");
  } finally {
    await browser.close();
  }
}

function importFromFixture(opts) {
  const data = loadFixture(opts.fromJson);
  if (opts.title) data.meta.title = opts.title;
  if (opts.slug) data.meta.slug = opts.slug;
  if (opts.draft) data.meta.draft = true;
  if (opts.doc) data.meta.googleDoc = opts.doc;

  const { outPath, math } = writePost(data, opts);
  logImportResult(outPath, math, data.sources.length);
}

async function main() {
  const opts = parseArgs(process.argv);
  if (opts.help || (!opts.doc && !opts.fromJson)) {
    printHelp();
    process.exit(opts.help ? 0 : 1);
  }

  if (opts.fromJson) {
    importFromFixture(opts);
    return;
  }

  if (!docIdFromUrl(opts.doc)) {
    console.error("Invalid doc URL. Expected https://docs.google.com/document/d/<id>/edit");
    process.exit(1);
  }

  await importFromDoc(opts);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
