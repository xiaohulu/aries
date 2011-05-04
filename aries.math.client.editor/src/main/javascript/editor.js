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
		this._model = new aries.Model();
		this._canvas = new aries.Canvas();
		
		this._browser = new aries.Browser();
		this._caret = null;
		this._readOnly = true;
	}
	
	Editor.prototype = /** @lends aries.Editor.prototype */
	{
		/**
		 * Get model
		 */
		getModel : function() {
			/**
			 * @author Administrator
			 * @return {aries.Document}
			 */
			return this._model;
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
		
		getCaret : function()
		{
			return this._caret;
		},
		
		isReadOnly: function()
		{
			return this._readOnly;
		},
		
		/**
		 * @param {String} clientId the container id, in which the math is painted
		 * @return {undefined}
		 */
		renderTo : function(clientId)
		{
			var clientDiv = document.getElementById(clientId);
			if(this._browser.isSupport())
			{
				this._readOnly = false;
				this._caret = new aries.Caret();
				var canvasEl = this._canvas.getCanvasEl();
				clientDiv.appendChild(canvasEl);
				
			}
			else
			{
				// TODO: should show indicator if asyn
				$.get("../resources/notsupport.html",function(data){
					clientDiv.innerHTML = data;
				});
			}
		}
		
		
	};// end prototype
	

	/**
	 * @return
	 */
	return Editor;
}());