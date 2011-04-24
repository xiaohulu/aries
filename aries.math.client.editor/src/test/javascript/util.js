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

test("override createElement()",function(){
var aaa = document.createElement("a");
	var createElement = new aries.CreateElementFunction();
	expect(2);
	var tagNames = ["DIV"];
	createElement.disableCreateElements(tagNames);
aaa = document.createElement("a");
	var div = document.createElement(aries.HTML5.DIV);
	ok(div == null, "should not create div");
	
	createElement.enableCreateElements(tagNames);
	div = document.createElement(aries.HTML5.DIV);	
	ok(div != null, "should create div now");
	createElement.reset();
});
