/*******************************************************************************
 * LoveMath - A MathML3.0 editor and render
 * 
 * Copyright  (c) 2011 Zhengwei Jin  All rights reserved.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 ******************************************************************************/

/**
 * @fileOverview canvas.js
 * @author <a href="mailto:zhengwei.jin@gmail.com">Zhengwei Jin</a>
 * @version 0.0.1
 */
module("canvas");
test("Browser.supportMathEditor()", testBrowserSupportMathEditor);

function testBrowserSupportMathEditor() {
	stop();
	var agent = _getAgentName();
	var version = $.browser.version;
	var browser = new aries.Browser();

	$.get('data/supportbrowsers.txt', function(data) {
		expect(1);
		var uas = data.split("\r\n");
		// expect better test...
		$.each(uas, function() {
			var parts = this.split("\t");

			if (agent == parts[0] && version == parts[1]) {
				if (parts[2] == "true") {
					ok(browser.isSupport(), "Browser " + parts[0]
							+ " version " + parts[1]
							+ " should support LoveMath Editor");
				} else if (parts[2] == "false") {
					ok(browser.isSupport(), "Browser " + parts[0]
							+ " version " + parts[1]
							+ " not support LoveMath Editor");
				}
			}
		});
		start();
	});
}

test("Editor.renderTo()", testEditorRenderTo);

function testEditorRenderTo() {
	
	stop();
	expect(5);
	
	var clientDiv = document.createElement(aries.HTML5.DIV);
	//if the dom el append to the document.body, the div name must be start with the file name
	clientDiv.id = "canvas_divId";
	document.body.appendChild(clientDiv);
	
	var createElementFunction = new aries.CreateElementFunction();
	
	
	createElementFunction.enableCreateElements([aries.HTML5.CANVAS]);
	var editor1 = new aries.Editor();
	editor1.renderTo("canvas_divId");
	ok(clientDiv.firstChild.tagName.toUpperCase() == aries.HTML5.CANVAS,
			"if browser support LoveMath, should render a canvas");
	//ok(editor1.getCaret().getX() == 0, "the caret.getX() should be 0");
	//ok(editor1.getCaret().getY() == 0, "the caret.getY() should be 0");
	ok(editor1.isReadOnly() == false,"if browser support LoveMath, the editor should be eiditable");
			
	clientDiv.innerHTML = "";		
	createElementFunction.disableCreateElements([aries.HTML5.CANVAS]);
	
	$.get("../../main/resources/notsupport.html",
		function(data) {
			var editor2 = new aries.Editor();
			editor2.renderTo("canvas_divId");
			ok(clientDiv.firstChild==null || clientDiv.firstChild.tagName.toUpperCase() != aries.HTML5.CANVAS,
			"if browser not support LoveMath,should show the not support html");
			ok(editor2.getCaret() == null,"if browser not support LoveMath, the editor should has not cursor");
			ok(editor2.isReadOnly(),"if browser not support LoveMath, the editor should be read only");
			createElementFunction.reset();
			start();
		});
}

function _getAgentName() {
	var agent = "";
	if ($.browser.msie) {
		agent = "msie";
	} else if ($.browser.mozilla) {
		agent = "mozilla";
	} else if ($.browser.opera) {
		agent = "opera";
	} else if ($.browser.webkit) {
		agent = "webkit";
	}
	return agent;
}
