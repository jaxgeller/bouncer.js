export default class Bouncer {
  constructor(opts, callback) {
    this.sections = this._setSections(opts.selector);
    this.callback = callback;

    this.ticking = false;
    this.windowOffset, this.windowBuffer = window.pageYOffset;
    this.offset = this._setOffset(opts.offset);

    this.fireOnce = opts.fireOnce || false;
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  update() {
    this.windowOffset = window.pageYOffset + this.offset;

    for (let i = 0; i < this.sections.length; i++) {
      if (this.fireOnce)
        this.checkFireOnce(i);
      else
        this.checkFire(i);

      this.windowBuffer = this.windowOffset;
      this.ticking = false;
    }
  }

  onScroll() {
    if(!this.ticking) {
      requestAnimationFrame(this.update.bind(this));
      this.ticking = true;
    }
  }

  _reportDirection() {
    this.windowOffset > this.windowBuffer ?
      this.callback('down') :
      this.callback('up');
  }

  checkFireOnce(i) {
    if (this._checkPosition(i)) {
      if (this.canFire) {
        this.canFire = false;
        this._reportDirection();
      }
    } else {
      this.canFire = true;
    }
  }

  checkFire(i) {
    if (this._checkPosition(i))
      this._reportDirection()
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

  _setOffset(offset) {
    if (!offset)
      return 0;

    if (offset.indexOf('px') > -1)
      return parseInt(offset);

    return (offset / 100) * window.innerHeight;
  }
}
