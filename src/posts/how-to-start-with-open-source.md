---
title: "How to Start with Open Source"
date: "2018-10-25"
---

Last Sunday, October 21st, I took part in
<a href="https://hacktoberfestbarcelona.com/" target="_blank">Hacktoberfest
Barcelona</a>. If you don't know what it is, Hacktoberfest is an initiative by
DigitalOcean, GitHub and Twilio. It encourages people to contribute to
open-source projects for the whole month of October.

In our Barcelona chapter, we focused on helping newcomers starting contributing
from day one. We had presentations and hands-on exercises.

Among all of this, I wrote a short document to help people getting started.
Following is that document adapted for Medium. I hope others will find it
useful.

---

Imagine it's your first day at a new job. Your company has quite a few
developers already, and they're working on a cool internal project. Everyone
there knows you're staring today. They give you your new laptop, hook you up
with all the accounts you need, they show you how the coffee machine works and
then you can start. You install all the tools, make sure the project is working
on your machine (usually it doesn't) and then they have a task for you.

They prepared this task just for you because it's your first day. This task will
help you understand the project and start contributing. Usually, it's some
refactoring. You start working on it and maybe you finish it in one day, maybe
it’ll take longer.

Open source is more or less like starting at a new job only nobody knows that
you’re coming and they didn't prepare anything for you. You have to go and
decide what to work on.

This is just to say that it's not easy to get started and if you manage to open
only one pull request today consider it a success. But trust us if you keep at
it it'll get easier and you'll get better.

Beginnings are hard and everybody has to start somewhere. Don't feel discouraged
if you've never done any open source before, we've all been beginners. At
<a href="https://firstpr.me/" target="_blank">firstpr.me</a> you can see what
was the first PR for any GitHub user. Maybe you can get some inspiration out of
it. A few examples:

- <a href="https://firstpr.me/#jeresig" target="_blank">John Resig</a> creator
  of jQuery, he wrote several books on JavaScript
- <a href="https://firstpr.me/#sdras" target="_blank">Sarah Drasner</a> Vue core
  team member and O'Reilly published author
- <a href="https://firstpr.me/#kentcdodds" target="_blank">Kent C. Dodds</a>
  react-testing-library creator. Works at Paypal and he's part of TC39
- <a href="https://firstpr.me/#peggyrayzis" target="_blank">Peggy Rayzis</a>
  engineering manager Apollo and speaker
- <a href="https://firstpr.me/#jordwalke" target="_blank">Jordan Walke</a>
  creator of React
- <a href="https://firstpr.me/#stubbornella" target="_blank">Nicole Sullivan</a>
  Google Chrome project manager
- <a href="https://firstpr.me/#wycats" target="_blank">Yehuda Katz</a>
  co-creator of Ember, Rust/Ruby on Rails/jQuery Core Team, TC39 member
- <a href="https://firstpr.me/#eveporcello" target="_blank">Eve Porcello</a>
  JavaScript teacher and O'Reilly published author
- <a href="https://firstpr.me/#mhevery" target="_blank">Miško Hevery</a> creator
  of Angular. Funny enough, it looks like the core developers of Angular opened
  Github just to work on their framework
- <a href="https://firstpr.me/#flarnie" target="_blank">Flarnie Marchan</a>
  Facebook Software Engineer, React Core Team
- <a href="https://firstpr.me/#staltz" target="_blank">André Staltz</a> creator
  of Cycle.js
- <a href="https://firstpr.me/#LeaVerou" target="_blank">Lea Verou</a> W3C CSS
  Working Group invited expert. Her PR is from 2013 and is yet to be merged :)

The list goes on. Try it out with some of the developers you follow to see how
they started.

If you have no idea how to open a pull request or even what git is no worries.
We've all been in your shoes at some point. If you want to understand a bit
better how this whole pull request thing works check out this great
<a href="https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github" target="_blank">Egghead
course</a>.

## Work on Documentation

Now, look back at the first PRs from famous developers. One common theme you can
see is that most of those are about fixing typos or improving a documentation.
That's a great way to start. Coding can take some effort but _veryone know how to
fxi a borken sntence_.

So, here's idea #1 if you want to start contributing:

<p class="highlight">
 Pick a project you're interested in and start reading its documentation. Did
 you find a typo? Open a PR. Is there a passage that is not clear or could use
 some rewording? Open a PR. Do you think one more example could make the idea
 easier to understand? Open a PR. Does it have a multi-language documentation
 but the one in your mother tongue is missing? Open a&hellip; well you get the idea.
</p>

You will not only contribute to the project but at the same time learn a new
tool by reading its docs. Win-win!

And please please PLEASE do not think this is a minor task. Documentation is one
of the most important parts of any project. And I'm not just saying that. Most
projects die because of a lack of good documentation. If you help in this area
the maintainers will be grateful.

## Find a Project

Ok, writing documentation is great and all but you want to write some code. The
best way to start is to pick a tool you already use. Why? Because you know how
it works and you know what it should and should not do. Do you follow its Github
repo? You should, many ideas come out from there. Check open issues and PRs to
see if there's something you could help with. What are people saying on
<a href="https://stackoverflow.com/" target="_blank">Stack Overflow</a> about
it? Are they confused about something? Sometimes a question could lead to
improving the documentation or refactoring some part of the code to make it
easier to work with.

One piece of advice here.

<p class="highlight">
Try to start with small projects with not too many contributors.
</p>

A big repo like Angular's will take a long time just to start up and usually,
when a new problem comes up, there's a dozen or so of developers ready to fix
it. Bottom line: start small.

Still don't know what to work on?
<a href="https://up-for-grabs.net/#/" target="_blank">Up For Grabs</a> has a
list of projects that are looking for help. Check out if there's something that
could be interesting for you. Other great sources are
<a href="https://github.com/search?utf8=%E2%9C%93&q=label%3Afirst-timers-only+is%3Aopen&type=Issues&ref=searchresults" target="_blank">first-timers-only</a>
and
<a href="https://github.com/MunGell/awesome-for-beginners" target="_blank">awesome-for-beginners</a>.
These are all projects that have decided to mark some of their issues for first
timers. When you find an issue you want to work on claim it. That means comment
in the issue page that you're going to work on it. This is to avoid having more
than one person fixing the same problem.

---

One important thing, no matter what you end up doing. Be nice and be kind.
Behind every Github user there's a real person. Maintainers have other things to
do. They have families, friends, hobbies and often another job. If somebody
doesn't reply immediately, or if they just close your PR with an abrupt comment
don't take it personally. They probably have other 200 PRs to go through.
