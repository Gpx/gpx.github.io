---
tags:
  - post
  - Engineering
  - Leadership
layout: post.liquid
title: "The downfall of a software company"
date: "2024-10-05"
---

Picture this: the development team at a new startup. They have no money or people and must quickly prove themselves and their idea. They work with intensity and speed but inevitably forgo quality. It’s not that they don’t care about building something good; it’s just that good takes time and money, and they have neither.

Things go well. Customers start growing, investors lend money, new people join the team, and features are released. Every major milestone is a call for celebration, and the marketing team turns every new functionality into a campaign showing off the latest advancement.

Most companies make a critical mistake at this stage: they keep doing things as they were. Why not? Things seem to go well; please, more of that.

As the company grows, more structure is added. OKRs are introduced, and Scrum is adopted for single teams. It’s the beginning of the end.

Everything looks great. Features keep coming out of the door quickly until the rhythm slows down a bit, then a bit more, a lot more, and it almost halts. Tasks that usually took a few days now take months. Bug reports are through the roof, and incidents happen almost daily.

Management is worried, they push everyone to go faster and bring the quality back, but things seem to go slower, morale is low, and changing anything requires a titanic effort.

What happened?

What happened is that the initial mindset of fast and cheap at the expense of quality was never changed for something else.

Developers were praised for being fast and releasing features, so they tried to be as fast as possible. Unfortunately, there’s an easy and effective way to go fast in software development: creating technical debt.

Technical debt is the best if all you care about is speed. Do you want to release this today? Easy: don’t write any tests, don’t implement a maintainable architecture, don’t write any documentation, and put all the code in one file. You will close that ticket in a matter of hours. You’re doing great—in the short term.

In the long term, for every shortcut you take, the next ticket will take a little longer for you and your colleagues. But only a tiny bit, so that’s okay. Only it is not because as you do that, so does all of the team. So every day, you make your codebase a little bit worse and make developing on it a little bit slower.

That’s no problem, though, because more developers are joining the team. Yes, working on the code is more challenging, but we have more people now, so it evens out. Well, it does for a while, but you are still adding technical debt, you are still making your developer speed a little slower with every commit, and now you have many more people who do a lot more commits, so your rate of slowing down accelerates.

How come nobody cares about this, you ask? Because nobody’s looking at the quality, they are focused on something else: metrics. You see, the team got so big, and there are so many moving parts that keeping an eye on all of them became impossible, so OKRs and metrics are used instead.

But the problem with metrics is that when you show a number and tell people you want it to go up or down by some amount, that becomes a goal. But that’s not the goal. The goal is to do something that the metric is supposed to measure.

Okay, so now we no longer care about tangible things like new features but about attempts to measure their success. Oh, and we have deadlines. That’s right. OKRs change every quarter, so you better achieve them in three months or less. Plus, we’re using Scrum, so you have additional deadlines every couple of weeks or for however long we decide our Sprints will be.

I wonder what a developer who is late for a deadline and sees that all existing code is rotten will do. Surely, they will take their time to do things properly. Or maybe they’ll add some more technical debt to the mix.

I wonder what a manager who sees their project is late for several deadlines will do when their developers say they need time to improve the code. Surely, they will try to set aside time for the team to work on it. Or maybe they’ll say there’s no time now, but after the OKRs are met, they’ll try to allocate some time for refactoring—only that won’t happen because a new deadline will appear.

At some point, someone will get a few days to do refactoring, but it’s like emptying the sea with a bucket. In some cases, teams institute 20% of their sprint scope for technical tasks. Only, we’re late for a very important deadline this sprint, so we’ll not work on it. But next sprint, for sure!

And so it continues quality and speed going down while deadline and OKRs are achieved. Congratulations you too are in a successful company with a bad product.