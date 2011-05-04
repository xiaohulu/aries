/*******************************************************************************
 * LoveMath - A MathML3.0 editor and render
 * 
 * Copyright  (c) 2011 Zhengwei Jin  All rights reserved.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 ******************************************************************************/

/**
 * @fileOverview document.js
 * @author <a href="mailto:zhengwei.jin@gmail.com">Zhengwei Jin</a>
 * @version 0.0.1
 */
 module("model");
 
 test("set text",function(){
	var model = new aries.Model();
	// 对于mi标签只需要注意一点，就是字体，分为italic和normal。这就是mi的全部
	model.setText("a");
	var actual = _getMiNodeText(model,0);
	equal(actual,"a","the element value is a");
	
	model.setText("A");
	var actual = _getMiNodeText(model,1);
	equal(actual,"A","the element value is A");
	
	model.setText("0");
	actual = _getMiNodeText(model,2);
	equal(actual,"0","the element value is 0");
	
	model.setText("+");
	actual = _getMoNodeText(model, 0);//第一个mo节点
	equal(actual,"+","the element value is +");
	
	model.setText("-");
	actual = _getMoNodeText(model, 1);
	equal(actual,"-","the element value is -");
	
	model.setText("&#215;");// 乘
	actual = _getMoNodeText(model, 2);
	equal(actual,"&#215;","the element value is &#215;  ×");
	
	model.setText("&#247;");// 除
	actual = _getMoNodeText(model, 3);
	equal(actual,"&#247;","the element value is &#247;  ÷");
	
	model.setText("=");
	actual = _getMoNodeText(model, 4);
	equal(actual,"=","the element value is =");
 });
 
 
 function _getMiNodeText(model,index)
 {
 	return _getNodeText("mi",model,index);
 }
 
 function _getMoNodeText(model, index)
 {
 	return _getNodeText("mo",model,index);
 }
 
 function _getNodeText(nodeName,model, index)
 {
 	var doc = model.getDocument();
	var miNodes = doc.getElementsByTagName(nodeName);
	var miNode = miNodes[index];
	return miNode.firstChild.nodeValue;
 }