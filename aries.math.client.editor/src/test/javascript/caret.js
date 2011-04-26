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

test("new aries.Caret()",function(){
	expect(10);
	var caret = new aries.Caret();
	equal(0, caret.getX(), "caret.getX() == 0");
	equal(0, caret.getY(), "caret.getY() == 0");
	equal("black", caret.getColor(),"caret.getColor() == black");
	equal(1, caret.getWidth(),"caret.getWidth() == 1");
	equal(17,caret.getHeight(),"caret.getHeight() == 17");
	
	var el = caret.getEl();
	equal("DIV", el.tagName.toUpperCase(),"the caret object is the div");
	
	equal(caret.getColor(), el.style.backgroundColor,"caret.getColor() == el.style.backgroundColor");
	equal(caret.getWidth()+"px", el.style.width,"caret.getWidth() == el.style.width");
	equal(caret.getHeight()+"px", el.style.height,"caret.getHeight() == el.style.height");
	equal("absolute", el.style.position,"absolute == el.style.position");
});
