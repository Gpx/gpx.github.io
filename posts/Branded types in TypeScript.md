---
tags:
  - post
  - TypeScript
layout: post.liquid
title: Branded types in TypeScript
date: 2023-12-01
---

Branded types are a relatively unknown feature of TypeScript but can help make a codebase safer. As with all types, they don’t replace testing or QA but augment them, improving the developer experience.

We can see why they are useful with a simple example. See if you can spot the bug in the snippet below.

```tsx
function purchaseFlight(userId: string, flightId: string) {
  // Pretend we’re buying a flight ticket
}

const userId: string = "U123";
const flightId: string = "F456";

purchaseFlight(flightId, userId);
```

The error is right at the bottom. We’re calling `purchaseFlight` with its arguments reversed: the user ID becomes the flight ID and vice versa. Again, you should have tests covering this scenario, but it would be great if TypeScript helped us while writing this code.

The issue is that `userId` and `flightId` are of type `string`, so there’s no way to distinguish them at the type level. Let’s try by introducing type aliases.

```tsx
type UserId = string;
type FlightId = string;

function purchaseFlight(userId: UserId, flightId: FlightId) {
  // Pretend we’re buying a flight ticket
}

const userId: UserId = "U123";
const flightId: FlightId = "F456";

purchaseFlight(flightId, userId);
```

This version would make sense in a language like Java or C++ that supports a [_nominal type system_](https://en.wikipedia.org/wiki/Nominal_type_system) but not in TypeScript. This code and the one above are equivalent.

Here’s where branded types come into play. With a branded type, we can simulate nominal types. See the updated version of our example.

```tsx
type UserId = Brand<string, "UserId">;
type FlightId = Brand<string, "FlightId">;

function purchaseFlight(userId: UserId, flightId: FlightId) {
  // Pretend we’re buying a flight ticket
}

const userId = "U123" as UserId;
const flightId = "F456" as FlightId;

// @ts-expect-error
purchaseFlight(flightId, userId);
```

This is finally failing, as we’re expecting. By introducing the `Brand` generic type, we can tell TypeScript that although our values are both strings, they are indeed of different types.

Notice how we had to use the `as` operator when declaring our values. Without that, TypeScript would have no way to know that `"U123"` is not a simple string but a `UserId`.

There are different ways to implement `Brand`, each with pros and cons. Some TypeScript libraries like [Effect come with one](https://effect.website/docs/style/brands). I like to use [Matt Pocock’s implementation](https://twitter.com/mattpocockuk/status/1625173884885401600?lang=en) because it’s easy to include in any codebase.

```tsx
declare const brand: unique symbol;
type Brand<T, TBrand extends string> = T & { [brand]: TBrand };
```

You can play with `Brand` and the example in this post in [this playground](https://www.typescriptlang.org/play?#code/CYUwxgNghgTiAEYD2A7AzgF3gIxlFwAXPAK4oCWAjiQmgJ4C22SEA3AFAZ0AOCAQngIAeACoAaeCIH5g8EAA8MIAmniYY5FAHMAfPAC8k+ADJ4Ab3gBtXDIC6xKYNkBfDpx4IAqmhAwAkrKG0sLqmloSAETevgEROhxcvPAAYhDkWgAWGAEG8MHAQqHakanpWbHx7OwAZmRgGOSo8NwkMGAZUD6lmRgAFCQ+-kTw0UMS1Wk9AcTd5cAAlObs8PAA9KvwAApwSgTwAO4ggJgEcDgkdGHwUPATZVgNYADWIBjszlXI6FgDMYHwUQBGABMAGYIldVKMAhxPpgbpM5rkIskACwAVgAbODOikEdlgG51vAAAIYNAAWgUvHqlJgMCQMHYLTaHS6eN6tymwAkPyG8zczPanRAsz6vIC4zxAX57CAA).
