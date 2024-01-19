---
layout: post.liquid
tags: post
title: On the switch true pattern
date: 2024-01-19
---

I recently stumbled upon the _switch-true pattern_ in JavaScript. If you don’t know it, here’s an example:

```tsx
function isUserValid(user) {
  switch (true) {
    case user.age < 18:
      return false;
    case user.isGuest:
      return false;
    default:
      return true;
  }
}
```

It’s supposed to be an improvement over using `if` and early returns. Here’s the same code written in a more _traditional way_:

```tsx
function isUserValid(user) {
  if (user.age < 18) return false;
  if (user.isGuest) return false;
  return true;
}
```

My 16-year-old self would have loved the switch-true pattern. Why? Because it feels hacky. You’re using the language in a way that was not intended to be used. JavaScript has many of these little quirks, like doing `!!value` to cast to a boolean or `+value` to cast to a number.

Luckily, through the years, I’ve grown and matured, and I can say I do not like this pattern. I don’t see it adding anything to the usual way of writing code and, if anything, could confuse newcomers—[which is something I’m against](/posts/Take%20decisions%20for%20the%20junior%20developer%20you%20haven/). Nothing wrong if you like it and want to use it in your projects, but if you ask me, you’re better off sticking with good old `if`.
