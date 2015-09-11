class Spy {
  constructor(selector) {
    this.offsets = [];
    this.selector = selector;
    this.windowOffset, this.lastScroll, this.windowBuffer = window.pageYOffset;
    this.ticking = false;
    this._setOffsets();
    this.buffer = {start: 0, end: this.offsets.length}
  }

  // tick() {
  //   this.windowOffset = window.pageYOffset;

  //   for (var i = this.buffer.start; i < this.buffer.end; i++) {
  //     if (this.windowOffset > this.offsets[i].start && this.windowOffset < this.offsets[i].end) {
  //       this.buffer = this._setBuffer(i);
  //     }
  //   }

  //   // if (this.windowOffset > this.windowBuffer)
  //   //   // down
  //   // else
  //   //   // up

  //   this.windowBuffer = this.windowOffset;
  //   this.requestTick();
  // }

  onScroll() {
    this.lastScroll = window.pageYOffset;
    this.requestTick();
  }

  requestTick() {
    if(!this.ticking) {
      requestAnimationFrame(this.update.bind(this));
      this.ticking = true;
    }
  }

  update() {
    this.windowOffset = window.pageYOffset;



    for (var i = this.buffer.start; i < this.buffer.end; i++) {
      if (this.windowOffset > this.offsets[i].start && this.windowOffset < this.offsets[i].end) {
        // this.buffer = this._setBuffer(i);
      }
    }

    this.ticking = false;
  }

  run() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  _setOffsets() {
    for (var i = this.selector.length - 1; i >= 0; i--) {
      let o = this.selector[i].getBoundingClientRect();
      let start = window.pageYOffset;
      this.offsets.push({start: start, end: start + o.height});
    };
  }

  _setBuffer(i) {
    var start = i -2;
    if (start < 0) start = 0;

    var end = i + 2;
    if (end > this.offsets.length) end = this.offsets.length;
    return {start: start, end: end}
  }
}

var t = new Spy(document.querySelectorAll('.red'))
t.run()
