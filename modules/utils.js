var config = require('config'),
	md = require("node-markdown").Markdown,
	excerptHtml = require('excerpt-html'),
	crypto = require('crypto');


function Utils(){
}
Utils.randomNumber = function randomNumber(n){
	var rnd = "";
	for (var i = 0 ;i<n;i++){
		rnd += Math.floor(Math.random()*10);
	}
	return rnd;
}

Utils.randomString = function randomString(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

Utils.md5 = function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

//
Utils.isNull = function isNull(variable){
	return (typeof variable === 'undefined' || !variable)
}

Utils.isArray = function isArray(obj) {   
  return Object.prototype.toString.call(obj) === '[object Array]';    
}  
//
Utils.getExcerptFromMarkdown = function getExcerptFromMarkdown(md_content){
	var htmlContent = md(md_content);
	return excerptHtml(htmlContent);
}

Utils.getHtmlMarkdown = function getHtmlMarkdown(md_content){
	var htmlContent = md(md_content);
	return htmlContent;
}

Utils.generateRedirectUrl = function generateRedirectUrl(originalUrl){
	var url = '/redirect/'+ Utils.md5(originalUrl);
	return url;
}

Utils.serverAddress = function serverAddress(){
	return "http://study1234.com";
}

module.exports = Utils;