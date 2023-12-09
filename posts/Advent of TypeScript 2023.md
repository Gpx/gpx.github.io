---
tags: post
title: Advent of TypeScript 2023
layout: post.liquid
date: git Last Modified
---

These are my solutions for [TypeHero's 2023 Advent of TypeScript](https://typehero.dev/aot-2023). I'll update this post as new ones are released.

## Day One

```ts
type SantasFavoriteCookies = "ginger-bread" | "chocolate-chip";
```

## Day Two

```ts
type CookieSurveyInput<T> = keyof T;
```

## Day Three

```ts
type GiftWrapper<A, B, C> = {
  present: A;
  from: B;
  to: C;
};
```

## Day Four

```ts
type Address = { address: string; city: string };
type PresentDeliveryList<T> = {
  [Property in keyof T]: Address;
};
```

## Day Five

```ts
type SantasList<
  BadList extends readonly any[],
  GoodList extends readonly any[]
> = [...BadList, ...GoodList];
```

## Day Six

```ts
type FilterChildrenBy<List, Filter> = Exclude<List, Filter>;
```

## Day Seven

```ts
type AppendGood<ListT> = {
  [Property in keyof ListT as `good_${string & Property}`]: ListT[Property];
};
```

## Day Eight

```ts
type RemoveNaughtyChildren<T> = Omit<T, `naughty_${string}`>;
```

## Day Nine

```ts
type Reverse<T extends string> = T extends `${infer Head}${infer Tail}`
  ? `${Reverse<Tail>}${Head}`
  : "";
```
