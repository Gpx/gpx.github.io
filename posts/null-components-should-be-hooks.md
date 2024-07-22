---
tags: post
layout: post.liquid
title: "Null Components Should be Hooks"
date: "2024-07-22"
---

Before Hooks were introduced in React I used to create "null&nbsp;components".
In other words components that render nothing. One example of such component is
the following:

```jsx
class PageTitle extends React.Component {
  componentDidMount() {
    document.title = this.props.title;
  }

  componentDidUpdate() {
    document.title = this.props.title;
  }

  render() {
    return null;
  }
}
```

This component renders nothing at all. Its only use is to change the page title.

With Hooks it could be rewritten to something like this:

```jsx
function PageTitle(props) {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return null;
}
```

I think null components should all become Hooks instead. It's easy to see why.
If we remove the `return` statement and rename `PageTitle` to `usePageTitle` we
have our Hook:

```jsx
function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
```

If `PageTitle` and `useTitle` are so similar what's the advantage of using the
Hook version?

When I use a component I generally expect something to appear on the page. With
Hooks I expect the opposite. So, converting `PageTitle` to `usePageTitle` makes
it obvious to any developer who's using my code that nothing will be rendered on
the page.

> Here's the rule of thumb: is your component always rendering nothing? Convert it to a Hook.

## The one exception to the rule

Every rule has an exception and this one is no exception.

If your hook gets called frequently—maybe because it's using `useContext` with a context that changes often—you might have a problem. Your hook will cause its caller component to re-render every time. This can lead to performance issues. In this case, a null component is a better choice. My advice is to keep the hook but call it from a null component:

```jsx
function UpdatePageTitle() {
  const someValue = useContext(SomeContext);
  usePageTitle(someValue);

  return null;
}
```

A big thanks to [@gnapse](https://x.com/gnapse) for showing me this problem with my original approach.
