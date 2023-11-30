---
tags: post
layout: post.liquid
date: 2023-06-15
title: Make your tests fail on network requests with MSW
---

This won't work. It will only `console.error` the unhandled requests:

```js
import { setupServer } from "msw/node";

const mockServer = setupServer();

beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: "error" });
});
```

You can use this workaround:

```js
import { setupServer } from "msw/node";

const mockServer = setupServer();

let unhandledRequests = [];
beforAll(() => {
  mockServer.listen({
    onUnhandledRequest: (req) => {
      unhandledRequests.push(`${req.method} ${req.url}`);
    },
  });
});

beforeEach(() => {
  unhandledRequests = [];
});

afterEach(() => {
  expect(unhandledRequests).toEqual([]);
});
```

The error message will contain an array with all the unhandled requests.
