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
module("eidtor");
test(
		"new aries.Editor()",
		function() {
			expect(2);
			var editor = new aries.Editor();
			ok(!editor.getModel().hasContent(),
					"when constructs pass none params, editor's document has not content");
			ok(editor.getCanvas().isReady(),
					"the canvas must be prepared for painting");

			var divEl = document.createElement(aries.HTML5.DIV);
			document.body.appendChild(divEl);
			divEl.id = "divId";
			editor.renderTo("divId"); // ensure editor has this interface
		});

test("editor.paint()", function() {
	var editor = new aries.Editor();
	var model = new aries.Model();
	editor.setModel(model);
	model.setText("x");
	editor.paint();
	// 执行paint方法
});

// TODO: 需要加一个config参数

// 存放math dom的地方和显示math的地方不在一起，是两个概念
