export default class Bouncer {
  constructor(opts, callback) {
    this.sections = this._setSections(opts.selector);
    this.callback = callback;

    this.ticking = false;
    this.windowOffset, this.windowBuffer = window.pageYOffset;
    this.offset = (opts.offset / 100) * window.innerHeight || 0;

    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  update() {
    this.windowOffset = window.pageYOffset + this.offset;

    for (let i = 0; i < this.sections.length; i++) {
      if (this._checkPosition(i)) {
        this.windowOffset > this.windowBuffer ?
          this.callback('down') :
          this.callback('up');
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

  _checkPosition(i) {
    return this.windowOffset > this.sections[i].start
        && this.windowOffset < this.sections[i].end;
  }

  _setSections(selector) {
    let holder = [];

    for (let i = 0; i < selector.length; i++) {
      let o = selector[i].getBoundingClientRect();
      let start = window.pageYOffset + o.top;
      holder.push({start: start, end: start + o.height});
    };

    return holder;
  }
}
