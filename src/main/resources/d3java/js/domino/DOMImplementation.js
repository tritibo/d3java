"use strict";
module.exports = DOMImplementation;

var Document = require('d3java/js/domino/Document');
var DocumentType = require('d3java/js/domino/DocumentType');
var HTMLParser = require('d3java/js/domino/HTMLParser');
var utils = require('d3java/js/domino/utils');
var xml = require('d3java/js/domino/xmlnames');

// Each document must have its own instance of the domimplementation object
// Even though these objects have no state
function DOMImplementation() {}


// Feature/version pairs that DOMImplementation.hasFeature() returns
// true for.  It returns false for anything else.
var supportedFeatures = {
  'xml': { '': true, '1.0': true, '2.0': true },   // DOM Core
  'core': { '': true, '2.0': true },               // DOM Core
  'html': { '': true, '1.0': true, '2.0': true} ,  // HTML
  'xhtml': { '': true, '1.0': true, '2.0': true} , // HTML
};

DOMImplementation.prototype = {
  hasFeature: function hasFeature(feature, version) {
    var f = supportedFeatures[(feature || '').toLowerCase()];
    return (f && f[version || '']) || false;
  },

  createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {
    if (!xml.isValidName(qualifiedName)) utils.InvalidCharacterError();
    if (!xml.isValidQName(qualifiedName)) utils.NamespaceError();

    var document = new DocumentType(qualifiedName, publicId, systemId);
    document.implementation = this;
    return document;
  },

  createDocument: function createDocument(namespace, qualifiedName, doctype) {
    //
    // Note that the current DOMCore spec makes it impossible to
    // create an HTML document with this function, even if the
    // namespace and doctype are propertly set.  See this thread:
    // http://lists.w3.org/Archives/Public/www-dom/2011AprJun/0132.html
    //
    var d = new Document(false, null);
    var e;

    if (qualifiedName)
      e = d.createElementNS(namespace, qualifiedName);
    else
      e = null;

    if (doctype) {
      if (doctype.ownerDocument) utils.WrongDocumentError();
      d.appendChild(doctype);
    }

    if (e) d.appendChild(e);

    return d;
  },

  createHTMLDocument: function createHTMLDocument(titleText) {
    var d = new Document(true, null);
    d.appendChild(new DocumentType('html'));
    var html = d.createElement('html');
    d.appendChild(html);
    var head = d.createElement('head');
    html.appendChild(head);
    var title = d.createElement('title');
    head.appendChild(title);
    title.appendChild(d.createTextNode(titleText));
    html.appendChild(d.createElement('body'));
    d.modclock = 1; // Start tracking modifications
    return d;
  },

  mozSetOutputMutationHandler: function(doc, handler) {
    doc.mutationHandler = handler;
  },

  mozGetInputMutationHandler: function(doc) {
    utils.nyi();
  },

  mozHTMLParser: HTMLParser,
};
