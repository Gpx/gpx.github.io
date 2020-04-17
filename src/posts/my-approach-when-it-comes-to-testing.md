---
title: "My Approach When It Comes to Testing"
date: "2020-04-17"
cover:
  file: "./my-approach-when-it-comes-to-testing/cover.jpg"
  author: "Ryan Quintal"
  link: "https://unsplash.com/photos/97odosRYZ7w"
---

One thing I've seen people struggling with when it comes to testing a web
application is what to test and how. This post explains the approach I follow at
work and for my projects.

The examples will be based on React Testing Library, but the same concepts apply
just as well to any other frontend technology.

## You already know how to test

The first thing to understand is that you already know how to test. In fact, if
you have developed any application, you have tested it.

Do you remember when you were learning how to code, and you wrote your first
program? Chances are it looked something like this:

```js
console.log("Hello, world!");
```

You then executed your script, and sure enough, you read "Hello, world!" in the
console. That was a test. You were testing that your program was working as
expected.

If you think about it, that's what you still do for every program you create.
You write some code and then execute it to make sure it works.

Now imagine you get a bug report. Apparently, some feature stopped working. What
do you do first? You try to reproduce the bug by using your application. Again,
you are manually testing.

Manually testing is a very effective way to ensure your software is working.
Interacting with a portion of your application gives you confidence that it
works.

Of course, manual tests have a big problem: you need a person to run them. Even
a small application can quickly become hard to test manually. On top of that,
consider that you must "run" all your tests every time you introduce a small
change.

This is where testing libraries come into play. For me, these tools are a way to
automate the way I would manually test my application.

## An example

Let's go through a more concrete example to understand what I mean by
"automating the way I would manually test."

Suppose we are working on a simple currency converter application like this one:

<iframe style="width: 100%;" src="http://www.polvara.me/currency-converter/"></iframe>

You can find the complete code
[here](https://github.com/Gpx/currency-converter).

Let's not get into the code just yet. What we should ask ourselves now is "How
would I manually test this app?" I would do something like this:

1. Check that we see a loading message until the app is ready
2. Check that we see the initial conversion for 1 Euro to Dollars
3. Change the amount and see that the conversion is updated
4. Change the currency and see that the conversion is updated

I think this makes for a reasonable test case. What we need to do now is trying
to automate it. I'm going to do that using React Testing Library, but the same
principles apply to most testing tools.

```jsx
test("renders learn react link", () => {
  render(<App />);
  // 1. Check that we see a loading message until the app is ready
  // 2. Check that we see the initial conversion for 1 Euro to Dollars
  // 3. Change the amount and see that the conversion is updated
  // 4. Change the currency and see that the conversion is updated
});
```

This is our basic setup that doesn't do much at the moment. Let's implement the
first step.

```jsx
test("renders learn react link", () => {
  render(<App />)
  // 1. Check that we see a loading message until the app is ready
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

  // 2. Check that we see the initial conversion for 1 Euro to Dollars
  // 3. Change the amount and see that the conversion is updated
  // 4. Change the currency and see that the conversion is updated
});
```

Don't worry if you are not familiar with the particular API I'm using. The
important concept to get is that we're simulating what a user would do. First,
checking that the loading message is on the page and then waiting for it do
disappear.

Let's move on to step two:

```jsx
test("renders learn react link", () => {
  render(<App />)
  // 1. Check that we see a loading message until the app is ready
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

  // 2. Check that we see the initial conversion for 1 Euro to Dollars
  const input = screen.getByDisplayValue("1");
  expect(screen.getByText(/1.08/)).toBeInTheDocument();

  // 3. Change the amount and see that the conversion is updated
  // 4. Change the currency and see that the conversion is updated
});
```

Here we are getting the input and checking that the converted value is on the
page.

Step three and four are quite similar so we can group them:

```jsx
test("renders learn react link", () => {
  render(<App />)
  // 1. Check that we see a loading message until the app is ready
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

  // 2. Check that we see the initial conversion for 1 Euro to Dollars
  const input = screen.getByDisplayValue("1");
  expect(screen.getByText(/1.08/)).toBeInTheDocument();

  // 3. Change the amount and see that the conversion is updated
  fireEvent.change(input, { target: { value: "2" } });
  expect(screen.getByText(/2.16/)).toBeInTheDocument();

  // 4. Change the currency and see that the conversion is updated
  const select = screen.getByDisplayValue("USD");
  fireEvent.change(select, { target: { value: "RUB" } });
  expect(screen.getByText(/137.94/)).toBeInTheDocument();
});
```

And that's about it. We automated what a user would do to test this app. Notice
that the test knows nothing about the implementation details. We didn't have to
read the source code. This app could have been written in any frontend
framework, and the test would be the same.

There's only one last step missing. Our code is fetching the conversion rates.
It's always better not to make any real network calls in the tests, so we're
going to mock it. You can find a longer explanation on how to do that
[here](https://www.polvara.me/posts/how-to-test-asynchronous-methods/).

```jsx
import fetchRates from "./fetchRates";
jest.mock("./fetchRates");

test("renders learn react link", () => {
  fetchRates.mockResolvedValueOnce({ RUB: 68.9685, USD: 1.0816 });
  render(<App />)

  // 1. Check that we see a loading message until the app is ready
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

  // 2. Check that we see the initial conversion for 1 Euro to Dollars
  const input = screen.getByDisplayValue("1");
  expect(screen.getByText(/1.08/)).toBeInTheDocument();

  // 3. Change the amount and see that the conversion is updated
  fireEvent.change(input, { target: { value: "2" } });
  expect(screen.getByText(/2.16/)).toBeInTheDocument();

  // 4. Change the currency and see that the conversion is updated
  const select = screen.getByDisplayValue("USD");
  fireEvent.change(select, { target: { value: "RUB" } });
  expect(screen.getByText(/137.94/)).toBeInTheDocument();

  expect(fetchRates).toHaveBeenCalledWith();
  expect(fetchRates).toHaveBeenCalledTimes(1);
});
```

## Units and integrations don't matter that much

At this point, people usually have two kinds of reactions. Some are hooked and
start writing tests this way—if you are, welcome to the club.

The second kind of reaction is usually a generic fear about the lack of unit
tests, namely the fact that these kinds of tests look more like integration,
end-to-end, or feature tests. For some people, you need to have 100% test
coverage with unit tests before you can do anything else.

If you are in this second category, allow me to tell you that in most
applications, 100% unit test coverage is not needed. It is usually a bad
practice.

Please don't take me wrong, unit tests can be useful for some occasions, but
writing higher-level tests is almost always better. The reason we write tests is
to make sure our app works. Writing a test that simulates a user interacting
with your app is what will give you the most confidence.

Unit tests are just checking that a small portion of your software is doing what
it's supposed to do. You can have 100% coverage with unit tests, but that gives
you no guarantee that the single parts are working well together.

## Why not E2E tests then?

If tests that simulate the user are so great, why not only writing end-to-end
tests (also known as browser tests or Selenium tests)? These are tests that run
inside a browser and connect to a real API.

E2E tests are great because they test your application in a real browser
environment. They have two drawbacks, though. They are slow to run, and they are
usually unstable.

To run them, you have to start a browser, run your application, and potentially
start your backend too. There are many more parts involved, and This leads to a
higher risk of something going wrong.

In general, I write E2E tests only to cover critical features and only the happy
paths (no errors, no edge cases).

## Conclusions

To sum it up, here's my strategy when it comes to testing:

1. Manually test my code
2. Write a test to simulate the way I manually test
3. Add an E2E test if the feature is critical
