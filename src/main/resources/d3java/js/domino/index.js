"use strict";
var DOMImplementation = require('d3java/js/domino/DOMImplementation');
var HTMLParser = require('d3java/js/domino/HTMLParser');
var Window = require('d3java/js/domino/Window');

exports.createDOMImplementation = function() {
  return new DOMImplementation();
};

exports.createDocument = function(html, force) {
  // Previous API couldn't let you pass '' as a document, and that
  // yields a slightly different document than createHTMLDocument('')
  // does.  The new `force` parameter lets you pass '' if you want to.
  if (html || force) {
    var parser = new HTMLParser();
    parser.parse(html || '', true);
    return parser.document();
  }
  return new DOMImplementation().createHTMLDocument("");
};

exports.createWindow = function(html, address) {
  var document = exports.createDocument(html);
  if (address !== undefined) { document._address = address; }
  return new Window(document);
};

exports.impl = require('d3java/js/domino/impl');