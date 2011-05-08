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
 * @param {Object}
 *            canvasEl 光标在canvasEl上显示，必输
 * @class describe the caret, this object must be page unique.
 *        这是一个在网页中全局唯一的对象，如果光标从一个editor切换到了另外一个editor，应该只是修改caret的x和y的值，
 *        而不要将之前的caret对象销毁，然后重新构建一个新的caret对象。 如果页面没有caret则构建一个新的caret对象
 *        如果页面中没有任何可以编辑的editor，则销毁caret
 */
aries.Caret = (function() {
	function Caret(canvas) {
		this._canvas = canvas;// parent
		this._canvasEl = canvas.getCanvasEl();
		
		
		this._height = 17;
		this._width = 1;
		this._color = "black";
		this._el = null;
		this._interval = 500;// ms
		this._init();
		this._show = false;
		this._toggleId = null;
		this._actived = false;
		
	}

	Caret.prototype = {
		activate : function(x,y) {
			// TODO:如果初始化时，已经有数学公式存在，则将光标放到最后。
			//var _offset = $(this._canvasEl).offset();
			this._x =x; //_offset.top+this._canvas.getBorderWidth()+0+this._canvas.getMarginLeft();// 相对canvasEl左上角的left
			this._y = y;//_offset.left+this._canvas.getBorderWidth()+0+this._canvas.getMarginLeft();// 相对canvasEl左上角的top
			
			this._setPosition();
			this._immediateThenRepeat();
		},

		pointAt : function(x, y) {
			this._x = x;
			this._y = y;
			this._setPosition();
			clearInterval(this._toggleId);
			this._actived = false;
			this._show = false;

			this._immediateThenRepeat();
		},

		dispose : function() {
			clearInterval(this._toggleId);
			this._el.parentNode.removeChild(this._el);
			this._el = null;
			this._canvasEl = null;
			this._show = false;
			this._actived = false;
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
		getCanvasEl : function() {
			return this._canvasEl;
		},
		isActived:function()
		{
			return this._actived;
		},
		_init : function() {
			var tmp = document.createElement(aries.HTML5.DIV);
			document.body.appendChild(tmp);
			tmp.style.backgroundColor = this.getColor();
			tmp.style.position = "absolute";
			tmp.style.height = this.getHeight() + "px";
			tmp.style.width = this.getWidth() + "px";
			tmp.style.display = "none";
			tmp.style.zIndex = 1;
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
		},
		_immediateThenRepeat : function() {
			// 1, show immediately
			this._toggle();
			// 2, repeat per 500ms
			if(this._actived==false)
			{
			this._toggleId = setInterval(bindUtil(this._toggle, this),
					this._interval);
			this._actived = true;
			}

		},
		_setPosition : function() {
			
			var $el = $(this._el);
			$el.css({
				"top" : this._y,
				"left" :this._x
			});
		}

	}; // end of prototype

	return Caret;
}());
