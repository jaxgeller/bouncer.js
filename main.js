class Bouncer {
  constructor(selector, cb, topOffset) {
    this.offsets = [];
    this.windowOffset, this.windowBuffer = window.pageYOffset;
    this._setOffsets(selector);
    this.buffer = {start: 0, end: this.offsets.length}
    this.cb = cb;

    this.ticking = false;
  }

  update() {
    this.windowOffset = window.pageYOffset;
    for (var i = this.buffer.start; i < this.buffer.end; i++) {
      if (this.windowOffset > this.offsets[i].start && this.windowOffset < this.offsets[i].end) {

        this.buffer = this._setBuffer(i);

        this.windowOffset > this.windowBuffer ?
          this.cb('down') :
          this.cb('up');
      }
    }

    this.windowBuffer = this.windowOffset;
    this.ticking = false;
  }

  run() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  onScroll() {
    this.requestTick();
  }

  requestTick() {
    if(!this.ticking) {
      requestAnimationFrame(this.update.bind(this));
      this.ticking = true;
    }
  }

  _setOffsets(selector) {
    for (var i = 0; i < selector.length; i++) {
      let o = selector[i].getBoundingClientRect();
      let start = window.pageYOffset + o.top;
      this.offsets.push({start: start, end: start + o.height});
    };
  }

  _setBuffer(i) {
    let start = i - 2;
    let end = i + 2;
    if (start < 0) start = 0;
    if (end > this.offsets.length) end = this.offsets.length;

    return {start: start, end: end}
  }
}
