var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index',{title:'干货时代'});
	// res.redirect('/article/list/0/1');
});

router.get('/about', function(req, res, next) {
  	res.render('about',{title:'关于、联系我'});
});

module.exports = router;
