---
layout: post
title: XKCD footnote labyrinth
published: true
---

So few days ago [XKCD](http://xkcd.com) published this comic:

<figure>
  <img alt="http://xkcd.com/1208" src="http://imgs.xkcd.com/comics/footnote_labyrinths.png">
  <figcaption><a href="http://xkcd.com/1208/">xkcd.com/1208</a></figcaption>
</figure>

Which for me resolves in a infinite loop. But to be sure I wrote a small Ruby class to compute it.

{% gist 5563161 %}

And the result was:

    ~/.rvm/gems/ruby-2.0.0-p0/gems/memoist-0.9.0/lib/memoist.rb:34: stack level too deep (SystemStackError)

So my idea was correct<sup>1<sup>2</sup></sup>. You're welcome.

1. May not be true
2. Increment by 2
3. Actually a 4<sup>5</sup>
4. False
5. True<sup>3<sup>2</sup></sup> if false<sup>1<sup>2</sup></sup>