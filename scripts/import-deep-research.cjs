#!/usr/bin/env node
/**
 * Import a Gemini Deep Research public share into posts/*.md
 *
 *   npm run import:research -- --share https://gemini.google.com/share/abc123
 *   npm run import:research -- --share ... --slug my-post --date 2026-06-17 --draft
 *   npm run import:research -- --from-json scripts/fixtures/gemini-abc123.json
 *
 * Every import runs cleanBodyForPublish() in gemini-research.cjs, which strips
 * inline citations and Gemini junk links, and converts equations to KaTeX.
 *
 * First run installs Chromium: npx playwright install chromium
 */

const path = require("path");
const {
  extractFromShare,
  loadFixture,
  saveFixture,
  shareIdFromUrl,
  slugify,
  writePost,
} = require("./lib/gemini-research.cjs");

function parseArgs(argv) {
  const opts = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--share") opts.share = argv[++i];
    else if (arg === "--from-json") opts.fromJson = argv[++i];
    else if (arg === "--slug") opts.slug = argv[++i];
    else if (arg === "--title") opts.title = argv[++i];
    else if (arg === "--date") opts.date = argv[++i];
    else if (arg === "--tags") opts.tags = argv[++i];
    else if (arg === "--out") opts.out = argv[++i];
    else if (arg === "--draft") opts.draft = true;
    else if (arg === "--save-fixture") opts.saveFixture = true;
    else if (arg === "--help" || arg === "-h") opts.help = true;
  }
  return opts;
}

function printHelp() {
  console.log(`Import Gemini Deep Research into the blog

Usage:
  npm run import:research -- --share <gemini-share-url> [options]
  npm run import:research -- --from-json <fixture.json> [options]

Options:
  --share URL        Public Gemini share link (required unless --from-json)
  --from-json PATH   Rebuild from a saved fixture (scripts/fixtures/gemini-*.json)
  --slug SLUG        Output filename without .md (default: slugified title)
  --title TITLE      Override title when using --from-json
  --date YYYY-MM-DD  Publication date (default: today)
  --tags LIST        Comma-separated topic tags (required unless post already has tags)
  --out PATH         Output path (default: posts/<slug>.md)
  --draft            Exclude from homepage until ready
  --save-fixture     Save extraction JSON to scripts/fixtures/

Setup (once):
  npx playwright install chromium

On every import (share or --from-json), inline citations are removed and equations are converted to KaTeX.
`);
}

function logImportResult(outPath, math, tags) {
  console.log(`Wrote ${path.relative(process.cwd(), outPath)}`);
  console.log(`Tags: ${tags.join(", ")}`);
  if (math.blockFormulas || math.variables) {
    console.log(
      `Math: ${math.blockFormulas} block formula(s), ${math.variables} variable(s) as inline math`
    );
  }
}

async function importFromShare(opts) {
  let playwright;
  try {
    playwright = require("playwright");
  } catch {
    console.error(
      "Playwright is required for --share imports.\nRun: npm install && npx playwright install chromium"
    );
    process.exit(1);
  }

  const browser = await playwright.chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    console.log(`Fetching ${opts.share} …`);
    const data = await extractFromShare(page, opts.share);
    if (opts.title) data.meta.title = opts.title;
    if (opts.slug) data.meta.slug = opts.slug;
    if (opts.draft) data.meta.draft = true;

    if (opts.saveFixture) {
      const fixturePath = saveFixture(data, opts.share);
      console.log(`Saved fixture ${fixturePath}`);
    }

    const { outPath, math, tags } = writePost(data, opts);
    console.log(`Sources: ${Object.keys(data.byIndex).length} citation groups`);
    logImportResult(outPath, math, tags);
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
  if (opts.share) data.meta.geminiShare = opts.share;

  const { outPath, math, tags } = writePost(data, opts);
  logImportResult(outPath, math, tags);
}

async function main() {
  const opts = parseArgs(process.argv);
  if (opts.help || (!opts.share && !opts.fromJson)) {
    printHelp();
    process.exit(opts.help ? 0 : 1);
  }

  if (opts.fromJson) {
    importFromFixture(opts);
    return;
  }

  if (!shareIdFromUrl(opts.share)) {
    console.error("Invalid share URL. Expected https://gemini.google.com/share/<id>");
    process.exit(1);
  }

  await importFromShare(opts);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
