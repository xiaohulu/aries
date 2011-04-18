/*******************************************************************************
 * LoveMath - A MathML3.0 editor and render
 * 
 * Copyright  (c) 2011 Zhengwei Jin  All rights reserved.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 ******************************************************************************/

/**
 * @fileOverview editor.js
 * @author <a href="mailto:zhengwei.jin@gmail.com">Zhengwei Jin</a>
 * @version 0.0.1
 */

/**
 * @namespace The global container for aries APIS
 */
var aries = aries || {};

/**
 * Constructs a new editor.
 * 
 * @class A Editor is a user interface for editing mathematical formula
 * @name aries.Editor
 * @return {undefined}
 */
aries.Editor = (function() {

	/**
	 * @private
	 * @return {undefined}
	 */
	function Editor() {
		this._document = new aries.Document();
	}
	
	Editor.prototype = /** @lends aries.Editor.prototype */
	{
		/**
		 * Get document
		 * 
		 * @parms a
		 * @returns a
		 */
		getDocument : function() {
			/**
			 * @author Administrator
			 */
			return this._document;
		}
	};// end prototype
	

	/**
	 * @return
	 */
	return Editor;
}());