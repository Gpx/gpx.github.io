---
title: "Optimizing JavaScript with Lazy Evaluation and Memoization"
date: "2017-11-10"
---

Recently at <a href="https://www.travelperk.com/" target="_blank">TravelPerk</a>, we've been working hard to allow our users to access our platform when they're on the go. Developing web applications for mobile devices brings a new set of problems that are not always easy to solve.

More specifically, a problem we recently encountered was severely affecting the performance of one of our pages.

Without going into too much into details, we discovered that the culprit was a method similar to the one below:

```js
function parseObject(result) {
  return {
    computedValue: superSlowMethod(result.parameter)
    /* Plus some other props */
  };
}
```

As you may have guessed already, `superSlowMethod` was&hellip; well super slow. If that were not enough, we were calling `parseObject` thousands of times since we had to parse many objects.

We tried our best to speed up `superSlowMethod`, but we could not find any way to make it fast enough.

What we noticed though is that we were only reading `computedValue` for less than a dozen objects. We decided to find a way to calculate `computedValue` only when strictly necessary.

A first idea was to not define `computedValue` at all and instead call `superSlowMethod` only where it is needed. In a nutshell, do the following:

```js
// Instead of doing this
console.log("The value is: " + parsedObject.computedValue);

// We would do this
console.log("The value is: " + superSlowMethod(parsedObject.parameter));
```

Although this approach would have worked it had three issues for us:

1. It forces to substitute every instance of `computedValue` for a function call. Our codebase is quite big, and this is not an easy task.
1. It would make accessing `computedValue` different from all the other properties defined in the object.
1. If the code is executed more than once the value gets recalculated again, even though it did not change.

## Lazy Evaluation

What we decided to do is to apply a concept called _lazy evaluation_. In a nutshell, lazy evaluation means to evaluate an expression only when it's needed.

For a simple example consider this code:

```js
a() && b();
```

JavaScript first evaluates `a()`, if it's `false` it will not evaluate `b()` because its value is not needed. In this case, we can say that `b()` is lazily evaluated.

Obviously, avoiding the need to evaluate an expression makes our program run faster.

---

Coming back to our example we could not use a logic operator like `&&` to lazy evaluate. Instead we used <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" target="_blank">`Object.defineProperty`</a>.

As the name already indicates this method allows us to define a property on an object. It's different from doing `obj.newProperty = value` because it allows to set some useful options. In our case we used the `set` method:

```js
function parseObject(result) {
  const parsedObject = {
    /* Plus some other props */
  }
  Object.defineProperty(parsedObject, 'computedValue', {
    get() {
      return superSlowMethod(this.parameter)
    }
  })

  reutrn parsedObject
}
```

With this small change, we are still able to access `parsedObject.computedValue` like before but its value is calculated at the moment.

## Memoization

Our code was now running faster, but there was yet another technique we could use: _memoization_.

Memoization means to execute a method, save its output and return it for future invocations.

In our case, since `parameter` was never changing it made sense to apply memoization:

```js
function parseObject(result) {
  const parsedObject = {
    /* Plus some other props */
  }
  let computedValue = null
  Object.defineProperty(parsedObject, 'computedValue', {
    get() {
      if (computedValue) return computedValue
      computedValue = superSlowMethod(this.parameter)
      return computedValue
    }
  })

  reutrn parsedObject
}
```

And with that, we went from calculating `computedValue` thousand of times to just a handful of occasions.
