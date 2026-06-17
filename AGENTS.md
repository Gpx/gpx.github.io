# AGENTS.md

Guide for AI agents working on [polvara.me](https://polvara.me) — Giorgio Polvara's personal site and blog.

## Overview

Static site built with [Eleventy](https://www.11ty.dev/) (v3). Source lives in this repo; output goes to `_site/`. Deployed to GitHub Pages on push to `main`. Custom domain: `polvara.me` (see `CNAME`).

No framework (no React/Vue). Templates are Liquid. Styles are hand-written CSS with CSS custom properties. Minimal client-side JS for theme switching only.

## Commands

```bash
npm ci          # install dependencies (Node version in .nvmrc)
npm run build   # generate _site/
npm run serve   # dev server at http://localhost:8080 with live reload
```

Always run `npm run build` after substantive changes to verify the site compiles.

## Project structure

```
├── _includes/
│   ├── base.liquid      # HTML shell: <head>, site nav, theme script
│   └── post.liquid      # Blog post layout: title, meta, pagination, CTA
├── posts/               # Markdown blog posts (*.md)
├── images/              # Static images (passthrough-copied)
├── index.liquid         # Homepage
├── tech-stack.md        # Standalone page (uses post layout)
├── main.css             # Site styles + design tokens
├── code.css             # Syntax highlighting (Prism token classes)
├── theme.js             # Light / dark / auto theme toggle
├── .eleventy.js         # Eleventy config, filters, markdown plugins
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

Files copied as-is to `_site/` (configured in `.eleventy.js`): `main.css`, `code.css`, `theme.js`, `images/`, favicons, `CNAME`, `site.webmanifest`.

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
| CI / deploy | `.github/workflows/deploy.yml` |
