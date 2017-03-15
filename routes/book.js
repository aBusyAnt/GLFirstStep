var express = require('express');
var crypto = require('crypto');
var Book =  require('../models/SM_Book');
var BookCategory = require('../models/SM_BookCategory');
var BookRecord =  require('../models/SM_BookRecord');
var User =  require('../models/SM_User');
var Sequelize = require('sequelize');
var sequelize = require('../modules/sequelize_db');

var fs = require('fs');
var config = require('config');
var Utils = require('../modules/utils');
var SM_SQL = require('../modules/SM_SQL');

var router = express.Router();


router.get('/', function(req, res, next) {
	res.redirect('/book/list/0'); 
});

router.get('/list/:categoryId', function(req, res, next) {
	var queryOption = {};
	console.log('req.params.categoryId:' + req.params.categoryId);
	if (req.params.categoryId > 0) {
		queryOption.where = {
			book_category_id : req.params.categoryId
		}
	}

	Book.count(queryOption).then(function (count){
		console.log(count);
		var totalPages = 0;
		var pageSize = 20;
		if ( count % pageSize == 0 ) { 
            totalPages = parseInt(count/pageSize,10);  
        } else {  
            totalPages = parseInt(count/pageSize,10)+1;  
        }
        console.log(totalPages);
    	res.render('books',{title:'精选书籍',queryCategory:req.params.categoryId,totalPages:totalPages});
	});
});


router.get('/detail/:id', function(req, res, next) {
	var bookId = req.params.id;
	if (Utils.isNull(bookId) || !FormatCheck.id(bookId)) {
		console.log('wrong bookId : ' + bookId);
		next();
		return;
	}
	recordBrowse(req,res,bookId);
	Book.findById(bookId).then(function (book){
		res.render('book_detail',{title:book.name,book:book});
	}).catch(function (error) {
		res.send("No Found !");
	});
});

router.get('/categories', function(req, res, next) {
	BookCategory.findAll().then(function (categories){
		res.send(categories);
	}).catch(function (error) {
		res.sendStatus(500);
	});
});



router.get('/get/:category?/:page?', function(req, res, next) {
	console.log(req.params.category + ' , ' + req.params.page);
	var pageSize = 10;
	var currentPage = 1;
	if(!Utils.isNull(req.params.page)){
		currentPage = req.params.page;
	}
	var offset = pageSize * (currentPage-1);
	console.log('offset:' + offset);
	var queryOptions = {
		limit:pageSize,
		order:'id desc',
		offset:offset,
		include:[{
			model: BookCategory,
			attributes:['id','name']
		}]
	}
	if (!Utils.isNull(req.params.category) && req.params.category > 0) {
		queryOptions.where = {
			book_category_id:req.params.category
		}
	}

	Book.findAndCountAll(queryOptions).then(function (result){
		var totalPages = 0;
		if ( result.count % pageSize == 0 ) { 
            totalPages = parseInt(result.count/pageSize,10);  
        }else{  
            totalPages = parseInt(result.count/pageSize,10)+1;  
        }  
		var books = result.rows;
		var page = {
			currentPage:currentPage,
			totalPages:totalPages,
			pageSize:pageSize,
			url:'/book/'
		}
		var response = {
			title : '在线书籍' ,
			books : books ,
			page : page , 
			category: null , 
		}

		if(!Utils.isNull(req.params.category)){
			BookCategory.findById(req.params.category).then(function (category) {
				response.category = category;
				res.send(response);
			});
		}else {
			res.send(response);
		}
		
	}).catch(function (error){
		console.log(error);
	});
});


router.get('/likeBookRecommends/:bookId', function(req, res, next) {
	var bookId = req.params.bookId;
	var sql = SM_SQL.book_likeBookRecommends(bookId);
	sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT }).then(function (results) {
		res.send(results);
	}).catch(function (error){
		console.log(error);
		res.send(error);
	});
});

router.get('/hotdownloads/', function(req, res, next) {
	// var bookId = req.params.bookId;
	var sql = SM_SQL.book_hotDownloads();
	console.log('sql:' + sql);
	sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT }).then(function (results) {
		res.send(results);
	}).catch(function (error){
		console.log(error);
		res.send(error);
	});
});
router.get('/latest/', function(req, res, next) {
	Book.findAll({
		limit:20,
		order:'id desc'
	}).then(function (books) {
		return res.send(JSON.stringify(books));
	}).catch(function (error) {
		return res.send(JSON.stringify({error:-1,msg:'Query Error'}));
	});

});


router.get('/search/:keyword',function (req,res,next){
	Book.findAll({
		where:{
			$or:[
				{
					name:{
						$like:'%' + req.params.keyword + '%'
					}
				},
				{
					markdown:{
						$like:'%' + req.params.keyword + '%'
					}
				},
				{
					summary:{
						$like:'%' + req.params.keyword + '%'
					}
				}
			]
		},
		group:'id'
	}).then(function (books){
		res.send(JSON.stringify(books));
	});
});

/*********************************************
 *
 *		Private function
 *
**********************************************/


function recordBrowse(req,res,bookId){
	var newRecord = {
		study_book_id:bookId,
		op:'browse'
	};
	if (req.session.user && !Utils.isNull(req.session.user.id)) {
		newRecord.user_id = req.session.user.id;
	}
	newRecord.remote_address = req.connection.remoteAddress;
	BookRecord.build(newRecord).save().then(function(record){
		console.log(record);
	});
}

module.exports = router;