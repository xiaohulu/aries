/*******************************************************************************
 * LoveMath - A MathML3.0 editor and render
 * 
 * Copyright  (c) 2011 Zhengwei Jin  All rights reserved.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 ******************************************************************************/

/**
 * @fileOverview document.js
 * @author <a href="mailto:zhengwei.jin@gmail.com">Zhengwei Jin</a>
 * @version 0.0.1
 */

/**
 * @namespace The global container for aries APIS
 */
var aries = aries || {};

/**
 * Constructs a new model with the given mathml.
 * 
 * @class The Model is an interface that provides text for the editor.
 *        Applications may implement the Document interface to provide a custom
 *        store for the editor content. This is the default implementation.
 * @name aries.Document
 * @return {undefined}
 */
aries.Model = (function() {

	/**
	 * @private
	 * @return {undefined}
	 */
	function Model() {
		this._document = $
				.parseXML("<?xml version=\"1.0\" encoding=\"UTF-8\"?><math xmlns=\"http://www.w3.org/1998/Math/MathML\"></math>");
	}

	Model.prototype = {
		hasContent : function() {
			return false;
		},
		setText : function(text) {
			if (text == "&#215;")// 乘
			{
				this._appendNode("mo", text);
			} else if (text == "&#247;")// 除
			{
				this._appendNode("mo", text);
			} else if (/[0-9a-zA-Z]/.test(text)) {
				this._appendNode("mi", text);
			} else if (/[+-=]/.test(text)) {
				this._appendNode("mo", text);
			}
		},
		getDocument : function() {
			return this._document;
		},

		_appendNode : function(nodeName, text) {
			var mi = this._document.createElement(nodeName);
			var textNode = this._document.createTextNode(text);
			mi.appendChild(textNode);
			this._document.firstChild.appendChild(mi);
		}

	};// end prototype

	return Model;
}());