"use strict";
module.exports = DocumentType;

var Node = require('d3java/js/domino/Node');
var Leaf = require('d3java/js/domino/Leaf');
var utils = require('d3java/js/domino/utils');
var ChildNode = require('d3java/js/domino/ChildNode');

function DocumentType(name, publicId, systemId) {
  Leaf.call(this);
  // Unlike other nodes, doctype nodes always start off unowned
  // until inserted
  this.nodeType = Node.DOCUMENT_TYPE_NODE;
  this.ownerDocument = null;
  this.name = name;
  this.publicId = publicId || "";
  this.systemId = systemId || "";
}

DocumentType.prototype = Object.create(Leaf.prototype, {
  nodeName: { get: function() { return this.name; }},
  nodeValue: {
    get: function() { return null; },
    set: function() {}
  },

  // Utility methods
  clone: { value: function clone() {
    utils.DataCloneError();
  }},

  isEqual: { value: function isEqual(n) {
    return this.name === n.name &&
      this.publicId === n.publicId &&
      this.systemId === n.systemId;
  }}
});

Object.defineProperties(DocumentType.prototype, ChildNode);
