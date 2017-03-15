var express = require('express'),
	crypto = require('crypto'),
	Utils = require('../modules/utils')
	RedirectUrl = require('../models/SM_RedirectUrl');

var router = express.Router();

router.get('/:redirectUrl',function (req,res,next){
	RedirectUrl.findOne({
		where:{
			redirect_url:'/redirect/' + req.params.redirectUrl
		}
	}).then(function (result){
		console.log(result);
		var number = 0;
		if (!Utils.isNull(result.access_number)) {
			number = result.access_number;
		}
		var newRedirectUrl = {
			access_number: ++number
		}
		RedirectUrl.update(newRedirectUrl,{
			where:{
				id:result.id
			}
		}).then(function (updateResult){
			res.redirect(result.original_url);
		})
	})
});

module.exports = router;