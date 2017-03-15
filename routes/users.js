var FormatCheck = require('../modules/format_check');
var express = require('express');
var crypto = require('crypto');
var User = require('../models/SM_User');
var Utils = require('../modules/utils');


var router = express.Router();

router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.all('/reg',checkNotLogin);

router.get('/reg',function(req, res) {
	res.render('reg',{ title : '用户注册' });
});

router.post('/reg',function(req, res) {
	if (Utils.isNull(req.body.name) 
		|| Utils.isNull(req.body.mobile) 
		|| Utils.isNull(req.body.verifycode) 
		|| Utils.isNull(req.body.password) 
		|| Utils.isNull(req.body.password_repeat)){
		req.flash('error','信息填写不完整');
		return res.redirect('/users/reg');
	}
	if(!FormatCheck.nickname(req.body.name)){
		req.flash('error','用户名必须是字母或数字组合');
		return res.redirect('/users/reg');
	}
	if(!FormatCheck.mobile(req.body.mobile)){
		req.flash('error','错误的手机号');
		return res.redirect('/users/reg');
	}

	if (!req.session.verifycode && req.session.verifycode.mobile == req.body.mobile 
		&& req.session.verifycode.verifycode == req.body.verifycode) {

		req.flash('error','验证码错误');
		return res.redirect('/users/reg');
	}

	if(!FormatCheck.password(req.body.password)){
		req.flash('error','密码必须是字母、数字、符合的组合');
		return res.redirect('/users/reg');
	}

	if (req.body.password_repeat != req.body.password) {
		req.flash('error','2次输入密码不一致');
		return res.redirect('/users/reg');
	}

	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var user = {
		name : req.body.name,
		mobile:req.body.mobile,
		password : password
	};
	User.build(user).save().then(function (user){
		return setLoginSessionAndCookie(req,res,user);
	}).catch(function (error){
		req.flash('error','注册失败，服务器错误，请稍后重试.');
		return res.redirect('/users/reg');
	});
});

//Login
router.all('/login',checkNotLogin);

router.get('/login',function(req, res) {
	res.render('login',{ title : '用户登录' });
});

router.post('/login',function(req, res) {
	var mobile = req.body.mobile;
	var password = req.body.password;
	if (Utils.isNull(mobile) 
		|| Utils.isNull(password)){
		req.flash('error','请输入正确的帐号密码');
		return res.redirect('/users/login');
	}
	if(!FormatCheck.mobile(mobile)){
		req.flash('error','错误的手机号');
		return res.redirect('/users/login');
	}
	if(!FormatCheck.password(password)){
		req.flash('error','密码必须是6位以上字母、数字、符合的组合');
		return res.redirect('/users/login');
	}
	var md5 = crypto.createHash('md5');
	var enpassword = md5.update(password).digest('base64');
	User.findOne({
		where:{
			mobile:mobile
		}
	}).then(function (user){
		console.log('login:' + user.mobile + ','  + user.id);
		if (user) {
			if(user.password != enpassword) {
				req.flash('error','密码错误');
				return res.redirect('/users/login');
			} else {
				console.log('login success......');
				return setLoginSessionAndCookie(req,res,user);
			}
		} else{
			req.flash('error','该手机号未注册');
			return res.redirect('/users/login');
		}
	}).catch(function (error){
		console.log('login error :' + error);
		req.flash('error','登录失败，服务器错误，请稍后重试.');
		return res.redirect('/users/login');
	});
});

//Logout
router.get('/logout',function(req, res, next) {
	console.log(req.cookies);
	logoutClear(req,res);
	return res.redirect('/');
});

//private function
function checkLogin (req, res, next) {
	if(!req.session.user) {
		req.flash('error','未登入');
		return res.redirect('/users/login');
	}
	next();
}

function checkNotLogin(req, res, next) {
	if (req.session.user) {
		return res.redirect('/');
	}
	next();
}
function logoutClear(req,res){
	req.session.user = null;

	// res.clearCookie('userIsLogined', { path: '/user' });
	// res.clearCookie('userId', { path: '/user' });
	// res.clearCookie('userMobile', { path: '/user' });
	
	res.clearCookie('user',{path:'/user'});
}

function setLoginSessionAndCookie(req,res,user){
	console.log(req.cookies);
	var tmp = {id:user.id,mobile:user.mobile};
	req.session.user = tmp;

	//Just for unimportant page,user center will check premission by router
	// res.cookie('userIsLogined',true,{ path: '/user'});
	// res.cookie('userId',user.id,{ path: '/user'});
	// res.cookie('userMobile',user.mobile,{ path: '/user'});
	res.cookie('user',user.id,{path:'/user'});
	return res.redirect('/');
}


module.exports = router;
