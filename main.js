export default class Bouncer {
  constructor(selector, cb, offset, whileIn) {
    this.offsets = [];
    this.windowOffset, this.windowBuffer = window.pageYOffset;
    this._setOffsets(selector);
    this.buffer = {start: 0, end: this.offsets.length}
    this.cb = cb;

    this.offset = (offset / 100) * window.innerHeight || 0;

    this.ticking = false;

    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  update() {
    this.windowOffset = window.pageYOffset + this.offset;

    for (let i = this.buffer.start; i < this.buffer.end; i++) {
      if (this._checkPosition(i)) {
        // this.buffer = this._setBuffer(i);

        this.windowOffset > this.windowBuffer ?
          this.cb('down') :
          this.cb('up');
      }
    }

    this.windowBuffer = this.windowOffset;
    this.ticking = false;
  }

  onScroll() {
    if(!this.ticking) {
      requestAnimationFrame(this.update.bind(this));
      this.ticking = true;
    }
  }

  _setOffsets(selector) {
    for (let i = 0; i < selector.length; i++) {
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

  _checkPosition(i) {
    return this.windowOffset > this.offsets[i].start
        && this.windowOffset < this.offsets[i].end;
  }
}
