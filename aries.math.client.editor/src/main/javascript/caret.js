/*******************************************************************************
 * LoveMath - A MathML3.0 editor and render
 * 
 * Copyright  (c) 2011 Zhengwei Jin  All rights reserved.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 ******************************************************************************/

/**
 * @fileOverview caret.js
 * @author <a href="mailto:zhengwei.jin@gmail.com">Zhengwei Jin</a>
 * @version 0.0.1
 */

/**
 * @namespace The global container for aries APIS
 */
var aries = aries || {};

aries.Caret = (function() {
	function Caret() {
		this._x = 0;
		this._y= 0;
		this._height = 17;
		this._width = 1;
		this._color = "black";
		this._el = null;
		
		this._init();
	}

	Caret.prototype = {
		getColor : function() {
			return this._color;
		},
		setColor : function(color) {
			this._color = color;
		},
		getX:function(){
			return this._x;
		},
		setX:function(x)
		{
			this._x = x;
		},
		getY:function(){
			return this._y;
		},
		setY:function(y){
			this._y = y;
		},
		getHeight:function(){
			return this._height;
		},
		setHeight:function(height)
		{
			this._height = height;
		},
		getWidth:function(){
			return this._width;
		},
		setWidth : function(width) {
			this._width = width;
		},
		getEl:function()
		{
			return this._el;
		},
		_init:function()
		{
			var tmp = document.createElement(aries.HTML5.DIV);
			tmp.style.backgroundColor = this.getColor();
			tmp.style.position = "absolute";
			tmp.style.height = this.getHeight()+"px";
			tmp.style.width = this.getWidth() +"px";
			this._el = tmp;
		}
		
	}; // end of prototype

	return Caret;
}());
