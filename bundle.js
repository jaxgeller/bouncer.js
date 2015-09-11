(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Spy = (function () {
  function Spy(selector) {
    _classCallCheck(this, Spy);

    this.offsets = [];
    this.selector = selector;
    this.windowOffset, this.lastScroll, this.windowBuffer = window.pageYOffset;
    this.ticking = false;
    this._setOffsets();
    this.buffer = { start: 0, end: this.offsets.length };
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

  _createClass(Spy, [{
    key: 'onScroll',
    value: function onScroll() {
      this.lastScroll = window.pageYOffset;
      this.requestTick();
    }
  }, {
    key: 'requestTick',
    value: function requestTick() {
      if (!this.ticking) {
        requestAnimationFrame(this.update.bind(this));
        this.ticking = true;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.windowOffset = window.pageYOffset;

      for (var i = this.buffer.start; i < this.buffer.end; i++) {
        if (this.windowOffset > this.offsets[i].start && this.windowOffset < this.offsets[i].end) {
          console.log('in');
          // this.buffer = this._setBuffer(i);
        }
      }

      this.ticking = false;
    }
  }, {
    key: 'run',
    value: function run() {
      window.addEventListener('scroll', this.onScroll.bind(this), false);
    }
  }, {
    key: '_setOffsets',
    value: function _setOffsets() {
      for (var i = this.selector.length - 1; i >= 0; i--) {
        var o = this.selector[i].getBoundingClientRect();
        var start = window.pageYOffset;
        this.offsets.push({ start: start, end: start + o.height });
      };
    }
  }, {
    key: '_setBuffer',
    value: function _setBuffer(i) {
      var start = i - 2;
      if (start < 0) start = 0;

      var end = i + 2;
      if (end > this.offsets.length) end = this.offsets.length;
      return { start: start, end: end };
    }
  }]);

  return Spy;
})();

var t = new Spy(document.querySelectorAll('.red'));
t.run();

},{}]},{},[1]);
