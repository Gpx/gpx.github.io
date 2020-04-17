---
title: "Mocking Context with React Testing Library"
date: "2019-03-23"
cover:
  file: "./mocking-context-with-react-testing-library/cover.jpg"
  author: "Mae Mu"
  link: "https://unsplash.com/photos/AX_VWc7ORwY"
---

I noticed several people getting confused on how to test React components that
rely on a context with `react-testing-library`. Before I even explain how to
test such components let me get something out of the way:

<p class="highlight">
There is no need to mock your contexts in order to test them.
</p>

[`jest.mock`](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options)
and friends are extremely helpful for many test scenarios, but context is not
one of them. So how do we go about testing it?

The answer is all in `react-testing-library`'s core principle:

https://twitter.com/kentcdodds/status/977018512689455106

What does <q>resemble the way your software is used</q> mean in our case? Let's
see a practical example:

```jsx
const UserContext = React.createContext();

function App() {
  const user = getUserOrMaybeNot();

  return (
    <UserContext.Provider value={user}>
      <UserGreeter />
    </UserContext.Provider>
  );
}

function UserGreeter() {
  const user = React.useContext(UserContext);

  if (!user) return "Hello stranger!";
  return `Hello ${user.name}!`;
}
```

In this particular case, `user` could or could not be defined depending on what
`getUserOrMaybeNot` returns.

You probably want to test that `UserGreeter` renders the correct thing in both
cases. You might be tempted to `render` `UserGreeter` and mock the context
somehow. That's not how your software is used though. Your component is rendered
within a provider. Let's do that then.

```jsx
test("UserGreeter salutes an anonymous user", () => {
  render(
    <UserContext.Provider value={null}>
      <UserGreeter />
    </UserContext.Provider>
  );
  expect(screen.getByText("Hello stranger!")).toBeInTheDocument();
});

test("UserGreeter salutes a user", () => {
  const user = { name: "Giorgio" };
  render(
    <UserContext.Provider value={user}>
      <UserGreeter />
    </UserContext.Provider>
  );
  expect(screen.getByText(`Hello ${user.name}!`)).toBeInTheDocument();
});
```

To avoid the repetition, you can move the render method in a helper function:

```jsx
function renderUserGreeter(user) {
  return render(
    <UserContext.Provider value={user}>
      <UserGreeter />
    </UserContext.Provider>
  );
}

test("UserGreeter salutes an anonymous user", () => {
  renderUserGreeter(null);
  expect(screen.getByText("Hello stranger!")).toBeInTheDocument();
});

test("UserGreeter salutes a user", () => {
  const user = { name: "Giorgio" };
  renderUserGreeter(user);
  expect(screen.getByText(`Hello ${user.name}!`)).toBeInTheDocument();
});
```

---

If you want more information about testing context with `react-testing-library`
check out the
[official docs](https://testing-library.com/docs/example-react-context) and join
the [spectrum community](https://spectrum.chat/react-testing-library) for help
getting you started.
