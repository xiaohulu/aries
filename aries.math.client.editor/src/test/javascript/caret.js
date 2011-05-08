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
module("caret");
test("new aries.Caret()", function() {
	expect(10);
	var canvas = new aries.Canvas();
	var caret = new aries.Caret(canvas);
	equal(caret.getX(), 0, "caret.getX() == 0");
	equal(caret.getY(), 0, "caret.getY() == 0");
	equal(caret.getColor(), "black", "caret.getColor() == black");
	equal(caret.getWidth(), 1, "caret.getWidth() == 1");
	equal(caret.getHeight(), 17, "caret.getHeight() == 17");

	var el = caret.getEl();
	equal(el.tagName.toUpperCase(), "DIV", "the caret object is the div");

	ok(el.style.backgroundColor == caret.getColor()
			|| el.style.backgroundColor == "#000000",
			"caret.getColor() == el.style.backgroundColor");
	equal(el.style.width, caret.getWidth() + "px",
			"caret.getWidth() == el.style.width");
	equal(el.style.height, caret.getHeight() + "px",
			"caret.getHeight() == el.style.height");
	equal(el.style.position, "absolute", "absolute == el.style.position");
});

/*
 * 这是一个在网页中全局唯一的对象，如果光标从一个editor切换到了另外一个editor，应该只是修改caret的x和y的值，
 * 而不要将之前的caret对象销毁，然后重新构建一个新的caret对象。 如果页面没有caret则构建一个新的caret对象
 * 如果页面中没有任何可以编辑的editor，则销毁caret
 * 
 * caret有两个触发动作，开始和跳转，其实可以归为一个动作 分为 激活（activate）、重新定位(point at)和销毁（dispose）
 */
test("caret activate", function() {

	var canvas = new aries.Canvas();
	var caret = new aries.Caret(canvas);
	ok(caret.getEl().style.display == "none", "not show caret");
	stop();
	caret.activate();// should caret el show immediately
	ok(caret.getEl().style.display == "", "show caret immediately");
	var count = 1;
	var show = false;
	// 250 show 1
	// 750 hide 3
	// 1250 show 5
	// 1750 hide 7
	var intervalId = setInterval(
			function() {
				if (count == 5) {
					clearInterval(intervalId);
					caret.dispose();
					
					start();
					return;
				}
				if (count % 2 == 1) {
					show = !show;
					if (show) {
						ok(caret.getEl().style.display == "", "show caret:"
								+ count);
					} else {
						ok(caret.getEl().style.display == "none", "hide caret:"
								+ count);
					}
				}
				count++;
			}, 250);
});

test("caret dispose", function() {
	expect(3);
	stop();

	var canvas = new aries.Canvas();
	var caret = new aries.Caret(canvas);
	caret.activate();
	var tmpEl = caret.getEl();
	caret.dispose();
	ok(caret.getEl()== null, "dispose() should dispose all resources for caret");
	ok(tmpEl.parentNode == null,"the caret el has been removed from document.body");
	ok(caret._show == false, "the show value should be false");

	start();
});

test("caret pointAt", function() {
	expect(3);
	stop();
	var canvas = new aries.Canvas();
	var caret = new aries.Caret(canvas);
	
	caret.activate();
	
	// after 500ms
	setTimeout(function(){
		//relative  canvas
		caret.pointAt(10,20);
		ok(caret.getEl().style.display == "", "show caret immediately");
		equal($(caret.getEl()).offset().left-$(caret.getCanvasEl()).offset().left,caret.getX(),"caret.getX() == 10");
		equal($(caret.getEl()).offset().top-$(caret.getCanvasEl()).offset().top,caret.getY(),"caret.getY() == 20");
		caret.dispose();
		
		start();
	},500);
	
	
});
