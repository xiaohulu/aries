/*******************************************************************************
 * LoveMath - A MathML3.0 editor and render
 * 
 * Copyright  (c) 2011 Zhengwei Jin  All rights reserved.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 ******************************************************************************/

/**
 * @fileOverview canvas.js
 * @author <a href="mailto:zhengwei.jin@gmail.com">Zhengwei Jin</a>
 * @version 0.0.1
 */

/**
 * @namespace The global container for aries APIS
 */
var aries = aries || {};

aries.Canvas = (function() {
	/**
	 * @private
	 */
	function Canvas(borderWidth) {
		this._ready = false;
		this._createCanvasEl(borderWidth);
		// 判断是否支持在浏览器上渲染canvas

		this._ready = true;
		this._borderWidth = borderWidth?borderWidth:0;
		this._marginLeft = 0;
	}

	Canvas.prototype = {

		isReady : function() {
			return this._ready;
		},
		getCanvasEl : function() {
			return this._canvasEl;
		},
		getBorderWidth:function()
		{
			return this._borderWidth;
		},
		getMarginLeft:function(){
			return this._marginLeft;
		},

		_createCanvasEl : function(borderWidth) {
			var browser = new aries.Browser();
			this._canvasEl = document.createElement(aries.HTML5.CANVAS);
			if(this._canvasEl)
			{
				if(borderWidth && borderWidth != 0)
				{
					this._canvasEl.style.border = borderWidth+"px solid black";
				}
				this._canvasEl.style.cursor = "text";
			}
		}

	};// end prototype

	/**
	 * @return
	 */
	return Canvas;
}());
// TODO:扩展html5的canvas，比如设置底色，背景图和花边等

aries.Browser = (function() {
	/**
	 * @private
	 */
	function Browser() {
		this._support = false;
		this._init();
	}

	Browser.prototype = {
		isSupport : function() {
			return this._support;
		},

		_init : function() {
			this._support = false;
			var tmpCanvas = document.createElement(aries.HTML5.CANVAS);
			if(tmpCanvas && tmpCanvas.getContext)
			{
				var ctx = tmpCanvas.getContext("2d");
				if(ctx.fillText)
				{
					this._support = true;
				}
			}
		}
	};// end prototype

	return Browser;
}());


