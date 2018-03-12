"use strict";
module.exports = CustomEvent;

var Event = require('d3java/js/domino/Event');

function CustomEvent(type, dictionary) {
  // Just use the superclass constructor to initialize
  Event.call(this, type, dictionary);
}
CustomEvent.prototype = Object.create(Event.prototype, {
  constructor: { value: CustomEvent }
});
