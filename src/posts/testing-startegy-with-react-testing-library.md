---
title: "A Testing Strategy for React Testing Library"
date: "2019-03-18"
---

For a few months now I've been using
[`react-testing-library`](https://testing-library.com/react) to test my react
applications. In this time I've seen its popularity increase. So much so that
the official React docs
[recommend it](https://reactjs.org/docs/test-utils.html#overview).

While teaching it at work, answering people's questions on the official
[Spectrum channel](https://spectrum.chat/?t=eac15da1-8b55-4b26-9085-1a837df8e6bf)
and on Stack Overflow, I noticed some common patterns. People tend to be
confused about what part of an application to test and how to test them.

Indeed `react-testing-library` is quite different from many other solutions that
preceded it. Due probably to its young age there are not many resources out
there that explain how to test a real world application.

Over a series of trial-and-error attempts I developed a strategy that works well
for my use-cases. I'm going to explain it in this post with the disclaimer that
what works for me isn't necessarily going to work for you too. Nevertheless I
think you can get some good ideas out of this article, especially if you just
started testing your React applications.

## Meet Our Application
