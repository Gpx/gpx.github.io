---
layout: post
title: Conditional CSRF control with Express
published: true
---

Some days ago I had to develop a small authentication app in [Node](http://nodejs.org) with the [Express](http://expressjs.com/) framework. Basically it exposes just one JSON API, something like `POST /user_data`. It accepts two parameters: `user` and `password` and returns the data if they are correct.

Users are created by an administrator using a web interface. Of course every form is protected from [CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) using [Express' middleware](http://expressjs.com/api.html#csrf).

Following the official guide you have to do so in order to enable it:

{% gist 5474596 %}

That's correct if you want to validate **every** POST request. In my case I needed to skip the CSRF control for my API. So I defined my own middleware function that skips `/user_data` requests:

{% gist 5474621 %}

In this way CSRF token validation will be applied only on POST requests not in the `whitelist` array.

If you want you can also skip validation for every AJAX requests. Here's the code:

{% gist 5474611 %}