---
tags: post
layout: post.liquid
title: "The Five Primary UX States"
date: "2023-03-29"
---

Have you ever started implementing a design only to realize some states were missing? You then went back to your designer to ask, "what should we show if this happens?" I experienced this firsthand many times. The issue is often the same one. When we plan new interfaces, we only think about the happy path.

You should consider five primary UX states when you work on a new interface. Let's see what they are.

## Loading state

Things don't magically appear on the page. They need to be fetched; usually, it takes some time. This is the state that is shown when the app is loading. In most cases, you can implement a simple loading animation and reuse it everywhere. In other cases, you might want a different strategy for each component. Talk to your team and decide.

![](/images/primary-ux-states/1.png)

## Error state

Well, things don't always go as planned. Nothing to worry about as long as you have a good backup plan. Remember that a good error message informs the user of what happened and gives clear instructions on what to do next. In most cases, a simple reload will fix the problem. It's also a good idea to add some logging about errors so you know when your users are experiencing them.

![](/images/primary-ux-states/2.png)

## Empty or Initial state

Imagine that your user just onboarded on your project management tool. They go to the list of projects and see… _nothing!_ This case happens quite a lot if you think about it. You want to use the occasion to teach your user how to use your app. A simple button or a link to initiate a new activity will do the trick most of the time.

![](/images/primary-ux-states/3.png)

## 404 state

This state might sound the same as the Empty state, but it's, in fact, different. The Empty state is shown when the user searches for something and gets back an empty list. The 404 state is shown when the user asks for something that doesn't exist.

![](/images/primary-ux-states/4.png)

## Ready state

I'm sure you're familiar with this state because it's the one you always get from designers. It's also the one that you show in your marketing materials. This is the state shown when the app is ready to be used. All the data has been loaded, and no errors occurred.

---

That's it. These are the states that you need. _Write them down_ so you don’t forget them, and make sure they are well-defined for every component you work on, regardless if they are small as a button or as big as a page.
