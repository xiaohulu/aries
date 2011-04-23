/*******************************************************************************
 * LoveMath - A MathML3.0 editor and render
 * 
 * Copyright  (c) 2011 Zhengwei Jin  All rights reserved.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 ******************************************************************************/

/**
 * @fileOverview mockTest.js
 * @author <a href="mailto:zhengwei.jin@gmail.com">Zhengwei Jin</a>
 * @version 0.0.1
 */

/**
 * @namespace The global container for aries APIS
 */
//var aries = aries || {};

test("mock createElement()",function(){
	expect(2);
	var mockDocument = new MockDocument();
	var tags = ["div"];
	mockDocument.disableCreateElements(tags);
	var div = mockDocument.createElement(aries.HTML5.DIV);
	ok(div = null, "should not create div");
	
	mockDocument.ensureCreateElements(tags);
	div = mockDocument.createElement(aries.HTML5.DIV);
	ok(div != null, "should create div now");
});