---
title: "Making Sense of <code>useEffect</code>"
date: "2019-03-06"
cover:
  file: "./making-sense-of-useeffect/cover.jpg"
  author: "Jamison McAndie"
  link: "https://unsplash.com/photos/uf4oyaimWwg"
---

During the past few weeks, I had the chance to introduce many of my colleagues
to React Hooks.

The overall feedback is that they are an improvement over class components. Code
written with Hooks looks more natural to follow and to reason about.

There is, however, one common complain whenever I explain the predefined Hooks:
`useEffect` is complicated to understand.

Indeed its API is not as straightforward as other Hooks, although once one
understands how it works, it is flexible and powerful.

In this post, I _do not_ want to explain how it works—for that you can check the
[official docs](https://reactjs.org/docs/hooks-effect.html). Instead, I want to
go through common patterns and see how to convert them from a class-based
implementation to one using `useEffect`.

## Do Something When the Component Mounts

This is possibly the most common pattern in class components. We do this all the
time, for example, to fetch some data.

Here's how it looks like in a class component:

```jsx
class MyComponent extends React.Component {
  state = { foo: null, bar: null };

  componentDidMount() {
    this.fetchFoo();
    this.fetchBar();
  }

  async fetchFoo() {
    const foo = await fetch("/foo").then((res) => res.json());
    this.setState({ foo });
  }

  async fetchBar() {
    const bar = await fetch("/bar").then((res) => res.json());
    this.setState({ bar });
  }

  render() {
    return (
      <div>
        {foo}, {bar}
      </div>
    );
  }
}
```

In this example we're simply fetching two values, `foo` and `bar`, when the
component mounts. If you are unfamiliar with `async`/`await` you can read more
about it
[here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

The same code would look like this with React Hooks:

```jsx
function MyComponent() {
  const [foo, setFoo] = useState(null);
  const [bar, setBar] = useState(null);

  async function fetchFoo() {
    const foo = await fetch("/foo").then((res) => res.json());
    setFoo(foo);
  }

  async function fetchBar() {
    const bar = await fetch("/bar").then((res) => res.json());
    setBar(bar);
  }

  useEffect(() => {
    fetchFoo();
    fetchBar();
  }, []);

  return (
    <div>
      {foo}, {bar}
    </div>
  );
}
```

It's hopefully easy to see that there are several similarities between the two
implementations.

The important thing to notice is the second parameter we're passing to
`useEffect`: an empty array. We do this to tell `useEffect` to run only once.

Although the code works, it has a problem. We're grouping the code that deals
with `foo` with the one that handles `bar`. This is a necessity when we're
working with class components because we have to put all our logic within the
`componentDidMount` method.

With Hooks we can separate our code by concerns. Let's refactor the previous
example to see this idea in action:

```jsx
function MyComponent() {
  const [foo, setFoo] = useState(null);
  async function fetchFoo() {
    const foo = await fetch("/foo").then((res) => res.json());
    setFoo(foo);
  }
  useEffect(() => {
    fetchFoo();
  }, []);

  const [bar, setBar] = useState(null);
  async function fetchBar() {
    const bar = await fetch("/bar").then((res) => res.json());
    setBar(bar);
  }
  useEffect(() => {
    fetchBar();
  }, []);

  return (
    <div>
      {foo}, {bar}
    </div>
  );
}
```

We've reorganized the order of our declarations so that we end up with two
_visual blocks_. The first one about `foo` and the second about `bar`.

Note how we can call `useEffect` more than once.

## Do Something When the Component Unmounts

Most times after you set up some sort of listener when the component mounts you
have to unregister it if the component unmounts. Failing to do so might result
in memory leaks and other unintended behavior.

First, let's see the class version:

```jsx
class MyComponent extends React.Component {
  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  handlClick() {
    console.log("Clicked!");
  }

  render() {
    return <div />;
  }
}
```

With `useEffect` you can do the same by returning a function:

```jsx
function MyComponent() {
  function handlClick() {
    console.log("Clicked!");
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);

    // highlight-start
    return () => {
      document.removeEventListener("click", handleClick);
    };
    // highlight-end
  }, []);

  return <div />;
}
```

## Do Something When One or More Props Change

Our last example is about reacting to prop changes. With a class you would have
to use `componentDidUpdate`:

```jsx
class MyComponent extends React.Component {
  state = { user: null };

  async componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      // We have to fetch the user again
      this.fetchUser();
    }
  }

  async fetchUser() {
    user = await getUser(this.props.userId);
    this.setState({ user });
  }

  render() {
    return user && user.name;
  }
}
```

With `useEffect` we can pass `userId` in the list of parameters to watch:

```jsx
function MyComponent(props) {
  const [user, setUser] = useState(null);
  async function fetchUser() {
    user = await getUser(props.userId);
    setUser(user);
  }
  useEffect(() => {
    fetchUser();
  }, [props.userId]);

  return user && user.name;
}
```

You can pass as many values as you want in the array. They don't necessarily
have to be props, in fact they can come from anywhere.
