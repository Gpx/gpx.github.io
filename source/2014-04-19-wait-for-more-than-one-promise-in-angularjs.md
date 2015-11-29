---
title: Wait for more than one promise in AngularJS
date: 2014-04-19 00:00 UTC
published: true
---

While developing a web application it may happen that you need the results from more than one asynchronous request. Let's say that in a blog application you want to display for every user the list of posts he wrote. So you need to ask for `/users` and `/posts`. When you get both those information you can do the mapping.

One way to go is this:

```javascript
function SomeController ($scope, userService, postService) {
  userService.getAll()
  .then(function (users) {
    $scope.users = users; // Save it for later
    postService.getAll();
  }).then(function (posts) {
    $scope.posts = posts;

    // Do the mapping
  });
}
```

The code above is not efficient because the two request are run one after the other. We can do better using the [`$q.all()`](https://docs.angularjs.org/api/ng/service/$q#all) method.

This method takes an array or an object of promises and combines them into a single promise.

Let's see how we can improve the code above:

```javascript
function SomeController ($scope, $q, userService, postService) {
  $q.all([userService.getAll(), postService.getAll()])
  .then(function (results) {
    $scope.users = results[0]
    $scope.posts = results[1];

    // Do the mapping
  });
}
```

As you can see this is cleaner and the code runs faster because the two AJAX request will be executed in parallel.


I created [this JS Bin](http://jsbin.com/poboj/2/edit?js,console) as an example. It uses [`$timeout`](https://docs.angularjs.org/api/ng/service/$timeout) instead of an AJAX call but the idea is the same.
