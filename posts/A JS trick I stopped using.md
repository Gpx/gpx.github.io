---
tags: post
title: A JS trick I stopped using
layout: post.liquid
date: "2024-03-19"
---

JavaScript has two ways to represent that a value is not there: `null` and `undefined`. This is bad because it can lead to subtle bugs when you forget to check for both. I’ve been using a trick for years that relies on another quirk of JavaScript: `==` and `===`.

If you want to check that a value is defined or not, you can do:

```tsx
let value;
if (value == null) {
}
```

Since we’re using `==`, the code above is equivalent to:

```tsx
let value;
if (value === null && value === undefined) {
}
```

As I said, I’ve been using this for years until a colleague pointed out that when using TypeScript, this is no longer needed. The reason is, with types I know all the possible values a variable can hold.

```tsx
let value: string | undefined;
if (value === undefined) {
}

// This will never happen
// because `value` can’t be `null`
if (value === null) {
}
```

It’s a small change in my workflow, but it signifies how, with TypeScript, JavaScript is becoming a better and more maintainable language.
