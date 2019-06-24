---
title: "JavaScript Function Composition"
date: "2015-12-01"
cover:
  file: "./javascript-function-composition/cover.jpg"
  author: "Tyler Wanlass"
  link: "https://unsplash.com/photos/L7MpmBGpM94"
---

Around seven years ago (gosh I’m getting old), I started to work on my first
serious single page application. I was the only frontend developer. A friend of
mine was working on the backend. Before that, I worked only on small jQuery
snippets. Things like “make this button disappear when I click on it”. I didn’t
study JavaScript, I didn’t feel the need to. After all, I knew Java.

It goes without saying, the project was a mess. A real example of spaghetti
code. It was so complicated to understand what was going on that I had to create
a set and a get method. They were two **sync** AJAX calls that were saving a
variable in `$_SESSION` and getting it back. All because I couldn’t figure out a
way to access values from different sections of my codebase.

After this terrible experience, I realized JavaScript might not be just a light
version of Java. I started _googling_ for some good material for a beginner like
me. Almost everyone’s advice was to read
[“Javascript: The Good Parts”](http://shop.oreilly.com/product/9780596517748.do).
The author, [Douglas Crockford](https://www.crockford.com), remained ever since
a guru for me. He often says:

> If a feature is sometimes useful and sometimes dangerous, and if there is a
> better option then, always use the better option.

You can see this motto applied to his code, his style is unambiguous and easy to
follow, although it may appear verbose.

What does this have to do with _function composition_ you might ask. Fast
forward to one year ago. I saw this talk from Douglas about “The Better Parts”.

`video:https://youtu.be/bo36MrBfTk4`

With ES6 coming he decided to give an update on what are the new “good parts”. I
was very much into `class` back then, like many others, so I couldn’t wait to
hear my guru explain how and why they’re so cool.

With my great surprise they weren’t in the list. He mentioned things like
[tail call optimization](../es6-tail-call-optimization) and
[spread](https://github.com/lukehoban/es6features#default--rest--spread) but not
classes.

He eventually talked about the class keyword, it was the first of the new _bad
features_.

## A Crazy Little Thing Called Functional Programming

That talk left me puzzled. Not only he wasn’t using classes, he wasn’t using
`this`, `new`, `for` loops and pretty much what was 80% of my code. He was even
[freezing objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
after creating them.

What’s the deal Doug? Why are you trying to make my life a hell? Are you just
mocking me? Are you mocking us all? It was a prank talk, wasn’t it? The guru
decided to have some fun at the expense of his followers.

Turns out it wasn’t a prank.

While in university, I attended a course about functional programming. The mood
was this:

> There’s a programming language called
> [Lisp](<https://en.wikipedia.org/wiki/Lisp_(programming_language)>). We use it
> in academia but in the real world no one does. You’re going to learn enough of
> it to build a small program and pass the exam.

Damn I hated school.

Lisp may not be in much use nowadays, but it influenced languages that are
taking the world by storm, such as [Clojure](http://clojure.org/) and
[Haskell](https://www.haskell.org/).

Most importantly, its functional paradigm is going to be more and more
predominant in the foreseeable future.

Oh and by the way, do you know what’s the most popular functional language by a
vast margin? JavaScript.

All this just to tell you that we better learn function composition and other
functional idioms.

## Finally Some Function Composition

After my longest introduction yet, let’s get into function composition. First
off, function composition works at its best when we _curry_ a function. What’s
that? Glad you asked.

### Currying

[Haskell Curry](https://en.wikipedia.org/wiki/Haskell_Curry) was a great
mathematician. So great that they named a programming language after his first
name and a programming technique after his last name (sadly nothing yet on his
middle name “Brooks”).

Let’s say you have a function sum that takes two parameters a and b and returns
their sum.

```jsx
const sum = (a, b) => a + b;

sum(1, 2); //=> 3
```

If the code above looks weird to you it’s because we’re using ES6, in particular
[constants](http://es6-features.org/#Constants) and
[arrow functions](http://es6-features.org/#ExpressionBodies).

In ES5, this would translate to:

```js
var sum = function(a, b) {
  return a + b;
};
```

When we call sum we have to provide 2 arguments. We also have to provide them at
the same time. What if I want to set a now and b later?

Basically, what we want is this:

```js
let partial = currySum(1);

partial(2); //=> 3

currySum(5)(5); //=> 10
```

How is this new `currySum` defined? This is one way to do it:

```js
const currySum = a => b => a + b;
```

`currySum` is a function that takes one argument a and returns a function. The
returned function accepts an argument `b` and returns `a + b`. This is possible
thanks to
[closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).

How is this useful? Take our `partial` function, it could be renamed to `plus1`.
It is in fact a function that takes a number and adds 1 to it. We can easily
define `plus2` or `plus10`.

```js
const plus2 = currySum(2);
const plus10 = currySum(10);
```

Note that we can also convert a function to its curried version. Libraries like
[lodash](https://lodash.com/) implement a curry method. We are going to use
[Ramda](http://ramdajs.com/). Let’s see it in action.

```js
const sum = (a, b) => a + b;

const currySum = R.curry(sum);

currySum(3)(2); //=> 5
currySum(3, 2); //=> 5
```

As you can see `R.curry` takes a function and returns its curried version. The
nice thing is that we can then call the function passing all the arguments or
just some.

### Function Composition

Suppose you have this array:

```js
const colleagues = [
  {
    name: "Marek",
    developer: true
  },
  {
    name: "Tim",
    developer: true
  },
  {
    name: "Jan",
    developer: false
  }
];
```

Now, you want a list of uppercased names.

```js
const names = [];
for (let i = 0; colleagues.length < i; i++) {
  names.push(colleagues[i].name.toUpperCase());
}

names; //=> ['MAREK','TIM','JAN']
```

Can we do better?

Let’s divide the problem. First we need a function that takes a string and
returns its uppercased version.

```js
const toUpper = s => s.toUpperCase();

toUpper("hello"); //=> 'HELLO'
```

Next we need a function that takes an object and returns one of its properties.

```js
const prop = (key, obj) => obj[key];

prop("name", { name: "Giorgio" }); //=> 'Giorgio'
```

We’re interested in the `name` property. What we need is a function that given
an object returns it’s `name`. If we curry our `prop` function that’s very easy.

```js
const prop = R.curry((key, obj) => obj[key]);

const getName = prop("name");
```

Wow, look at that. We called `prop` with just one argument and we got back
another function that receives an object and returns this object’s `name`
property. Now you begin to see why curring is so important.

Before we move on, you need to know that Ramda implements the two functions we
just defined. Furthermore Ramda functions are curried by default. So we can
refactor our code like this.

```js
const toUpper = R.toUpper;
const getName = R.prop("name");
```

Here comes the interesting part, given an object we want to get its `name`
property and uppercase it. One naïve solution is this.

```js
const upperName = obj => obj.name.toUpperCase();

upperName({ name: "Giorgio" }); //=> 'GIORGIO'
```

But this function is solving two problems we already solved:

- Getting the name property
- Uppercase a string

How can we do this using our pre-defined functions?

```js
const upperName = obj => toUpper(getName(obj));
```

Amazing, we composed the functions. We can now look at the official definition
for function composition (obviously from Wikipedia):

> In mathematics, function composition is the pointwise application of one
> function to the result of another to produce a third function.

This is exactly what we did. We took the output of `getName` and used it as an
input for `toUpper`.

Ramda has a `compose` function just for that. We can use it to refactor our
code.

```js
const upperName = R.compose(
  toUpper,
  getName
);

upperName({ name: "Giorgio" }); //=> 'GIORGIO'
```

You should read the code from right to left. An object enters, it gets processed
by `getName`, you get a string and feed it to `toUpper`, you get a result.

Now to get the list of uppercased names from our objects we simply use `map`.

```js
const upperNames = R.map(upperName);

upperNames(colleagues); //=> ['MAREK','TIM','JAN']
```

Here is the whole code. I also made a
[pen](http://codepen.io/Gpx/pen/YybPGV?editors=001).

```js
const colleagues = [
  {
    name: "Marek",
    developer: true
  },
  {
    name: "Tim",
    developer: true
  },
  {
    name: "Jan",
    developer: false
  }
];

const getName = R.prop("name");
const toUpper = R.toUpper;

const upperName = R.compose(
  toUpper,
  getName
);

const upperNames = R.map(upperName);

const names = upperNames(colleagues); //=> ['MAREK','TIM','JAN']
```

## Is It worth It?

If you are like me you are probably asking yourself “Is it worth it?”. After all
the original code with a `for` loop was easy enough. The solution with function
composition works but it may seem a bit awkward. Let me tell you two big
advantages of our functional version.

The code has a higher level of abstraction. You have a `upperName` function.
What does it do? It applies `getName` and `toUpper`. No need to know about
arrays or indexes.

It’s much easier to extend. Want to upper the name only for developers?

```js
// Takes an array and filter out non-developers
const onlyDevelopers = R.filter(R.prop("developer"));

// Takes an array returns an array of uppercased names
// only for developers
const upperDevelopers = R.compose(
  upperNames,
  onlyDevelopers
);

upperDevelopers(colleagues); //=> ['MAREK','TIM']
```

Here we solved the issue with another function composition.
