---
tags:
  - post
  - AI
  - TypeScript
layout: post.liquid
title: "When AI Gets TypeScript Wrong"
date: "2025-11-20"
---

Today I ran into one of those tiny pieces of code that look harmless but end up teaching you something.

I was looking at this expression:

```ts
offer.items?.[0].ancillaries_selected?.[0].type === "flexi_fare" ?? false;
```

TypeScript warned me that the right side of the `??` was unreachable. Basically: the left side was never nullish, so `?? false` was doing nothing. Cool, easy cleanup.

I removed it and opened a PR.

Then the funny part happened.

Two different AI tools confidently told me that my change was wrong. Their argument was that removing the nullish coalescing operator would make the whole thing return undefined.

This was just incorrect.

Nothing complicated here. No language tricks. No edge cases. Just a basic misread of how `===` binds and how `??` works.

And that’s the thing: AI is extremely good at producing answers that sound correct. It’s not always good at being correct.

We’re all using these tools every day and they’re great accelerators. But they also hallucinate. They miss context. They misunderstand simple semantics.

This isn’t an anti-AI point. I use it constantly. It’s just a reminder that you still need engineers who actually know what’s happening in the codebase, who understand the language, and who don’t blindly trust whatever an assistant says with confidence level 110%.

AI is a multiplier.
But it still needs a human who can tell when the multiplier is pointing in the wrong direction.

If you want a conclusion, it’s this:
Use AI, but don’t outsource your understanding to it. Keep your brain in the loop. That’s the part that still matters.
