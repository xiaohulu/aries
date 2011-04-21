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
		this._canvas = new aries.Canvas();
	}
	
	Editor.prototype = /** @lends aries.Editor.prototype */
	{
		/**
		 * Get document
		 */
		getDocument : function() {
			/**
			 * @author Administrator
			 * @return {aries.Document}
			 */
			return this._document;
		},
		
		/**
		 * Get the canvas in which to draw the math elements
		 * @public 
		 * @return {aries.Canvas} 
		 */
		getCanvas : function()
		{
			return this._canvas;
		},
		
		/**
		 * @param {String} clientId the container id, in which the math is painted
		 * @return {undefined}
		 */
		renderTo : function(clientId)
		{
			
		}
		
		
	};// end prototype
	

	/**
	 * @return
	 */
	return Editor;
}());