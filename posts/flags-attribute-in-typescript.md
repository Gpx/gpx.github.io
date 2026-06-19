---
tags:
  - post
  - TypeScript
layout: post.liquid
title: "FlagsAttribute in TypeScript"
date: "2023-03-22"
---

I discovered a neat trick I while reading [TypeScript](https://www.typescriptlang.org/)'s source code.

[.NET](https://dotnet.microsoft.com/en-us/) developers call it _FlagsAttribute_.

```ts
enum ColorFlags {
  None = 0,
  Red = 1 << 0,
  Yellow = 1 << 1,
  Purple = 1 << 2,
  Blue = 1 << 3,
  Brown = 1 << 4,
}
```

This little snippet has a lot going on, so let's unpack it

The `<<` symbol is the [left shift operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift). It takes the binary representation of the value on the left and shifts every bit N-times where N is the number on the right.

```ts
const a = 5; // 00000101
a << 1 === 10; // 00001010
a << 2 === 20; // 00010100
a << 3 === 40; // 00101000
```

If we use `1` as the left operand, something interesting happens: we get the powers of two. This means that the binary representation of the number will have only one bit set to `1`, and the rest will be zero.

```ts
1 << 0; // 00000001
1 << 1; // 00000010
1 << 2; // 00000100
1 << 3; // 00001000
```

This means that the initial snippet could be rewritten as this:

```ts
enum ColorFlags {
  None = 0,
  Red = 1,
  Yellow = 2,
  Purple = 4,
  Blue = 8,
  Brown = 16,
}
```

The question is: why do this?

Imagine we want to allow only some colors to be used and that the list of allowed colors is dynamic—perhaps passed as a configuration object. Then, we can use the [bitwise OR](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR) `|` operator to code this:

```ts
const AllowedColors = ColorFlags.Red | ColorFlags.Yellow | ColorFlags.Blue;
// 0001 | 0010 | 1000 = 1011
```

Let's say that we get a `color` as a parameter, and we want to do something if this color is `Red`, but _only if_ `Red` is one of the allowed colors. We can now do this:

```ts
if ((AllowedColors & color) === ColorFlags.Red) {
  // do something
}
```

If color is allowed, the [bitwise AND](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND) `&` will return its code; otherwise, it will return zero, which we mapped to the value `None` in our enum.

---

Here you can see this technique being used in TypeScript's codebase: [types.ts](https://github.com/microsoft/TypeScript/blob/f218a562bfb417ecec263fc96d7a7a71abf96268/src/compiler/types.ts#L787)
