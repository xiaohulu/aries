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
					ok(browser.supportMathEditor(), "Browser " + parts[0]
							+ " version " + parts[1]
							+ " should support LoveMath Editor");
				} else if (parts[2] == "false") {
					ok(browser.supportMathEditor(), "Browser " + parts[0]
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
	expect(1);
	
	var mockWindow = new aries.MockWindow();
	
	var editor = new aries.Editor();
	var clientDiv = document.createElement(aries.HTML5.DIV);
	clientDiv.id = "divId";
	document.body.appendChild(clientDiv);
	
	$.get("../../main/resources/notsupport.html",
		function(data) {
		
			editor.renderTo("divId");
			same(data, clientDiv.innerHTML,
					"if browser not support LoveMath,should show the not support html");
			
		});

	/*
	editor.setBrowserSupport(true);
	editor.renderTo("divId");
	ok(clientDiv.firstChild.TagName.toUppercase() == aries.HTML5.CANVAS,
			"if browser support LoveMath, should render a canvas");
			*/
	
	mockWindow.reset();
	start();
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
