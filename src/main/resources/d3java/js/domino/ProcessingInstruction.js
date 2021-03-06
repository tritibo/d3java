"use strict";
module.exports = ProcessingInstruction;

var Node = require('d3java/js/domino/Node');
var CharacterData = require('d3java/js/domino/CharacterData');

function ProcessingInstruction(doc, target, data) {
  CharacterData.call(this);
  this.nodeType = Node.PROCESSING_INSTRUCTION_NODE;
  this.ownerDocument = doc;
  this.target = target;
  this._data = data;
}

var nodeValue = {
  get: function() { return this._data; },
  set: function(v) {
    this._data = v;
    if (this.rooted) this.ownerDocument.mutateValue(this);
  }
};

ProcessingInstruction.prototype = Object.create(CharacterData.prototype, {
  nodeName: { get: function() { return this.target; }},
  nodeValue: nodeValue,
  textContent: nodeValue,
  data: nodeValue,

  // Utility methods
  clone: { value: function clone() {
      return new ProcessingInstruction(this.ownerDocument, this.target, this._data);
  }},
  isEqual: { value: function isEqual(n) {
      return this.target === n.target && this._data === n._data;
  }}

});
