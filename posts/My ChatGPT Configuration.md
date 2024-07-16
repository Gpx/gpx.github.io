---
tags: post
title: My ChatGPT Configuration
layout: post.liquid
date: "2024-07-16"
---

I’ve been using ChatGPT since it first came out, and it has become an invaluable tool that assists me in my job. I mainly use it for:

- Debugging cryptic errors—I’m looking at you, TypeScript.
- Getting a quick answer on how to use a command line program without digging into the documentation.
- Check my grammar and the general composition of my sentences.
- Help me write blog posts, design documents, or other long-text documents.
- Find that one library I forgot the name of, but I vaguely remember how it works and maybe the logo's color.
- Throw ideas at it to brainstorm.
- And pretty much everything I have been using Google for before.

If you’re not aware of this, you can customize ChatGPT to better answer you. You can set two configurations. Both are text areas that accept up to 1500 characters.

This is my configuration.

**What would you like ChatGPT to know about you to provide better responses?**

```
I use the metric system
I speak en-us, it, en-gb, es in this order of preference
```

It’s only two lines long, but they allow me to get relevant answers. I have no idea how much a foot is, and I often need to check my Spanish using the European variant. These instructions help me get answers that make sense to me.

**How would you like ChatGPT to respond?**

```
Keep your answers short if I want to know more I'll ask you
Be informal but not at the cost of clarity and precision
Put source code at the very beginning of your answer and add explanations afterward if needed
Do not include commands to install dependencies unless I ask you to
Write frontend not front-end, same for fullstack and backend
If I type xxx I want you to check the web before you answer me
If I type ccc I want you to check the test I wrote for mistakes
```

Here is where I try to gain speed. ChatGPT is slow, and to make things worse, by default it tends to write a lot and be very pompous. With the first two lines, I keep the answers short.

Most of the time, when I ask for some code, I want to see the code first, not a long explanation of the theory behind it. I know the theory; I need the code. This is what the third line does for me.

Even so, the code at the beginning is usually some form of `npm install` for whatever dependency we’re working with. I know how to install modules, so line 4 makes sure those commands are not there.

As I said, I use ChatGPT to help me write, and I have some conventions. One of them that I often have to overwrite is spelling _frontend_ instead of _front-end_. This change might look small, but it helped save a lot of time.

The last two lines are shortcuts. I often ask ChatGPT something and don’t trust it will give me the correct answer. What I want instead is for it to search the Web for information. I can do that by simply typing `xxx` at some point in my request. For example, “What’s the average distance from Earth to the Sun xxx” will provide me an answer with links to then verify it. I use this constantly. I use `xxx` because it is easy to remember and doesn’t usually appear in text. You can change it for whatever reason, of course.

`ccc` is another shortcut I use to check if the text I entered is correct. As an Italian living in Spain and working in English, I often wonder if my sentences are correct. Now, I can type “voy a estar alli ccc” to know I’m missing an accent.

---

This configuration is growing, and I’ll keep this page updated with new changes. If you have tips that you use on your own, feel free to [reach out to me on X/Twitter](https://x.com/Gpx).
