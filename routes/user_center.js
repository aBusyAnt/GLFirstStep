var FormatCheck = require('../modules/format_check');
var express = require('express');
var crypto = require('crypto');
var User = require('../models/SM_User');
var Utils = require('../modules/utils');


var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('user_center',{ title : '用户中心' });
});


module.exports = router;
