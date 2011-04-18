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
 * Constructs a new document with the given mathml.
 * 
 * @class The Document is an interface that provides text for the editor. Applications may
 * implement the Document interface to provide a custom store for the editor content.
 * This is the default implementation.
 * @name aries.Document
 * @return {undefined}
 */
aries.Document = (function() {
	
	/**
	 * @private
	 * @return {undefined}
	 */
	function Document()
	{
		
	}
	
	Document.prototype = {
		hasContent:function()
		{
			return false;
		}
			
	};//end prototype
	
	return Document;
}());