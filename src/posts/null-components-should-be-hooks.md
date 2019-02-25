---
title: "Null Components Should be Hooks"
date: "2019-02-23"
---

Before Hooks were introduced in React I used to create several
"null&nbsp;components". In other words components that render nothing. One
example of such component is the following:

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

I think null components should become Hooks instead. If we remove the `return`
statement and rename `PageTitle` to be `usePageTitle` we have our Hook:

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
it obvious to any developer who's using my code that nothing will be rendered in
the page.

<p class="highlight">
Here's the rule of thumb: is your component always rendering nothing?
Convert it to a Hook.
</p>
