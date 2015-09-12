# Bouncer.js

Lets you know when elements are in view. It's fast.

### How to use

```javascript
var elCheck = document.querySelectorAll('.my-section-i-want-check');
var b = new Bouncer(elCheck, function(direction) {
  console.log(direction);
});
```

### Why not waypoints.js?
* Bouncer supports multiple selectors at the same time.
* Alerts both entering selectors, and while in selectors.
* More lightweight.
* Written in vanilla javascript; supports everything.
