var express = require('express');
var crypto = require('crypto');
var FormatCheck = require('../modules/format_check');
var Utils = require('../modules/utils');
var User = require('../models/SM_User');

var router = express.Router();

router.post('/reg', function(req, res, next) {
	if (!FormatCheck.mobile(req.body.mobile)){
		req.flash('error','请填写正确的手机号');
		return res.redirect('/users/reg');
	}
	User.findOne({
		where:{
			mobile:req.body.mobile
		}
	}).then(function (user){
		console.log('user:' + user);
		if (user) {
			req.flash('error','此手机号已注册');
			return res.redirect('/users/reg');
		}
		var verifycode_length = 6;
		var verifycode = Utils.randomNumber(verifycode_length);
		if(verifycode.length != verifycode_length){
			req.flash('error','验证码生成错误，请稍后重试');
			return res.redirect('/users/reg');
		}
		var verifycodeSessionValue =  {mobile:req.body.mobile,verifycode:verifycode};
		console.log('session,verifycode:' + verifycodeSessionValue.verifycode);
		req.session.verifycode = verifycodeSessionValue;
		res.sendStatus(200);
	}).catch(function (error){
		console.log('User.findOne ==> error:' + error);
		req.flash('error','验证码生成错误，请稍后重试');
		return res.redirect('/users/reg');
	});
});

module.exports = router;

