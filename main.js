class Spy {
  constructor(selector, cb) {
    this.offsets = [];
    this.selector = selector;
    this.windowOffset, this.lastScroll, this.windowBuffer = window.pageYOffset;
    this.ticking = false;
    this._setOffsets();
    this.buffer = {start: 0, end: this.offsets.length}
    this.cb = cb;
  }

  tick() {
    this.windowOffset = window.pageYOffset;

    for (var i = this.buffer.start; i < this.buffer.end; i++) {
      if (this.windowOffset > this.offsets[i].start && this.windowOffset < this.offsets[i].end) {

        // this.buffer = this._setBuffer(i);

        if (this.windowOffset > this.windowBuffer)
          this.cb('down');
        else
          this.cb('up');
      }
    }

    this.windowBuffer = this.windowOffset;
  }


  run() {
    window.addEventListener('scroll', this.tick.bind(this), false);
  }

  _setOffsets() {
    for (var i = 0; i < this.selector.length; i++) {
      let o = this.selector[i].getBoundingClientRect();
      let start = window.pageYOffset + o.top;
      this.offsets.push({start: start, end: start + o.height});
    };
  }

  _setBuffer(i) {
    var start = i - 2;
    if (start < 0) start = 0;

    var end = i + 2;
    if (end > this.offsets.length) end = this.offsets.length;
    return {start: start, end: end}
  }
}
var cb = function(dir) {
  console.log('hit red section in the direction of ' + dir);
}
var t = new Spy(document.querySelectorAll('.red'), cb);
t.run()
