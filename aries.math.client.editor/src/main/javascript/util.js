/*******************************************************************************
 * LoveMath - A MathML3.0 editor and render
 * 
 * Copyright  (c) 2011 Zhengwei Jin  All rights reserved.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 ******************************************************************************/

/**
 * @fileOverview util.js
 * @author <a href="mailto:zhengwei.jin@gmail.com">Zhengwei Jin</a>
 * @version 0.0.1
 */

/**
 * @namespace The global container for aries APIS
 */
var aries = aries || {};
aries.HTML5 = {
	"CANVAS" : "CANVAS",
	"DIV" : "DIV"
};



/**
 * 
 */
aries.CreateElementFunction = (function() {
	function CreateElementFunction() {
		document.originCreateElement = document.createElement;
	}

	CreateElementFunction.prototype = {
		disableCreateElements : function(tagNames) {
			document.createElement = function(tagName) {
				if ($.inArray(tagName, tagNames) > -1) {
					return null;
				} else {
					return document.originCreateElement(tagName);
				}
			};
		},

		enableCreateElements : function(tagNames) {
			document.createElement = function(tagName) {
				if ($.inArray(tagName, tagNames) > -1) {
					try {
						return this.originCreateElement(tagName);
					} catch (e) {
						alert("should mock");
					}
				} else {
					return document.originCreateElement(tagName);
				}

			};
		},
		
		reset:function()
		{
			document.createElement = document.originCreateElement;
		}
	};

	return CreateElementFunction;
}());



function bindUtil(func, o) {
	return function() {
		func.apply(o, arguments);
	};
}