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
 * Constructs a new key binding with the given key code and modifiers.
 * 
 * @param {String|Number} keyCode the key code.
 * @param {Boolean} mod1 the primary modifier (usually Command on Mac and Control on other platforms).
 * @param {Boolean} mod2 the secondary modifier (usually Shift).
 * @param {Boolean} mod3 the third modifier (usually Alt).
 * @param {Boolean} mod4 the fourth modifier (usually Control on the Mac).
 * 
 * @class A KeyBinding represents of a key code and a modifier state that can be triggered by the user using the keyboard.
 * @name eclipse.KeyBinding
 * 
 * @property {String|Number} keyCode The key code.
 * @property {Boolean} mod1 The primary modifier (usually Command on Mac and Control on other platforms).
 * @property {Boolean} mod2 The secondary modifier (usually Shift).
 * @property {Boolean} mod3 The third modifier (usually Alt).
 * @property {Boolean} mod4 The fourth modifier (usually Control on the Mac).
 *
 * @see eclipse.Editor#setKeyBinding
 */
aries.KeyBinding = (function() {
	var isMac = navigator.platform.indexOf("Mac") !== -1;
	/** @private */
	function KeyBinding (keyCode, mod1, mod2, mod3, mod4) {
		if (typeof(keyCode) === "string") {
			this.keyCode = keyCode.toUpperCase().charCodeAt(0);
		} else {
			this.keyCode = keyCode;
		}
		this.mod1 = mod1 !== undefined && mod1 !== null ? mod1 : false;
		this.mod2 = mod2 !== undefined && mod2 !== null ? mod2 : false;
		this.mod3 = mod3 !== undefined && mod3 !== null ? mod3 : false;
		this.mod4 = mod4 !== undefined && mod4 !== null ? mod4 : false;
	}
	KeyBinding.prototype = /** @lends eclipse.KeyBinding.prototype */ {
		/**
		 * Returns whether this key binding matches the given key event.
		 * 
		 * @param e the key event.
		 * @returns {Boolean} <code>true</code> whether the key binding matches the key event.
		 */
		match: function (e) {
			if (this.keyCode === e.keyCode) {
				var mod1 = isMac ? e.metaKey : e.ctrlKey;
				if (this.mod1 !== mod1) { return false; }
				if (this.mod2 !== e.shiftKey) { return false; }
				if (this.mod3 !== e.altKey) { return false; }
				if (isMac && this.mod4 !== e.ctrlKey) { return false; }
				return true;
			}
			return false;
		},
		/**
		 * Returns whether this key binding is the same as the given parameter.
		 * 
		 * @param {eclipse.KeyBinding} kb the key binding to compare with.
		 * @returns {Boolean} whether or not the parameter and the receiver describe the same key binding.
		 */
		equals: function(kb) {
			if (!kb) { return false; }
			if (this.keyCode !== kb.keyCode) { return false; }
			if (this.mod1 !== kb.mod1) { return false; }
			if (this.mod2 !== kb.mod2) { return false; }
			if (this.mod3 !== kb.mod3) { return false; }
			if (this.mod4 !== kb.mod4) { return false; }
			return true;
		} 
	};
	return KeyBinding;
}());



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
	function Editor(borderWidth) {
		// TODO:在初始化编辑器时检测是否支持编辑器
		this._model = new aries.Model();
		this._canvas = new aries.Canvas(borderWidth);
		
		this._browser = new aries.Browser();
		this._caret = null;
		this._readOnly = true;
		
		this._borderWidth = 0;
		
		$(document.body).bind("mousedown", bindUtil(this._handleBodyMouseDown,this));
		$(document.body).bind("keydown", bindUtil(this._handleBodyKeyDown,this));
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
		setModel : function(model)
		{
			this._model = model;
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
		
		paint : function()
		{
			
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
				var canvasEl = this._canvas.getCanvasEl();
				this._caret = new aries.Caret(this._canvas);
				clientDiv.appendChild(canvasEl);
				
				
			}
			else
			{
				// TODO: should show indicator if asyn
				$.get("../resources/notsupport.html",function(data){
					clientDiv.innerHTML = data;
				});
			}
		},
		
		_handleBodyMouseDown:function(e)
		{
			if(e.target != this._canvas.getCanvasEl())
			return;
			// 如果光标没有显示，则激活光标
			if(this._caret && this._caret.isActived()==false)
			{
				this._caret.activate(e.clientX,e.clientY);
			}
			else
			{
				// 如果光标已经显示，则判断光标的当前位置与缓存的位置
				// 插入符的有效位置不是根据光标的位置来计算，而是根据内容的多少进行计算
				if(e.clientX != this._caret.getX() || e.clientY != this._caret.getY())
				{
					// 如果位置不同，则调整光标位置
					this._caret.pointAt(e.clientX,e.clientY);
				}
				else
				{
					// 如果位置相同，则不做处理
				}
			}
		},
		_handleBodyKeyDown:function(e)
		{
			// TODO：先往dom中添加字符
			
			// TODO：将dom中的元素重新绘制一遍
			
		}
	};// end prototype
	

	/**
	 * @return
	 */
	return Editor;
}());