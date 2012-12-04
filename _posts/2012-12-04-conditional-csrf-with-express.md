---
layout: post
title: Conditional CSRF control with Express
published: true
---

Some days ago I had to develop a small authentication app in [Node](http://nodejs.org) with the [Express](http://expressjs.com/) framework. Basically it exposes just one JSON API, something like `POST /user_data`. It accepts two parameters: `user` and `password` and return the data if they are correct.

Users are created by an administrator using a web interface. Of course every form is protected from [CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) using [Express' middleware](http://expressjs.com/api.html#csrf).

Following the official guide you have to do so in order to enable it:

<pre class="prettyprint lang-javascript">
  <code>
  var express = require('express');

  var app = express();

  app.use(express.bodyParser()); // Read POST parameters
  app.use(express.cookieParser()); // Read cookies
  app.use(express.cookieSession({secret: 'mysecret'})); // Create a session using cookies

  app.use(express.csrf()); // Enable CSRF protection
  </code>
</pre>

That's correct if you want to validate **every** POST request. In my case I needed to skip the CSRF control for my API. So I defined my own middleware function that skips `/user_data` requests:

<pre class="prettyprint lang-javascript">
  <code>
  var express = require('express');
  var connect = require('connect');

  // Disable CSRF for some requests
  var conditionalCSRF = function (req, res, next) {
    var whitelist = [
      '/user_data'
    ];

    req.session._csrf || (req.session._csrf = connect.utils.uid(24));

    if (req.method !== 'POST') {
      next();
      return;
    }
    if (whitelist.indexOf(req.url) !== -1) {
      next();
    } else {
      (express.csrf())(req, res, next);
    }
  };

  app.use(conditionalCSRF);
  </code>
</pre>

In this way CSRF token validation will be applied only on POST requests not in the `whitelist` array.

If you want you can also skip AJAX requests. Here's the code:

<pre class="prettyprint lang-javascript">
  <code>
  var express = require('express');
  var connect = require('connect');

  // Disable CSRF for some requests
  var conditionalCSRF = function (req, res, next) {
    req.session._csrf || (req.session._csrf = connect.utils.uid(24));

    if (req.method !== 'POST') {
      next();
      return;
    }
    if (req.xhr) {
      next();
    } else {
      (express.csrf())(req, res, next);
    }
  };

  app.use(conditionalCSRF);
  </code>
</pre>

You can find a *gist* for this [here](https://gist.github.com/4207967).