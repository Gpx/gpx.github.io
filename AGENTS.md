# AGENTS.md

Guide for AI agents working on [polvara.me](https://polvara.me) — Giorgio Polvara's personal site and blog.

## Overview

Static site built with [Eleventy](https://www.11ty.dev/) (v3). Source lives in this repo; output goes to `_site/`. Deployed to GitHub Pages on push to `main`. Custom domain: `polvara.me` (see `CNAME`).

No framework (no React/Vue). Templates are Liquid. Styles are hand-written CSS with CSS custom properties. Minimal client-side JS for theme switching and research-post citation popovers. Math in posts is rendered at build time with [KaTeX](https://katex.org/) via `markdown-it-texmath`.

## Commands

```bash
npm ci                    # install dependencies (Node version in .nvmrc)
npm run build             # generate _site/
npm run serve             # dev server at http://localhost:8080 with live reload
npm run import:research   # import a Gemini Deep Research share (see below)
npm run import:gdoc         # import a Google Doc export (see below)
```

First-time setup for research imports:

```bash
npx playwright install chromium
```

Always run `npm run build` after substantive changes to verify the site compiles.

## Project structure

```
├── _includes/
│   ├── base.liquid      # HTML shell: <head>, site nav, theme script
│   ├── post.liquid      # Blog post layout: title, meta, pagination, CTA
│   └── research.liquid  # Deep Research layout: label, sources, citation popover
├── posts/               # Markdown blog posts (*.md)
├── scripts/
│   ├── import-deep-research.cjs   # CLI: import Gemini share → posts/*.md
│   ├── import-google-doc.cjs      # CLI: import Google Doc → posts/*.md
│   ├── lib/
│   │   ├── gemini-research.cjs    # Gemini extraction + shared research post builder
│   │   └── google-docs-research.cjs
│   └── fixtures/                  # saved extractions (gemini-*.json, gdoc-*.json)
├── images/              # Static images (passthrough-copied)
├── index.liquid         # Homepage
├── tech-stack.md        # Standalone page (uses post layout)
├── main.css             # Site styles + design tokens
├── code.css             # Syntax highlighting (Prism token classes)
├── theme.js             # Light / dark / auto theme toggle
├── citations.js         # Citation popovers on research posts
├── katex.min.css        # Copied from node_modules at build (math rendering)
├── .eleventy.js         # Eleventy config, filters, markdown plugins (incl. KaTeX)
├── CNAME                # Custom domain for GitHub Pages
└── .github/workflows/deploy.yml
```

**Do not edit `_site/`** — it is generated and gitignored.

## Adding a blog post

Create a file in `posts/` with this front matter:

```yaml
---
tags: post
title: Your Post Title
layout: post.liquid
date: "YYYY-MM-DD"
---
```

Optional front matter:

- `favorite: true` — shows a ★ on the homepage list and "Popular ⭐️" in post meta

Posts tagged `post` are collected into `collections.post` (used on the homepage and for prev/next navigation).

## Importing research posts

Research posts are long-form articles published with `layout: research.liquid`. They show a **Research** label on the homepage, keep **inline citation links** (`[1](#source-1)`), and render a numbered **Sources** section with clickable URLs. Citation numbers in the text open a popover (`citations.js`) linking to the matching source.

Two import paths share the same output format via `buildResearchPost()` in `scripts/lib/gemini-research.cjs`:

| Source | Command | Typical workflow |
|---|---|---|
| [Gemini Deep Research](https://gemini.google.com/) share | `npm run import:research -- --share <url>` | Fetch share in Playwright, harvest citation carousels |
| Google Doc (e.g. exported Gemini report) | `npm run import:gdoc -- --doc <url>` | Fetch HTML export, parse "Works cited" bibliography |

Both write `posts/<slug>.md` with `sources` front matter and preserved `[n](#source-n)` anchors. Source `id` values match citation numbers in the text.

### Gemini Deep Research

#### Quick import

```bash
# From a public share URL (requires Playwright + Chromium)
npm run import:research -- \
  --share https://gemini.google.com/share/3675721ec0e3

# Options
npm run import:research -- \
  --share https://gemini.google.com/share/abc123 \
  --slug my-research-slug \
  --date 2026-06-17 \
  --draft \
  --save-fixture
```

| Flag | Purpose |
|---|---|
| `--share URL` | Public Gemini share link (required unless `--from-json`) |
| `--from-json PATH` | Rebuild from a saved fixture in `scripts/fixtures/` |
| `--slug SLUG` | Output filename (default: slugified title) |
| `--date YYYY-MM-DD` | Publication date (default: today) |
| `--draft` | Sets `eleventyExcludeFromCollections: true` (hidden from homepage) |
| `--save-fixture` | Saves raw extraction to `scripts/fixtures/gemini-<id>.json` |

#### What the Gemini importer does

1. Opens the share URL in headless Chromium (no sign-in needed for public shares)
2. Extracts title, body (headings, paragraphs, lists, tables), and citation carousel links
3. Runs `cleanBodyForPublish()` — strips stray Gemini markdown links, **keeps** `[n](#source-n)` citations, converts equations to KaTeX
4. Writes `posts/<slug>.md` with `sources` where each `id` matches the citation index in the text (primary carousel link per index)
5. Sets `geminiShare` in front matter

Fixtures (`scripts/fixtures/gemini-*.json`) store the **raw** extracted body. Re-importing from a fixture re-applies publish cleanup and math conversion without re-fetching Gemini.

#### Re-import from Gemini fixture

```bash
npm run import:research -- --from-json scripts/fixtures/gemini-3675721ec0e3.json
```

### Google Docs

Use when the article lives in a Google Doc (common after copying a Gemini report into Docs for editing).

```bash
npm run import:gdoc -- \
  --doc https://docs.google.com/document/d/abc123/edit

# Options mirror Gemini import (--slug, --date, --draft, --save-fixture, --from-json)
npm run import:gdoc -- \
  --doc https://docs.google.com/document/d/abc123/edit \
  --date 2026-06-17 \
  --save-fixture
```

| Flag | Purpose |
|---|---|
| `--doc URL` | Public Google Doc link (required unless `--from-json`) |
| `--from-json PATH` | Rebuild from `scripts/fixtures/gdoc-*.json` |
| `--slug`, `--date`, `--draft`, `--save-fixture` | Same as Gemini import |

The doc must include a **Works cited** section (numbered bibliography). Superscript citation numbers in the body become `[n](#source-n)`; bibliography entries become `sources` with matching `id`s. Sets `googleDoc` in front matter.

#### Re-import from Google Doc fixture

```bash
npm run import:gdoc -- --from-json scripts/fixtures/gdoc-abc123.json
```

### After import

Review the markdown (tables, voice, accuracy), remove `--draft` / `eleventyExcludeFromCollections` when ready to publish, then `npm run build`. Spot-check citation popovers and equations in the browser (`npm run serve`).

### Math and formulas (automatic on import)

Gemini Deep Research often exports equations as plain Unicode text (e.g. `REC=(Testimate−Tactual)×Rloaded×0.5` and definition lines like `Nusers​: 100 engineers`). The importer converts these to KaTeX automatically:

| Step | What happens | Example output |
|---|---|---|
| Block formulas | Standalone `NAME=(…)×…` lines become display math | `\[ REC = (T_{estimate} - T_{actual}) \times R_{loaded} \times 0.5 \]` |
| Inline variables | Tokens from those formulas, when mentioned in prose, become inline math | `\(N_{users}\): 100 engineers` |

Conversion logic lives in `scripts/lib/gemini-research.cjs` (`formatEquations`, `formatInlineVariables`, called from `cleanBodyForPublish`). **Do not bypass `buildResearchPost` / `writePost()` when writing import output** — new import paths must use the shared builder.

The CLI logs how many block formulas and variables were converted. After import, run `npm run build` and spot-check equations in the browser.

**Manual math in any post** (research or regular): use `\[ … \]` for display math and `\( … \)` for inline. Delimiters are bracket-style (not `$…$`) so dollar amounts in prose stay literal.

**Not auto-converted:** worked-example lines that mix arithmetic with dollar amounts and narrative (e.g. `**Calculation**: (4,800−2,400)×$150×0.5=$180,000`). Edit those by hand if needed.

**Site rendering:** `.eleventy.js` configures `markdown-it-texmath` + KaTeX; `base.liquid` loads `katex.min.css`; fonts are passthrough-copied from `node_modules/katex/dist/`.

### Research post front matter

```yaml
---
tags: post
layout: research.liquid
title: "Your Research Title"
date: "YYYY-MM-DD"
geminiShare: "https://gemini.google.com/share/..."   # Gemini imports
googleDoc: "https://docs.google.com/document/d/.../edit"  # Google Doc imports
sources:
  - id: 1
    title: "Source title"
    url: "https://example.com"
---
```

`id` must match inline citation anchors: `[1](#source-1)` → `id: 1`. IDs may be non-contiguous for Gemini posts (e.g. 1, 4, 7).

Optional: `eleventyExcludeFromCollections: true` for drafts.

### Research layout behaviour

- **Deep Research** label in post header
- **Gemini report** link in post meta (`geminiShare`, or `googleDoc` when imported from Docs)
- **Sources** section at the bottom (`id="source-N"` anchors, external links)
- **Citation popovers** (`citations.js`): clicking a superscript `[n]` opens a popover with the source title and link
- Homepage list shows a **Research** tag for posts with `layout: research.liquid`

### Re-import existing posts with citations

Re-run import from a saved fixture to apply importer improvements (citation preservation, math, source mapping) without re-fetching:

```bash
npm run import:research -- --from-json scripts/fixtures/gemini-<id>.json
npm run import:gdoc -- --from-json scripts/fixtures/gdoc-<id>.json
```

### Images in posts

Use the `figure` filter in markdown (outputs `<figure>` with lazy-loaded image):

```liquid
{{ '/images/my-folder/screenshot.png' | figure: 'Caption text shown below the image' }}
```

Optional third argument sets `alt` text. Place image files under `images/`.

### External links

Markdown links starting with `http` automatically get `target="_blank"`, `rel="noopener noreferrer"`, and class `external-link` (shows a ↗ via CSS). Configured in `.eleventy.js`.

### Heading anchors

`markdown-it-anchor` adds permalink anchors to headings. Hovering an `h2` in a post shows `#`.

## Layouts

### `base.liquid`

- Wraps all pages in `<div class="page">`
- **Site navigation** uses `<header class="site-header">` — not a bare `<header>` tag
- Loads Google Fonts: Fraunces, DM Sans, IBM Plex Mono
- Inline script in `<head>` applies saved theme before paint (avoids flash)
- Loads `theme.js` at end of `<body>`
- Social links: LinkedIn first, then Twitter (`https://twitter.com/Gpx`)

### `post.liquid`

- `← Writing` back link
- `<header class="post-header">` with title + date/reading time — **must not use site-header styles**
- `<main class="post">` for markdown body
- Prev/next pagination: **Newer on the left**, **Older on the right** (newest post has only Older; oldest has only Newer)
- Discussion CTA footer (`.post-cta`)

Reading time is computed from word count (~200 wpm) in the template.

### `research.liquid`

Same navigation and pagination as `post.liquid`, plus:

- `<p class="post-research-label">Deep Research</p>` above the title
- `geminiShare` link in post meta
- `<main class="post post-research">` for markdown body
- `<section class="post-sources">` rendered from `sources` front matter
- Attribution footer + `citations.js` for inline source popovers

## Styling conventions

### Design tokens (`main.css` `:root`)

| Token | Purpose |
|---|---|
| `--bg`, `--surface`, `--text`, `--muted` | Page colors |
| `--accent`, `--accent-soft`, `--border` | Links, highlights, borders |
| `--font-display` | Fraunces — headings |
| `--font-body` | DM Sans — body text |
| `--font-mono` | IBM Plex Mono — dates, labels, code |
| `--code-*` | Syntax highlighting palette (light + dark variants) |

### Theme switching

Three modes: **Auto** (system preference), **Light**, **Dark**.

- `theme.js` stores choice in `localStorage` key `"theme"`
- Forced modes set `data-theme="light"` or `data-theme="dark"` on `<html>`
- Auto mode removes `data-theme`; dark palette applies via `@media (prefers-color-scheme: dark)`

When adding new colors, define light defaults on `:root`, then override in both the dark media query and `:root[data-theme="dark"]`.

### Critical CSS rule: scope the site header

Global styles for the top navigation **must** target `.site-header`, never bare `header`:

```css
/* Correct */
.site-header { display: flex; position: sticky; ... }

/* Wrong — also affects <header class="post-header"> */
header { display: flex; position: sticky; ... }
```

A bare `header` selector caused post titles to render in a flex row with date on the right and a sticky blurred background box.

### Post typography

- Body prose capped at `65ch` (`.post`)
- First paragraph has lead styling (`.post > p:first-of-type`)
- Consecutive paragraphs use tighter spacing (`.post p + p`)
- Pagination cards use `.post-pagination-link` with border/background

### Code highlighting

- Plugin: `@11ty/eleventy-plugin-syntaxhighlight` (Prism)
- Styles in `code.css` map Prism `.token.*` classes to `--code-*` variables
- Prism does not tokenize all JS identifiers (e.g. plain variable names) — this is a highlighter limitation

### Passthrough assets

Files copied as-is to `_site/` (configured in `.eleventy.js`): `main.css`, `code.css`, `theme.js`, `citations.js`, `katex.min.css`, `katex/fonts/`, `images/`, favicons, `CNAME`, `site.webmanifest`.

**New static assets must be added to `addPassthroughCopy` in `.eleventy.js`.**

## Eleventy filters

| Filter | Usage |
|---|---|
| `date` | Human-readable date (`Jan 23, 2026`) |
| `isoDate` | ISO date for `<time datetime>` |
| `figure` | Image with caption: `{{ '/images/x.png' \| figure: 'Caption' }}` |

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml`:

1. `npm ci` + `npm run build`
2. Upload `_site/` as GitHub Pages artifact
3. Deploy to GitHub Pages

Production URL: https://polvara.me

## Change guidelines for agents

1. **Keep diffs focused** — match existing patterns; don't refactor unrelated code.
2. **No new frameworks** unless explicitly requested.
3. **Don't commit** unless the user asks.
4. **Test locally** with `npm run build` (and `npm run serve` for visual checks).
5. **Preserve accessibility**: semantic HTML, `aria-label` on nav elements, alt text on images.
6. **Social links**: LinkedIn before Twitter; label is "Twitter" (not "X").
7. **Google Analytics** is in `base.liquid` (`G-9Z7PG23CS5`) — don't remove unless asked.

## Homepage (`index.liquid`)

- Hero with name, role, bio, focus tags, profile photo (`images/giorgio-polvara.png`)
- Post list from `collections.post reversed` (newest first)
- Favorite posts show ★ in the list
- Research posts (`layout: research.liquid`) show a **Research** tag

## Active development branch

Redesign work may be on `redesign/homepage`. `main` is the production branch.

## Common tasks

| Task | Where to change |
|---|---|
| Site-wide nav / head / fonts | `_includes/base.liquid` |
| Post layout / pagination | `_includes/post.liquid` |
| Homepage content | `index.liquid` |
| Colors / typography | `main.css` (`:root` tokens) |
| Code colors | `main.css` (`--code-*`) + `code.css` (token mapping) |
| Theme logic | `theme.js` + inline script in `base.liquid` |
| New markdown behavior | `.eleventy.js` |
| New blog post | `posts/*.md` with `tags: post` |
| Import Gemini Deep Research | `npm run import:research -- --share <url>` |
| Import Google Doc research | `npm run import:gdoc -- --doc <url>` |
| Research layout / sources | `_includes/research.liquid` |
| Citation popovers | `citations.js` + `.post-research` styles in `main.css` |
| Math rendering / import conversion | `.eleventy.js` (KaTeX) + `scripts/lib/gemini-research.cjs` (`cleanBodyForPublish`) |
| Shared research post builder | `scripts/lib/gemini-research.cjs` (`buildResearchPost`) |
| CI / deploy | `.github/workflows/deploy.yml` |
