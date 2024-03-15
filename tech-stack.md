---
layout: post.liquid
title: My Tech Stack
show_last_modified: true
date: git Last Modified
# tags: post
---

<style>
  .tech-stack-item p {
    margin: 1em 0;
  }

  .tech-stack-item {
    margin-bottom: 4rem;
    border-left: 4px solid currentColor;
    padding-left: 1rem;
  }
</style>

Part of my job is to try and evaluate new technologies to see if they are a good fit for my company. On this page, I want to share my current tech stack and the reasons why I chose it. I will also share some of the options I'm currently evaluating and some of the technologies I've used in the past but I'm not using anymore.

A quick note before we start. My tech stack is the best one _for me_. It's what _I_ like to use because it makes sense to me. If you decide to use something else that's fine. Context is important. A Ferrari is a great car, but if you live in the mountains and do landscaping for a living it's probably not the best choice for you.

_This is a living document. I will update it as my tech stack evolves._

## Testing

<div class="tech-stack-item">

**Jest - ✅ Keep using**

Jest is my framework of choice for testing. It has all the features a modern testing framework needs and is very easy to set up. It also has a big community and great documentation.

[jestjs.io](https://jestjs.io/)

</div>

<div class="tech-stack-item">

**Vitest - ⏳ Exploring it**

Vitest markets itself as a faster Jest-compatible test runner. It is faster than Jest for most things. However, I haven't had the chance to try it on a larger codebase yet. But this looks like a very promising project.

[vitest.dev](https://vitest.dev/)

</div>

<div class="tech-stack-item">

**Testing Library - ✅ Keep using**

I've been using Testing Library almost since its inception. I even built a small library on top of it called [user-event](https://testing-library.com/docs/user-event/intro/). For me, it has improved greatly the way I think about testing.

[testing-library.com](https://testing-library.com/)

</div>

<div class="tech-stack-item">

**Node-tap - ⏳ Exploring it**

What I like about Node-tap is that it brings a new (at least for me) way of thinking about testing. Does it mean that it's better than the "traditional" approach? I don't know yet but I'm investigating it. Even if it's better though it will need to gather a big community around it to be a viable option.

[node-tap.org](https://node-tap.org/)

</div>
