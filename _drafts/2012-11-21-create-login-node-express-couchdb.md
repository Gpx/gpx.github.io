---
layout: post
title: Create a login with Node.js Express and CouchDB
published: false
---

Recently I had to develop a login using [Node.js](http://nodejs.org/) and particulary the [Express](http://expressjs.com/) framework using [CouchDB](http://couchdb.apache.org/) to store data. Here's what I've done.

## The theory
Before starting I've checked the theory behind a login in order to make it safe. Basically there were three things I wanted to prevent:

1. SQL injections
1. Stole passwords from DB
1. Cross-site request forgery

### SQL injection
Since is 2012 I think that quite everyone knows what a SQL injection is. If not this [Wikipedia article](http://en.wikipedia.org/wiki/SQL_injection) describes it quite well.

As I wrote before I used CouchDB for this project which is a so called [NoSQL](http://nosql-database.org/) database. Therefore the risk should be a NoSQL injection. Well my code may be bad but is not the worst and I've learned that [eval is evil](http://www.jslint.com/lint.html#evil) so I think I can avoid it.

### Stole passwords from DB
The DB will be hosted on [Cloudant](https://cloudant.com/) and I'm sure that the team is doing a great job protecting data from malicious accesses but there are some precautions a developer must take.

Nowadays there are still websites that save passwords directly in the db. That's really really bad. Imagine that an attacker can get the list of users with their passwords. Again, that's really really bad.

So instead of saving passwords people started writing passwords' [hash values](http://en.wikipedia.org/wiki/Hash_function) onto the db. In that way an attacker in possession of the hash value can't go back to the original password. Well, actually sometimes she can: there are things called [rainbow tables](http://en.wikipedia.org/wiki/Rainbow_tables) that basically are lists of hash values with their counterpart. And also if two or more users are using the same password they'll have the same hash and that leads to statistic attacks, or if for some reason you know someone password you can see if there's anybody else using it as well.

So hashing password is a good thing but is not enough. That's why you should use a [salt](http://en.wikipedia.org/wiki/Salt_(cryptography). It is a random sequence which is somehow added to the password so you can hash them together. In that way if two users choose the same password they'll have different hashes since their salts are different. Of course you also have to store your salt when you save your hash.

### Cross-site request forgery
This functionality comes for free with many web frameworks like [Ruby on Rails](http://rubyonrails.org/) and with Express is quite easy to implement.

## The code
