/*******************************************************************************
 * LoveMath - A MathML3.0 editor and render
 * 
 * Copyright  (c) 2011 Zhengwei Jin  All rights reserved.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 ******************************************************************************/

/**
 * @fileOverview mock.js
 * @author <a href="mailto:zhengwei.jin@gmail.com">Zhengwei Jin</a>
 * @version 0.0.1
 */

/**
 * @namespace The global container for aries APIS
 */
var aries = aries || {};

aries.MockWindow = (function() {
	function MockWindow() {
		window.realWindow = window;
		window.document = new aries.MockDocument();
	}

	MockWindow.prototype = {
		reset : function() {
			window = window.realWindow;
		}
	};

	return MockWindow;
}());

aries.MockDocument = (function() {

	function MockDocument() {
		this._window = window;
	}

	MockDocument.prototype = {
		/**
		 * 屏蔽document的某个功能。如果有某个方法，则屏蔽掉；如果没有则不处理
		 * 
		 * @param excludes
		 *            a,b etc.
		 * @returns {undefined}
		 */
		excludeForCreateElement : function(excludeTags) {
			var el = document
			document.createElement=function(tagName)
			{debugger;
				return document.createElement(tagName);
			};
		}
	
	//确保某些方法必须存在
	};

	return MockDocument;
}());

aries.MockCanvas = (function() {
	function MockCanvas() {

	}

	MockCanvas.prototype = {
		getContext : function() {
			return new aries.MockContext();
		}
	};

	return MockCanvas;
}());

aries.MockContext = (function() {
	function MockContext() {

	}

	MockContext.prototype = {
		fillText : function() {

		}
	};
	return MockContext;
}());
