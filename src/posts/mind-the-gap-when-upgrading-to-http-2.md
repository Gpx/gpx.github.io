---
title: "Mind the Gap when upgrading to HTTP/2"
date: "2015-08-20"
cover:
  file: "./mind-the-gap-when-upgrading-to-http-2/cover.jpg"
  author: "Erez Attias"
  link: "https://unsplash.com/photos/KqVHRmHVwwM"
---

The web has been in great ferment in the last few years. HTML 5, ECMAScript 2015
and all the new landing features are making our beloved platform a great place
to be.

One of the most significant improvements is HTTP/2.

The _Hypertext Transfer Protocol_ evolved a lot since its beginnings in 1989.
When Tim Berners-Lee and his team created the protocol, they needed only a few
features.

This first version was simple: it allowed only to perform GET requests and
receive HTML data. Over the years, the [HTTP WG](https://httpwg.github.io/)
documented and updated the protocol bringing it to version 1.1.

Although most of the web runs on HTTP/1.1, this version has many issues.
Updating a protocol, especially if highly adopted, is not an easy task. For this
reason, developers had to create workarounds to many problems.

If you are a web developer you know most of them and chances are you’re using
them in your projects.

All those best practices are helpful but become counterproductive when used
alongside with HTTP/2. Let’s analyze them and see why is this the case.

## Domain Sharding

When we start an HTTP/1.x request, a new TCP connection is created. Once the
request ends, we can reutilize the connection so we don’t have to create a new
one.

This mechanism was serving us well during the early web but, with the time, we
outgrew it. A web page is no longer one single HTML file; we require CSS,
JavaScript and images.

For this reason, browsers started handling a connection pool of TCP streams.
Modern browsers usually support six streams per host. This means that, if your
page requires six images, the browser can download them in parallel. As you can
imagine, it is a great performance boost.

Even so, with the average web page asking for 90+ resources, this is still not
enough. Many requests will wait in queue before getting served.

Developers created a workaround to this problem: _domain sharding_. If a
browsers’ limit is six TCP connections per host, we can put our assets on
different hosts. That is, if our domain is _example.com_, images can be hosted
at _images.example.com_ and CSS files at _css.example.com_. In this way the
browser will open six parallel connections for your images and six for your CSS
files. Note that usually these subdomains are just CNAME DNS records that point
to the same IP address.

The browser will have to resolve each DNS name but you get a good performance
boost.

_If you decide to upgrade to HTTP/2 you should disable domain sharding._

HTTP/2 creates only one TCP connection and uses it to the fullest extent. The
stream can provide full [multiplex](https://en.wikipedia.org/wiki/Multiplexing)
support, both while sending and receiving. For this reason, clients no longer
need to initiate more TCP connections at the same time. However, if we host our
assets on different domains, the browser will have to create a new TCP
connection. This not only means more DNS requests. With HTTP/2 headers are sent
only when we first set them and when we want to change them, saving precious
bytes. Connecting to more than one host means sending the headers more than
once. Last, the client can prioritize the requests to receive the most important
data first. If we use domain sharding this option is less effective.

## Concatenation and Spriting

When you make a HTTP request you wait, at a minimum, for a full roundtrip of
latency before you get the first data back. For the average webpage this means a
lot of extra loading time. One obvious piece of advice here is “Don’t make a
request unless you need it”. Another way to speed-up the loading process is to
join together the resources you need.

When you join text files, usually JavaScript and CSS, we say we concatenate
them.

On the other hand, for images, we generate an _image sprite_. That is, an image
that contains more images. Using CSS we can then display only the part of the
image we need.

Both techniques allow us to generate less requests. Instead of 20 separate CSS
files we load just one that contains all others.

There are also downsides. Your page may not need all the data you concatenate
resulting in a waste of bandwidth. Also, if one of your assets changes, you
force the user to invalidate the cache and download it again. Last, your
JavaScript and CSS files will not get executed until the browser has finished to
downloading them.

All in all, for many applications running over HTTP/1.x, concatenation and
spriting is a good solution.

However, this is not true for HTTP/2, since many small resources can be
downloaded in parallel. In this case, the downsides of concatenating exceed its
benefits.

Another feature in HTTP/2 is the ability for the server to push data to the
client. When this happens, the browser will simply store the data in its cache.
Later, when that resource is needed, it can be fetched from the cache. This
makes concatenating even less necessary. We can instruct the server to push all
these little assets, giving them priority.

## Conclusions

HTTP/2
[is currently supported by most web browsers](http://caniuse.com/#feat=http2).
Although a decade will pass before the majority of the web upgrades to it. Even
so, you should plan your upgrade path now. The benefits you’ll get from it are
definitely worth it. Just remeber to question all the best practices you learned
through the years.
