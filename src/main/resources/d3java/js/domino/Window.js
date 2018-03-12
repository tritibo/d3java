"use strict";
var DOMImplementation = require('d3java/js/domino/DOMImplementation');
var EventTarget = require('d3java/js/domino/EventTarget');
var Location = require('d3java/js/domino/Location');
var sloppy = require('d3java/js/domino/sloppy');
var utils = require('d3java/js/domino/utils');

module.exports = Window;

function Window(document) {
  this.document = document || new DOMImplementation().createHTMLDocument("");
  this.document._scripting_enabled = true;
  this.document.defaultView = this;
  this.location = new Location(this, this.document._address || 'about:blank');
}

var console = {
	log: print,
	error: print
}

Window.prototype = Object.create(EventTarget.prototype, {
  _run: { value: sloppy.Window_run },
  console: { value: console },
  history: { value: {
    back: utils.nyi,
    forward: utils.nyi,
    go: utils.nyi
  }},
  navigator: { value: require("d3java/js/domino/NavigatorID") },

  // Self-referential properties
  window: { get: function() { return this; }},
  self: { get: function() { return this; }},
  frames: { get: function() { return this; }},

  // Self-referential properties for a top-level window
  parent: { get: function() { return this; }},
  top: { get: function() { return this; }},

  // We don't support any other windows for now
  length: { value: 0 },           // no frames
  frameElement: { value: null },  // not part of a frame
  opener: { value: null },        // not opened by another window

  // The onload event handler.
  // XXX: need to support a bunch of other event types, too,
  // and have them interoperate with document.body.

  onload: {
    get: function() {
      return this._getEventHandler("load");
    },
    set: function(v) {
      this._setEventHandler("load", v);
    }
  },

  // XXX This is a completely broken implementation
  getComputedStyle: { value: function getComputedStyle(elt) {
    return elt.style;
  }}

});

utils.expose(require('d3java/js/domino/WindowTimers'), Window);
utils.expose(require('d3java/js/domino/impl'), Window);
