---
tags: post
layout: post.liquid
title: "How to Style Text in HTML"
date: "2023-04-03"
---

Do you want to learn how to transform a wall of text into a readable, responsive, and dark mode-friendly page with just 32 lines of CSS? These basic rules have been my go-to for years and are the perfect starting point for any new website.

{{ '/images/how-to-style-text/1.png' | figure: 'The default document' }}
{{ '/images/how-to-style-text/2.png' | figure: 'The page after our styling' }}

I'm using an excerpt from [Factorio's Wikipedia page](https://en.wikipedia.org/wiki/Factorio). By the way, it's an awesome game 🎮

Let's make the text easier to read. Right now, the lines are too long and condensed. We can change that with three simple CSS rules.

```css
main {
  max-width: 60ch;
  line-height: 1.5;
  font-size: 1.2rem;
}
```

We can now improve the appearance. Sans-serif fonts are usually a good choice for web pages. I'm using the system's font with a list of fallbacks.

```css
main {
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
```

I like to align the block in the center and give it some side padding so it looks good on small screens too.

```css
body {
  margin: 0;
}

main {
  margin: 0 auto;
  padding: 0 1rem;
}
```

Looking good! Let's make it even better! 🤩

{{ '/images/how-to-style-text/3.png' | figure: 'Already looking better' }}

I'm going to add some space before each heading so the text can "breathe" a bit more.

```css
h1,
h2,
h3 {
  margin-top: 2em;
}
```

Let's add some colors. It's usually better to avoid full black, even for text. I'll pick a very dark gray instead. I'll then use a slightly off-white color for the background and a light blue for the links.

```css
:root {
  --background: hsl(200 50% 98%);
  --text: hsl(0 0% 20%);
  --accent: hsl(200 60% 50%);
}

body {
  background-color: var(--background);
}

main {
  color: var(--text);
}

a {
  color: var(--accent);
}
```

Want to take it up a notch? Add a top-line. Trust me, things will look sharper 😎

```css
body {
  border-top: 3px solid var(--accent);
}
```

{{ '/images/how-to-style-text/4.png' | figure: 'The light version' }}

Almost there! We only need to add dark mode. Luckily, it's just a matter of changing our color variables.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: hsl(200 50% 18%);
    --text: hsl(200 50% 95%);
    --accent: hsl(330 60% 50%);
  }
}
```

And there you have it. A readable, responsive, and good-looking HTML page in 32 lines of CSS.

Check it out with full code live.

<iframe
  height="300"
  style="width: 100%; min-height: 30rem; margin-bottom: 2rem"
  scrolling="no"
  title="Basic post style"
  src="https://codepen.io/Gpx/embed/vYzqEKp?default-tab=result"
  frameborder="no"
  loading="lazy"
  allowtransparency="true"
  allowfullscreen="true"
/>
