---
  tags: post
  layout: post.liquid
  date: 2023-03-22
  title: "Creating an Array Containing Values 1 to N in JavaScript"
---

If, in JavaScript, you need an array with values from 1 to N, how do you do it? There's the good old `for` loop. But I used to do something like this:

```js
Array(10)
  .fill()
  .map((_, i) => i + 1);
```

It works, but I don't like it. The `fill` method feels hacky to me. Luckily, there is a better way to do it using [`Array.from()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

`Array.from()` takes an array-like value and returns an array:

```js
Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']
```

Surprisingly, passing an object with a `length` property also works:

```js
Array.from({ length: 3 }); // [undefined, undefined, undefined]
```

This is equivalent to `Array(3).fill()`.

But that's not all! We can also pass a map function as a second argument:

```js
Array.from({ length: 3 }, (_, i) => i + 1); // [1, 2, 3]
```

Of course, you can modify the map function to do whatever you want. For example, you can list the power of 2:

```js
Array.from({ length: 3 }, (_, i) => 2 ** i); // [1, 2, 4]
```

## Counting from 0

What if we want to count from 0 instead of 1? We can use another approach and make the code even simpler:

```js
[...Array(3).keys()]; // [0, 1, 2]
```

The three dots `...` are the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). t takes an iterable, an array in this case, and spreads it into a list of values.

## Using it with React

I found myself using this technique a few times while working with React.

For example, when creating a loading skeleton:

```jsx
function BlogSkeleton() {
  return (
    <div>
      {[...Array(3).keys()].map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
```

I could achieve the same result by writing `PostSkeleton` three times but sometimes you don't know beforehand how many items you need to render.

## The future: Iterator.range

There's another option that feels more idiomatic to me. It's not available yet, it's currently at stage 2 of the TC39 process. It's called `Iterator.range` and it works like this:

```js
[...Iterator.range(1, 4)]; // [1, 2, 3]
```

You can even add a step argument:

```js
[...Iterator.range(1, 10, 2)]; // [1, 3, 5, 7, 9]
```

As I said, it's not supported by all browser yet. But you can learn more about it at the official [proposal repository](https://github.com/tc39/proposal-iterator.range).
