---
layout: post
title: Conditional CSRF control with Express
published: false
---

Some days ago I had to develop a small authentication app in [Node](http://nodejs.org) with the [Express](http://expressjs.com/) framework. Basically it exposes just one JSON API, something like `POST /user_data`. It accepts two parameters: `user` and `password` and return the data if they are correct.

Users are created by an administrator using a web interface. Of course every form is protected from [CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery) using [Express' middleware](http://expressjs.com/api.html#csrf).

Following the officical guide you have to do so in order to enable it:

```javascript
var express = require('express');

var app = express();

app.use(express.bodyParser()); // Read POST parameters
app.use(express.cookieParser()); // Read cookies
app.use(express.cookieSession({secret: 'mysecret'})); // Create a session using cookies

app.use(express.csrf()); // Enable CSRF protection
```