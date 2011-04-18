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

test("new aries.Editor()",
 function () {
 	expect(1);
 	var editor = new aries.Editor();
 	ok(!editor.getDocument().hasContent(), "when constructs pass none params, editor's document has not content");
 }
);

 //TODO: 需要加一个config参数