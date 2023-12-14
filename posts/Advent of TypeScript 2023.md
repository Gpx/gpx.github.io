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

## Day Ten

```ts
type StreetSuffixTester<
  TString extends string,
  TSuffix extends string
> = TString extends `${string}${TSuffix}` ? true : false;
```

## Day Eleven

```ts
type SantaListProtector<T> = T extends Record<string, unknown> | Array<unknown>
  ? {
      readonly [K in keyof T]: SantaListProtector<T[K]>;
    }
  : T;
```

## Day Twelve

```ts
type FindSanta<TForest extends ("🎅🏼" | "🎄")[]> = TForest extends [
  ...infer Head extends ("🎅🏼" | "🎄")[],
  infer Tail
]
  ? Tail extends "🎅🏼"
    ? Head["length"]
    : FindSanta<Head>
  : never;
```

## Day Thirteen

```ts
type DayCounter<FromT extends number, ToT extends number> = [
  ...DropHead<FromT, Tail<Arr<ToT>>>,
  ToT
][number];

type Arr<N extends number, T extends any[] = []> = T["length"] extends N
  ? T
  : Arr<N, [...T, T["length"]]>;

type DropHead<N extends number, T extends number[]> = T extends [
  infer Head,
  ...infer Tail extends number[]
]
  ? N extends Head
    ? T
    : DropHead<N, Tail>
  : [];

type Tail<T extends any[]> = T extends [infer Head, ...infer Tail] ? Tail : [];
```

## Day Fourteen

```ts
type DecipherNaughtyList<ListT extends string> = ListToArray<ListT>[number];

type ListToArray<ListT extends string> =
  ListT extends `${infer Name}/${infer Rest}`
    ? [Name, ...ListToArray<Rest>]
    : [ListT];
```
