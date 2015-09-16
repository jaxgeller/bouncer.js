export default class Bouncer {
  constructor(selector, cb, offset, whileIn) {
    this.offsets = [];
    this.windowOffset, this.windowBuffer = window.pageYOffset;
    this._setOffsets(selector);
    this.cb = cb;

    this.offset = (offset / 100) * window.innerHeight || 0;

    this.ticking = false;

    this.whileIn = whileIn || true;
    this.canReport = true;

    this.whileIn = true
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  update() {
    this.windowOffset = window.pageYOffset + this.offset;

    for (let i = this.buffer.start; i < this.buffer.end; i++) {
      if (this.whileIn) {
        if (this._checkPosition(i)) {

          this.windowOffset > this.windowBuffer ?
            this.cb('down') :
            this.cb('up');
        }
      } else if (this.canReport){
        if (this._checkPosition(i)) {

          this.windowOffset > this.windowBuffer ?
            this.cb('down') :
            this.cb('up');

          this.canReport = false;
        }
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

  _checkPosition(i) {
    return this.windowOffset > this.offsets[i].start
        && this.windowOffset < this.offsets[i].end;
  }
}
