---
layout: post.liquid
tags: post
title: Take decisions for the junior developer you haven’t hired yet
date: 2023-12-07
---

When making a decision that affects a team or an entire engineering organization, people often make a crucial but common mistake: they assume team members will always stay the same. This is especially common for smaller teams, but I’ve seen it happening at scale.

Let me explain with an example what I mean and why this is dangerous.

At a small young startup, the engineering team of three developers is having an issue. The pattern they’ve been using until then to structure their code is proving challenging, so they decide to go for another approach. The discussion started over lunch, and when they are back at the office, they all agree to go with a new methodology from now on while slowly refactoring existing portions of the code.

Do you see the problem? I’ll give you a hint. Ask yourself _what will happen when a junior developer joins the team_.

What will happen is that this developer will find a codebase with two conventions, the old one and the new one. In the best-case scenario, they will ask why it is that, and someone on the team will explain it. In the worst case, they will not realize the difference and start coding in the old way or a mix of the twos. Either way, the picture is not good. The new developer is, at best, confused and needs extra help and, at worst, is doing something wrong that will need to be fixed later.

It’s expected that new developers are confused and make mistakes—whether they are junior or seasoned experts—but the goal of a healthy engineering organization should be to limit that confusion and guide new and old team members in doing their best job.

As I said, the culprit of this issue is that organizations tend to think about now rather than the future when the team’s composition will change.

In our example, a better approach would have been to document the decision taken somewhere instead of only talking about it. Consider putting it in a list of documents any new hire should read when joining. That’s already a significant improvement, but people don’t always read the documentation. Can we go further? We can by following one simple rule: _every decision that can be automated should be automated._

If we want to stop using a specific pattern, for example, we can write a custom [ESLint rule](https://eslint.org/docs/latest/extend/custom-rule-tutorial) that detects and blocks it at the CI level. This way, everyone on the team will be guided while working on the common best practices.

These steps will help new team members and even existing ones thanks to the [curb-cut effect](https://en.wikipedia.org/wiki/Curb_cut_effect). After all, it’s hard to remember every little decision that has been made and this is more true the longer you are working at a company.

So, next time you make a decision, ask your colleagues: how do we make this obvious for a new junior developer?
