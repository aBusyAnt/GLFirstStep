var express = require('express');
var crypto = require('crypto');
var AdminRole = require('../models/SM_AdminRole');
var Admin = require('../models/SM_Admin');
var router = express.Router();



//Init,Remove before publish
router.get('/', function (req,res){
	AdminRole.build({
		name : req.body.name,
	}).save().then(function (adminRole){
		console.log(adminRole);
		var md5 = crypto.createHash('md5');
		var password = md5.update('111111').digest('base64');
		Admin.build({
			nickname:'干货君',
			name : 'admin',
			password : password,
			adminRoleId : adminRole.id
		}).save().then(function (admin){
			res.send('Init admin OK,please login with [admin/111111]');
		}).catch(function (error){
			res.send('init admin -> save init account error');
		});
	}).catch(function (error){
		res.send('init AdminRole-> save init account error');
	});
});

module.exports = router;