---
title: How to Test Asynchronous Methods
date: 2019-05-19
---

I continue my series of posts on `react-testing-library` this time with a brief
explanation on how to test asynchronous methods. The idea for this post comes
from a person who contacted me on Twitter asking this:

> [...] how would one test async methods loaded during `componentdidMount`?

In my personal experience 99% of the time an async method is going to fetch some
data from the server. This is especially true if we call this method from
`componentDidMount`. You can then understand how important it is to know how to
test these methods properly.

Two notes before I start:

- The question is about methods called in `componentDidMount` but the testing
  strategy is the same if you use Hooks;
- If you are uncertain how to make asynchronous calls in the first place check
  my other post
  [Fetching Asynchronous Data with React Hooks](fetching-asynchronous-data-with-react-hooks).

---

There are two things you want to test when it comes to asynchronous methods. The
first is that the method itself got called and with the right parameters. The
second is that after the call your application responds as it should. Let's see
what this means in practice.

Imagine you have a small blog application written in React. In particular you
have an `Index` component that shows the list of posts—kinda like what I have in
[my homepage](/).

`Index` will probably look something like this:

```jsx
import React from "react";
import { fetchPosts } from "./api/posts";
import { useAsync } from "react-use";

function Index() {
  const posts = useAsync(fetchPosts, []);

  if (posts.loading) return "Loading...";
  if (posts.error) return "Something went wrong.";

  return (
    <>
      <h1>My Posts</h1>
      <ul>
        {posts.value.map(post => (
          <li key={post.id}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
```

You have probably seen code like this before and maybe even written some
yourself. Here we're fetching a list of posts via the `fetchPosts` method. We're
showing a loading message while this happens. Once the async method resolves, we
either show an error or the list of posts.

If you are confused by the `useAsync` call refer to my
[previous post](fetching-asynchronous-data-with-react-hooks) where I explain how
it works.

If you prefer to avoid Hooks, this is the class implementation (note that the
tests we're going to write are going to work with both implementations):

```jsx
import React from "react";
import { fetchPosts } from "./api/posts";

class Index extends React.Component {
  state = { loading: true, error: null, posts: null };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const posts = await fetchPosts();
      this.setState({ loading: false, posts });
    } catch (error) {
      this.setState({ loading: false, error });
    }
  }

  render() {
    if (this.state.loading) return "Loading...";
    if (this.state.error) return "Something went wrong.";

    return (
      <>
        <h1>My Posts</h1>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>
              <a href={post.url}>{post.title}</a>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
```

A bit longer to type but it does the same thing the Hook version does.

Now to the tests!

---

The first thing we want to do is to mock the API calls. Why? I can give you two
good reasons for this. The first one is that it will make our tests more
reliable. If your test fetched the list of posts, it would need a server to
call. This server might or might not be working making our tests failing
randomly.

The second reason is speed. Performing a real API call takes time. It might not
seem like much when you have just one test but as your codebase grows the
slowness will show.

So, how do we mock the API call? In our case, the call happens in the
`fetchPosts` method so we can mock it:

```jsx
jest.mock("./api/posts");
```

You can read more about `jest.mock` in the
[official docs](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options).
What it does is to tell Jest to replace all the methods inside the `./api/posts`
module with a mock.

Now that we have the mock in place let's render the component and test that we
see a loading message:

```jsx
// highlight-start
import React from "react";
import { render } from "@testing-library/react";
import Index from "./Index";
import "jest-dom/extend-expect";
// highlight-end

jest.mock("./api/posts");

// highlight-start
test("We show a list of posts", () => {
  const { getByText } = render(<Index />);
  expect(getByText("Loading...")).toBeInTheDocument();
});
// highlight-end
```

This was the first step. Now we need to make sure our async method gets called
correctly:

```jsx
import React from "react";
import { render } from "@testing-library/react";
import Index from "./Index";
import "jest-dom/extend-expect";
import { fetchPosts } from "./api/posts"; // highlight-line

jest.mock("./api/posts");

test("We show a list of posts", () => {
  const { getByText } = render(<Index />);
  expect(getByText("Loading...")).toBeInTheDocument();
  // highlight-start
  expect(fetchPosts).toHaveBeenCalledTimes(1);
  expect(fetchPosts).toHaveBeenCalledWith();
  // highlight-end
});
```

We're testing that `fetchPosts` has been called once and with no arguments. Note
that, since we're using `jest.mock`, `fetchPosts` is not going to be the method
we have in our codebase but a
[mock function](https://jestjs.io/docs/en/mock-function-api).

OK, we're almost there. All is left to do is to return some data from
`fetchPosts` and verify it appears in the DOM. This is exactly what we're going
to do next:

```jsx
import React from "react";
import { render, wait } from "@testing-library/react"; // highlight-line
import Index from "./Index";
import "jest-dom/extend-expect";
import { fetchPosts } from "./api/posts";

jest.mock("./api/posts");

// highlight-next-line
test("We show a list of posts", async () => {
  // highlight-start
  const posts = [{ id: 1, title: "My post", url: "/1" }];
  fetchPosts.mockResolvedValueOnce(posts);
  // highlight-end
  const { getByText } = render(<Index />);
  expect(getByText("Loading...")).toBeInTheDocument();
  expect(fetchPosts).toHaveBeenCalledTimes(1);
  expect(fetchPosts).toHaveBeenCalledWith();
  // highlight-start
  await wait(() => expect(getByText("My Posts")).toBeInTheDocument());
  posts.forEach(post => expect(getByText(post.title)).toBeInTheDocument());
  // highlight-end
});
```

And that's it! We're returning some fake values using `mockResolvedValueOnce`.
We then wait for the async method to resolve and for `Index` to rerender. To do
that we use the `wait` method while checking that the title is rendered. After
that we go post-by-post and make sure the title is on the page.

---

If you wanted to test that errors are rendered correctly it's just a matter of
changing the mock:

```jsx
import React from "react";
import { render, wait } from "@testing-library/react";
import Index from "./Index";
import "jest-dom/extend-expect";
import { fetchPosts } from "./api/posts";

jest.mock("./api/posts");

// highlight-next-line
test("We show an error message on failures", async () => {
  // highlight-start
  fetchPosts.mockRejectedValueOnce("Error!");
  // highlight-end
  const { getByText } = render(<Index />);
  expect(getByText("Loading...")).toBeInTheDocument();
  expect(fetchPosts).toHaveBeenCalledTimes(1);
  expect(fetchPosts).toHaveBeenCalledWith();
  // highlight-start
  await wait(() =>
    expect(getByText("Something went wrong.")).toBeInTheDocument()
  );
  // highlight-end
});
```

---

To recap, these are the steps to test an asynchronous method:

1. Mock the method with
   [`jest.mock`](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options)
   and make it resolve to some data;
1. Test the loading state;
1. Test that the async method got called correctly;
1. Test that the component rendered the data correctly.
