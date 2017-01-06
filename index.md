# Comments

I'm using this file as an explanation of what is going on in the HTML.

### index.html

```html
<!DOCTYPE html>
```
all HTML documents need to start this way.
[this is a super-small HTML file](https://gist.github.com/cmalven/1885287)

<br />

```html
<html lang="en">
```
this tells the browser to expect english-language text.

<br />

```html
<head>
```
most HTML documents have a `<head>` and then a `<body>` (and there is only one of each). the stuff in the `<head>` isn't actually visible on the screen.

<br />

```html
<!-- Basic Page Needs
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
```
in HTML, you start comment lines with `<!--` and end them with `-->`. you can basically put anything in between and it won't show up in a browser.

<br />

```html
<meta charset="utf-8">
```
I don't know what this is really, but it's best practice.
if you're interested, you can read [an article about it](https://www.sitepoint.com/meta-tags-html-basics-best-practices/).

<br />

```html
<title>JULIA CRAIG</title>
```
the page title is what shows up in the tab on google chrome and what google shows you before you click the link.

<br />

```html
<meta name="description" content="JULIA CRAIG">
<meta name="author" content="JULIA CRAIG">
```
this stuff can be helpful for Google's links, but I don't really think they're that important.  see the `meta` article above.  no real harm keeping them in though, so why not?

<br />

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
this is just a setting that tells phones not to show the text really small.

<br />

```html
<link href="https://fonts.googleapis.com/css?family=Source+Code+Pro:500,700" rel="stylesheet">
```

this imports the font from google.
it's called [Source Code Pro]( https://fonts.google.com/specimen/Source+Code+Pro).
it's a monospaced font, so all of the letters are the same width.

<br />

```html
<link rel="stylesheet" href="c/style.css">
```
you can put CSS rules in the `<style>` tag at the top, or you can move them into another file.
it's almost always better to have them in a new file because then you can include all your CSS rules on other HTML pages.

<br />

```html
<!--link rel="icon" type="image/png" href="i/favicon.png"-->
```
the favicon is the tiny icon you see in a browser tab.
if you think of one you want, you can take a .jpg and stick it into a favicon generator ([for example]( https://www.google.co.uk/search?q=make+favicon+online&ie=utf-8&oe=utf-8)). because i don't have one, I've commented it out.

<br />

```html
<body class="position-relative">
```
the body is the container element that holds everything.

but beyond that, this is more interesting to us becuase this element also has a `class`.

`class`es and `id`s are helpful names that you give elements for CSS to target them.  you just make them up: it doesn't matter what you call them.

the difference is:

- classes can be reused multiple times (and an element can have many classes)
- ids should only appear once on any page (and an element should have at most one id)

you can write CSS rules to target various things:

- a tag name (in HTML, all the stuff between the angle brackets -- `<p>`, `<a>`, `<body>` -- are called "tags")
- a class name
- an id name

a CSS rule targeting a tag name looks like this: `body { color: black; }`

a CSS rule targeting a class name looks like this: `.body-class { color: black; }`

a CSS rule targeting an id looks like this: `#body-id { color: black; }`

usually you want class names to indicate what they are doing (for example, `.blue-text { color: blue; }`), but, as I said earlier, you can call them anything you want.

here are some examples:

```html
<!-- this element has no classes or ids -->
<body></body>

<!-- this element has one class ("body-class") -->
<body class="body-class"></body>

<!-- this element has two classes ("body-class" and "blue-text") -->
<body class="body-class blue-text"></body>

<!-- this element has an id ("container") -->
<body id="container"></body>

<!-- this element has a class ("body-class") and an id ("container") -->
<body class="body-class" id="container"></body>
```

(moving on.)

<br />

```html
<span class="name first-name noselect">JULIA</span>
```
a `<span>` is a general element that doesn't mean anything in particular.
this `<span>` has 3 classes: "name", "first-name", and "noselect".

<br />

```html
<div class="contact">
```

a `<div>` is also a general element that doesn't mean anything. the difference between a `<div>` and a `<span>` is that a div is a block element whereas a span is an inline element.


in normal people terms, this means that:

- divs will take up full width space of their container and push other content below
- spans will take up only the space they take up

[(here is an example to illustrate the point.)](https://jsbin.com/toxibecuji/edit?html,output)

in general, you would use `<div>`s as containers for other elements, and you would use `<span>`s to highlight special words in a sentence or something.

<br />

```html
<div class="container">
```
this container element holds the three links.

<br />

```html
<a href="mailto:jcmatrix11@gmail.com" class="email" title="pls no spam" target="_blank">email</a>
```
a link is know as an "anchor", so it has an "a" tag.

- an `href` is the place that link points, ie `href="http://google.com"`
  - (a link that begins with `mailto:` is a special thing that's only used for emails)
- a `class` is something I've been over
- a `title` is what shows up when you leave your mouse hovering over the link
- `target="_blank"` tells the link to open in a new tab

<br />

```html
</a><!--
--><a>
```
there are also weird comments here that other elements don't have. this is totally bonkers, but this [article explains](https://css-tricks.com/fighting-the-space-between-inline-block-elements/) it pretty well.  (it's probably more interesting than most of the other articles i've linked to, so i think it's worth reading.  gives you an idea of some of the weird stuff you just have to know when you do websites.)

<br />

```
</div><!-- end of .contact -->
```
I sometimes leave comments at the end of divs saying which div is being closed. otherwise it can be hard to manage when you've got lots of divs on a page, and they're all inside each other.

<br />

```
<span class="name last-name noselect">CRAIG</span>
```
this span also has 3 classes: you'll notice that two of these classes are the same as the top name (`name` and `noselect`).  this means that we can keep common rules (font size and color, for example) in the `name` CSS rules, but we can tell `first-name` to be on the top of the window and `last-name` to sit at the bottom.

the `noselect` class stops you from being able to select the words with your mouse.  generally this is a bad idea unless the text is pure decoration, which I figured was mostly what was happening here.
[here's where I found it](http://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css).

<br />

```html
</html>
```
