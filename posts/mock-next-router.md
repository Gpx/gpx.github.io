---
tags:
  - post
  - Testing
  - React
  - Next.js
layout: post.liquid
title: "Mock Next.js Router for Testing"
date: "2023-05-09"
---

How do you test route changes in Jest Next.js? Well, out of the box, it sucks 😔

That's because Jest tests are not running in a real browser. Instead, they run in an environment called [jsdom](https://github.com/jsdom/jsdom).
jsdom's job is to simulate a browser as much as possible, but if writing a browser is hard, simulating it can be even harder.
In particular, jsdom does not simulate navigation. So how do we test these cases?

Luckily Next.js comes with its own routing. We can mock that!
You can use `next-router-mock` and do something like this:

```tsx
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

it("tests also route changes", () => {
  const user = userEvent.setup();
  render(<MyComponent />, { wrapper: MemoryRouterProvider });
  user.click(screen.getByText("Navigate away"));
  expect(mockRouter.asPath).toEqual("/away");
});
```

You can see more examples in `next-router-mock` [README](https://github.com/scottrippey/next-router-mock#readme).
