---
title: "Fetching Asynchronous Data with React Hooks"
date: "2019-03-07"
---

<details class="tldr">
  <summary>TL;DR;</summary>

Use the
[`useAsync()`](https://github.com/streamich/react-use/blob/master/docs/useAsync.md)
hook from [streamich](https://github.com/streamich) to handle your asynchronous
needs.

</details>

Fetching data is one of those things that I do all the time in my code. I've
decided to take a look at ways to streamline it as much as possible.

## A Word About My Setup

Before we get started, there are a few things that might throw you off.

- I use `async`/`await`; you can read more about it
  [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- I initialize my state with
  [class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations)
  rather than in the `constructor`
- In the examples, I'm going to call `getResource` which is a function that
  returns a
  [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
  I do this both because I want to hide the fetching logic and because it's then
  easier to test my component—I
  [`jest.mock`](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options)
  the import

## Fetch One Resource

Probably the most common use-case for asynchronous code is to fetch a single
resource when the component mounts. We need this all the time: fetch the latest
tweets for the user, get the list of friends, fetch the most popular
videos&hellip; the list goes on and on.

With class-based components we do this in the `componentDidMount` method:

```jsx
import React from "react";
import { getResource } from "./api";

class FetchOneResource extends React.Component {
  state = { valueA: null };

  async componentDidMount() {
    const valueA = await getResource("A");
    this.setState({ valueA });
  }

  render() {
    const { valueA } = this.state;

    return valueA == null ? "Loading..." : valueA;
  }
}
```

We fetch our resource and put the result in the state. Our `render` method uses
a
[ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
to decide if we want to show a loading message or our result.

The above code works but has two issues:

- What if `getResource()` fails?
- What if `getResource()` doesn't fail but returns `null`?

Those are usually considered _edge cases_ but they can happen. We can't push
this code in production unless we address these issues:

```jsx
import React from "react";
import { getResource } from "./api";

class FetchOneResource extends React.Component {
  state = {
    valueA: null,
    loadingA: true, // highlight-line
    errorA: null // highlight-line
  };

  componentDidMount() {
    this.getA(); // highlight-line
  }

  // highlight-start
  async getA() {
    try {
      this.setState({ loadingA: true });
      const valueA = await getResource("A");
      this.setState({ valueA });
    } catch (e) {
      this.setState({ errorA: e });
    } finally {
      this.setState({ loadingA: false });
    }
  }
  // highlight-end

  render() {
    const { valueA, loadingA, errorA } = this.state; // highlight-line

    if (errorA) return "Failed to load resource A"; // highlight-line
    return loadingA ? "Loading..." : valueA; // highlight-line
  }
}
```

We added two new state variables, `loadingA` and `errorA`. Note how `loadingA`
is set to `true` initially. That's because we want to display the loading
message already at the first render.

We also moved the fetching in a separate method and wrapped it in a
`try`/`catch` statement. The
[`finally`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#The_finally_clause)
branch is a somewhat new addition to JavaScript. It simply means "run this
branch all the time no matter if the above code failed or not."

---

Nowadays, I avoid writing React classes if I can help it. Let's see how we can
rewrite `FetchOneResource` using Hooks:

```jsx
import React, { useState, useEffect } from "react";
import { getResource } from "./api";

function FetchOneResource() {
  const [valueA, setValueA] = useState(null);
  const [errorA, setErrorA] = useState(null);
  const [loadingA, setLoadingA] = useState(true);
  async function getA() {
    try {
      setLoadingA(true);
      const valueA = await getResource("A");
      setValueA(valueA);
    } catch (e) {
      setErrorA(e);
    } finally {
      setLoadingA(false);
    }
  }
  useEffect(() => {
    getA();
  }, []);

  if (errorA) return "Failed to load resource A";
  return loadingA ? "Loading..." : valueA;
}
```

Most of the code remained the same, so let's focus on the differences.

We converted our class into a function. That's because Hooks can be used only
within a functional component.

Our state is now declared with the
[`useState`](https://reactjs.org/docs/hooks-reference.html#usestate) hook which
gives us back the value and a function to set it. This is roughly how it
compares to a class-based state:

```jsx
// This code in a class component...
this.setState({ foo: 42 });
console.log(this.state.foo);

// ...is equivalent to this code in a functional component
const [foo, setFoo] = useState();
setFoo(42);
console.log(foo);
```

The other Hook that we're using is
[`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect). It's
probably the most complex of all pre-defined Hooks I wrote a bit about how it
works [here](/posts/making-sense-of-useeffect). In this case, we're using it to
run our `getA` function for us precisely one time after the component mounts.

---

Before we move on to the next example, I would like to take a minute to refactor
our component. The code as is written works fine but it's very verbose, I would
like to make it easier to follow.

One advantage of Hooks is that they are composable and make it easy to extract
logic in a separate function.

We can take advantage of this and move our code to fetch in a separate method:

```jsx
import React, { useState, useEffect } from "react";
import { getResource } from "./api";

function useA() {
  const [valueA, setValueA] = useState(null);
  const [errorA, setErrorA] = useState(null);
  const [loadingA, setLoadingA] = useState(true);
  async function getA() {
    try {
      setLoadingA(true);
      const valueA = await getResource("A");
      setValueA(setValueA);
    } catch (e) {
      setErrorA(e);
    } finally {
      setLoadingA(false);
    }
  }
  useEffect(() => {
    getA();
  }, []);

  return [valueA, errorA, loadingA]; // highlight-line
}

function FetchOneResource() {
  const [valueA, errorA, loadingA] = useA(); // highlight-line
  if (errorA) return "Failed to load resource A";
  return loadingA ? "Loading..." : valueA;
}
```

Ah! Much better, don't you think? Our `FetchOneResource` is now only three lines
long, and it's quite easy to understand what is going on.

Still, I think we can do better. But first, let's see how to fetch more than one
asynchronous resource at the same time.

## Fetch Multiple Resources at the Same Time

In many cases, you want to load more than one resource at the same time. Think
of a page that renders a list of posts and your followers.

Let's see how we could do it with Hooks. First a naive implementation:

```jsx
import React, { useState, useEffect } from "react";
import { getResource } from "./api";

function useA() {
  const [valueA, setValueA] = useState(null);
  const [errorA, errorA] = useState(null);
  const [loadingA, setLoadingA] = useState(true);
  async function getA() {
    try {
      setLoadingA(true);
      const valueA = await getResource("A");
      setValueA(valueA);
    } catch (e) {
      setErrorA(a);
    } finally {
      setLoadingA(false);
    }
  }
  useEffect(() => {
    getA();
  }, []);

  return [valueA, errorA, loadingA];
}

function useB() {
  const [valueB, setValueB] = useState(null);
  const [errorB, setErrorB] = useState(null);
  const [loadingB, setLoadingB] = useState(true);
  async function getB() {
    try {
      setLoadingB(true);
      const valueB = await getResource("B");
      setValueB(valueB);
    } catch (e) {
      setErrorB(a);
    } finally {
      setLoadingB(false);
    }
  }
  useEffect(() => {
    getB();
  }, []);

  return [valueB, errorB, loadingB];
}

function FetchMultipleResourceAtOnce() {
  const [valueA, errorA, loadingA] = useA();
  const [valueB, errorB, loadingB] = useB();

  return (
    <div>
      {errorA
        ? "Failed to load resource A"
        : loadingA
        ? "Loading A..."
        : valueA}
      {errorB
        ? "Failed to load resource B"
        : loadingB
        ? "Loading B..."
        : valueB}
    </div>
  );
}
```

We're duplicating a lot of code, but it's quite easy to fix it. `useA` and
`useB` are basically the same function. The only difference is that they are
passing different arguments to `getResource`. Let's fix that:

```jsx
import React, { useState, useEffect } from "react";
import { getResource } from "./api";

function useAsync(getMethod, params) {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  async function getResource() {
    try {
      setLoading(true);
      const result = await getMethod(...params);
      setValue(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getResource();
  }, params);

  return { value, error, loading };
}

function FetchMultipleResourceAtOnce() {
  const resourceA = useAsync(getResource, ["A"]); // highlight-line
  const resourceB = useAsync(getResource, ["B"]); // highlight-line

  return (
    <div>
      {resourceA.error
        ? "Failed to load resource A"
        : resourceA.loading
        ? "Loading A..."
        : resourceA.value}
      {resourceB.error
        ? "Failed to load resource B"
        : resourceB.loading
        ? "Loading B..."
        : resourceB.value}
    </div>
  );
}
```

We made a generic `useAsync` Hook that takes two parameters: the method to call
and the list of parameters to call it with.

Note that we are now passing `params` to `useEffect` so that if one of them
changes we fetch the resource again.

We're also not returning an array anymore but an object. I think an object is
easier to handle because it creates only one variable and doesn't force us to
remember the order in which the results are returned.

The last thing left to do is to take `useAsync` and move it in a separate file
so that we can use it in other components too. Luckily a version of
`useResource` that works similarly to ours is available as part of
[react-use](https://github.com/streamich/react-use).

```jsx
import React, { useState, useEffect } from "react";
import { getResource } from "./api";
import { useAsync } from "react-use"; // highlight-line

function FetchMultipleResourceAtOnce() {
  const resourceA = useAsync(getResource, ["A"]);
  const resourceB = useAsync(getResource, ["B"]);

  return (
    <div>
      {resourceA.error
        ? "Failed to load resource A"
        : resourceA.loading
        ? "Loading A..."
        : resourceA.value}
      {resourceB.error
        ? "Failed to load resource B"
        : resourceB.loading
        ? "Loading B..."
        : resourceB.value}
    </div>
  );
}
```

---

You can find `useAsync` [here](https://github.com/streamich/react-use) in case
you want to use it in your projects. The actual implementation is a bit more
complex than the one presented in this post so make sure you check out the
[README](https://github.com/streamich/react-use/blob/master/docs/useAsync.md).
