# Bouncer.js

Lets you know when elements are in view. It's fast.

### How to use

```javascript
var opts = {
  selector: document.querySelectorAll('.elementOrElementstoCheck'),
  offset: '100px'
  fireOnce: false
}

var b = new Bouncer(opts, function(direction) {
  alert(direction);
});
```

### Why not waypoints.js?
* Bouncer supports multiple selectors at the same time.
* Alerts both entering selectors, and while in selectors.
* More lightweight.
* Written in vanilla javascript; supports everything.


### Defaults

```javascript
var opts = {
  selector: null,
  offset: 0
  fireOnce: false
}
```
