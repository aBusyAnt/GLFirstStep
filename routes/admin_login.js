var express = require('express');
var crypto = require('crypto');
var AdminRole = require('../models/SM_AdminRole');
var Admin = require('../models/SM_Admin');
var config = require('config');
var Utils = require('../modules/utils');

var router = express.Router();

//Login
router.get('/',function (req,res,next){
	res.render('admin_login',{ title : '管理员登录'});
});

router.post('/',function (req, res, next) {
	console.log(req.body.name,req.body.password);
	if ( Utils.isNull(req.body.name)  || Utils.isNull(req.body.password)){
		req.flash('error','信息填写不完整');
		res.redirect('/adminlogin');
	}

	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	Admin.findOne({ where: {name : req.body.name} }).then(function (admin){
		if(!admin) {
			req.flash('error','不存在此管理员');
			return res.redirect('/adminlogin');
		}
		if (admin.password != password) {
			req.flash('error','用户密码错误');
			return res.redirect('/adminlogin');
		}
		console.log('登录成功,跳转到管理页面...');
		console.log('admin:' + admin.id + ',' + admin.name);
		req.session.admin = admin;
		return res.redirect('/admin');
	}).catch(function (error){
		console.log(error);
		req.flash('error',error);
		return res.redirect('/adminlogin');
	});
});

//Logout
router.get('/logout',function (req, res, next) {
	req.session.admin = null;
	req.flash('success','登出成功');
	res.redirect('/admin');
});

// Register admin
router.get('/reg', function (req, res) {
	AdminRole.findAndCountAll().then(function (adminRoles){
		res.render('admin_reg',{ title : '管理员注册' ,roles : adminRoles.rows });
	}).catch(function (error){
		req.flash('error',error);
		return res.redirect('/adminlogin/reg');
	});
});

router.post('/reg', function (req, res) {
	if (Utils.isNull(req.body.name) 
		|| Utils.isNull(req.body.password)
		|| Utils.isNull(req.body.password_repeat) 
		|| Utils.isNull(req.body.role)) {
		req.flash('error','信息填写不完整');
		return res.redirect('/adminlogin/reg');
	}

	if (req.body.password_repeat != req.body.password) {
		req.flash('error','2次输入密码不一致');
		return res.redirect('/adminlogin/reg');
	}

	Admin.findOne({ where: {name : req.body.name} }).then(function(admin) {
		if (admin) {
			req.flash('error','已存在此管理员');
			return res.redirect('/adminlogin/reg');
		}
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');
		Admin.build({
			name : req.body.name,
			password : password,
			adminRoleId : req.body.role
		}).save().then(function (admin){
			return res.redirect('/adminlogin');
		}).catch(function (error){
			req.flash('error',error);
			return res.redirect('/adminlogin/reg');
		});
	});
});

module.exports = router;
