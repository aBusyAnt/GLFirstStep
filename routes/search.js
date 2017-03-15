var express = require('express'),
	crypto = require('crypto'),
	Utils = require('../modules/utils')
	Course =  require('../models/SM_Course'),
	FormatCheck = require('../modules/format_check');

var router = express.Router();

router.get('/',function (req,res,next){
	console.log(req.body.keyword);
	res.render('search',{title:'干货搜索',keyword:req.query.keyword});
});

module.exports = router;