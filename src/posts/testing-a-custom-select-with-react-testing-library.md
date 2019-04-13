---
title: "Testing a Custom Select with React Testing Library"
date: "2019-04-13"
---

I have been following the community around
[`react-testing-library`](https://testing-library.com/react) for a while now.
One of the questions that come up more often is how to test a custom select
component.

By _custom select_ I mean a component like
[`react-select`'s](https://react-select.com/home),
[Ant Design's](https://ant.design/components/select/) or
[Material-UI's](https://material-ui.com/api/select/).

<figure>
  <a href="https://material-ui.com/demos/selects/" target="_blank">
    <img src="./selects.gif" title="Material-UI's select" />
  </a>
  <figcaption>Material-UI's select</figcaption>
</figure>

A large number of projects need a custom select. At first sight, they seem
simple components, but in reality, they are quite complex. They need to take
care of many use-cases and support accessibility features.

---

Suppose you wrote a new component that uses `react-select`:

```jsx
function MySelector() {
  const options = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" }
  ];
  const [color, setColor] = React.useState(options[0]);

  return (
    <>
      <h1>Your favorite color is {color.label}</h1>
      <Select
        options={options}
        value={color}
        onChange={value => {
          console.log(value);
          setColor(value);
        }}
      />
    </>
  );
}
```

<figure>
  <img src="./custom-select.gif" title="MySelector in action" />
  <figcaption><code>MySelector</code> in action</figcaption>
</figure>

Testing `MySelector` is not as easy at it seems:

```jsx
test("Naive test that doesn't work", () => {
  const { getByText } = render(<MySelector />);
  expect(getByText("Your favorite color is Red")).toBeInTheDocument();
  fireEvent.click(getByText("Red"));
  fireEvent.click(getByText("Green"));
  expect(getByText("Your favorite color is Green")).toBeInTheDocument();
});
```

`react-select` is trying to be smart to give us the best user-experience
possible. However, all this extra logic makes testing harder.

You now have two options.

You can figure out what DOM structure `react-select` creates and then use
`container.querySelector` to find its elements and interact with them. It takes
a while, but it should be possible. After you have done all of that, you have to
hope that at every new release the `react-select` team doesn't change the DOM
structure too much or you might have to update all your tests.

The other option is to trust that `react-select` is going to make a component
that works and that your users can use. Based on that trust you can replace that
component in your tests for a simpler one.

In my experience, the second option works well and is much easier to maintain.

---

How do you replace the custom select for an easier one though? With
[`jest.mock`](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options).

In our case we want to replace `react-select` for a normal HTML `<select>` tag.
Here's how you can do it:

```jsx
// highlight-start
jest.mock("react-select", () => ({ options, value, onChange }) => {
  function handleChange(event) {
    const option = options.find(
      option => option.value === event.currentTarget.value
    );
    onChange(option);
  }

  return (
    <select data-testid="select" value={value} onChange={handleChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});
// highlight-end

test("Test with mock", () => {
  const { getByText, getByTestId } = render(<MySelector />);
  expect(getByText("Your favorite color is Red")).toBeInTheDocument();
  // highlight-start
  fireEvent.change(getByTestId("select"), { target: { value: "green" } });
  // highlight-end
  expect(getByText("Your favorite color is Green")).toBeInTheDocument();
});
```

I've added a `data-testid` to make it easy to find the `<select>` and
implemented a `handleChange` handler that simulates the one from `react-select`.
Your logic might change depending on what custom select you are using but the
basic idea is the same.

You can find the full code for this example at
[Gpx/test-custom-select](https://github.com/Gpx/test-custom-select).
