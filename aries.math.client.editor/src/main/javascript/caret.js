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

/**
 * @class describe the caret, this object must be page unique.
 *        这是一个在网页中全局唯一的对象，如果光标从一个editor切换到了另外一个editor，应该只是修改caret的x和y的值，
 *        而不要将之前的caret对象销毁，然后重新构建一个新的caret对象。 如果页面没有caret则构建一个新的caret对象
 *        如果页面中没有任何可以编辑的editor，则销毁caret
 */
aries.Caret = (function() {
	function Caret() {
		this._x = 0;
		this._y = 0;
		this._height = 17;
		this._width = 1;
		this._color = "black";
		this._el = null;
		this._interval = 500;// ms
		this._init();
		this._show = false;
		this._toggleId = null;
	}

	Caret.prototype = {
		activate : function() {
			this._toggle();// immediately
			setInterval(bindUtil(this._toggle,this), this._interval);
		},

		pointAt : function() {

		},

		dispose : function() {

			this._show = false;
		},

		getColor : function() {
			return this._color;
		},
		setColor : function(color) {
			this._color = color;
		},
		getX : function() {
			return this._x;
		},
		setX : function(x) {
			this._x = x;
		},
		getY : function() {
			return this._y;
		},
		setY : function(y) {
			this._y = y;
		},
		getHeight : function() {
			return this._height;
		},
		setHeight : function(height) {
			this._height = height;
		},
		getWidth : function() {
			return this._width;
		},
		setWidth : function(width) {
			this._width = width;
		},
		getEl : function() {
			return this._el;
		},
		_init : function() {
			var tmp = document.createElement(aries.HTML5.DIV);
			tmp.style.backgroundColor = this.getColor();
			tmp.style.position = "absolute";
			tmp.style.height = this.getHeight() + "px";
			tmp.style.width = this.getWidth() + "px";
			tmp.style.display = "none";
			this._el = tmp;
			this._show = false;
		},
		_toggle : function() {
			this._show = !this._show;
			if (this._show) {
				this._el.style.display = "";
			} else {
				this._el.style.display = "none";
			}
		}

	}; // end of prototype

	return Caret;
}());
