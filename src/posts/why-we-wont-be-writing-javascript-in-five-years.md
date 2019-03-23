---
title: "Why We Won't Be Writing JavaScript in Five Years"
date: "2016-09-13"
---

As you probably know, JavaScript was created by
[Brendan Eich](https://twitter.com/BrendanEich) in 1995 in only ten days. Many
developers love to make fun of it, but it's an excellent language if you
consider how little designing it took. Most of us can't event finish a sprint in
ten days, let alone implement a programming language.

Of course, it's far from perfect and through they years it got updated, although
not as much as it should have. Luckily TC39, the committee responsible for
evolving the language, decided to release one new version every year starting
from 2016.

We already saw the first benefits of this work with ES6. All the new features
(arrow functions, generators, modules, &hellip;) make it almost look like a new
language.

Despite all these efforts, JavaScript still falls behind if compared to other
programming languages and will have a very hard time catching up. There's no
support for data types, it's difficult to work with double precision numbers, we
need to use libraries like
<a href="https://lodash.com/" target="_blank">Lodash<a> or
<a href="https://momentjs.com/" target="_blank">Moment</a> to have a decent
standard library. It's functional but pales if compared to other languages like
<a href="https://www.haskell.org/" target="_blank">Haskell</a> or
<a href="https://elixir-lang.org/" target="_blank">Elixir</a>.

The list goes on and on. After all, its initial purpose was to allow creating
basic interactive pages far from what we are building today.

What's making improvements to the language so slow is the fact that JavaScript
is always retro-compatible. Every new change must not break existing code. There
are more than one billion websites out there, and all of them must still work
after every browser update.

<p class="highlight">
We need a new language. A language that is better suited to help us create the web of tomorrow. The problem is that browsers won't get one anytime soon.
<p>

The one language that got closest to being adopted by browsers was Dart. When
Google released it, people were afraid it was part of a secret plan to
substitute JavaScript in Chrome. Needless to say, this never happened.

Even if all browser vendors decided to switch from JavaScript to a new language,
developers would still have to support older browsers. In other words, we would
have to build two versions of the same application. Remember when we had to
create a mobile version for websites or add specific CSS code for one browser?
This would be 1000 times more painful.

---

So why am I saying that I won't be coding in JavaScript in 5 years? Rest assured
it's not because I decided to become a native developer. Nothing against native
development but I love the web, and I hope I'll keep creating web applications
for many years to come.

I attended <a href="https://twitter.com/jhusain" target="_blank">Jafar
Husain</a>’s talk at the last
<a href="https://2016.fullstackfest.com/" target="_blank">Full Stack Fest</a> in
Barcelona. His talk was about
<a href="https://2016.fullstackfest.com/speakers/jafar-husain/" target="_blank">the
future of ES6</a> and, in particular, new ways to handle asynchronous code.

During the Q/A I asked this question:

https://twitter.com/jhusain/status/773834257055776768

He also gave a
<a href="https://youtu.be/3pKNRgResq0?t=30m47s" target="_blank">longer
answer</a> on stage. He claims we should be happy to use tools like Babel. They
allow us to use the latest features of JavaScript today without having to wait
for browser vendors to implement them.

He also added that, since we have source maps, we don't even have to deal with
the transpiled code anymore.

In 5 years JavaScript will look very different from what we have now. Still,
that code will be transpiled to ES6 or even 5.

<p class="highlight">
  And that got me thinking: if I must use a transpiler anyway, why not choosing
  one that works with a better language? A language built to create rich web applications.
</p>

You may argue that since we transpile to JavaScript, this new language could not
be too much different and would be bound to JavaScript's internal logic. It
would just be some syntactic sugar on top of it. Similar to
<a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> or
<a hrerf="https://facebook.github.io/jsx/" target="_blank">JSX</a>.

Well, I’m happy to tell you that we're already working on a low-level format,
and it is called
<a href="https://webassembly.org/" target="_blank">WebAssembly</a>. It's not
ready yet, but when it will be, new languages will flourish. These languages
will be compiled and executed by the browser almost as fast as native code. And
they won't have to be retro-compatible because developers will compile them, the
source code won't be sent to the client.

Think of what assembly is to C but built for the web.

So, I don't know which programming language I will be using in 5 years. Elm is
currently the top candidate, and it
<a href="https://elm-lang.org/blog/farewell-to-frp#what-is-next-" target="_blank">expressed
intent</a> to support WebAssembly at some point. What I can tell you is that in
the future instead of having a new front-end framework every week we’ll have new
front-end languages. And that, if you ask me, is a good thing.
