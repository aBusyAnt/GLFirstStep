var express = require('express'),
	crypto = require('crypto'),
	Utils = require('../modules/utils');
	
var SequelizeValues = require('sequelize-values')();
var sequelize = require('../modules/sequelize_db');

var	Admin =  require('../models/SM_Admin'),
	Article =  require('../models/SM_Article'),
	ArticleComment = require('../models/SM_ArticleComment'),
	ArticleTag =  require('../models/SM_ArticleTag'),
	ArticleTagF =  require('../models/SM_ArticleTagF'),
	ArticleBrowseRecord = require('../models/SM_ArticleBrowseRecord');

var router = express.Router();

//Article List
router.get('/',function (req,res,next){
	res.redirect('/article/list/0/1'); 
});

router.get('/list/:tag/:page',function (req,res,next){
	var pageSize = 20;
	var currentPage = 1;
	if(!Utils.isNull(req.params.page)){
		currentPage = req.params.page;
	}
	var offset = pageSize * (currentPage-1);

	var articleFQueryOptions = {
		order:[['article_id', 'desc']],
		attributes:['article_id'],
		group:'article_id'
	};
	if (!Utils.isNull(req.params.tag) && req.params.tag > 0) {
		articleFQueryOptions.where = {
			article_tag_id:req.params.tag
		}
	}
	ArticleTagF.findAll(articleFQueryOptions).then(function(result){
		// console.log('ArticleTagF result length:' + result.length);
		var queryOptions = {
			offset:offset,
			limit:pageSize,
			order:[['id','desc']],
			include:[{
				model: ArticleTag, 
				as:'tags',
				attributes:['id','name']
			},{
				model:Admin,
				as: 'author',
				attributes:['id','nickname']
			}]
		}
		if (result.length > 0) {
			var articleIds = new Array();
			for (var i in result) {
				articleIds.push(result[i].article_id);
			}
			if (!Utils.isNull(req.params.tag) && req.params.tag > 0) {
				queryOptions.where = {
					id:{
						$in:articleIds
					} 
				}
			}
		}
		Article.findAndCountAll(queryOptions).then(function (result){
			var totalPages = 0;
			if ( result.count % pageSize == 0 ) { 
	            totalPages = parseInt(result.count/pageSize,10);  
	        }else{  
	            totalPages = parseInt(result.count/pageSize,10)+1;  
	        }  
	        console.log('totalPages:' + totalPages);
			var articles = result.rows.map(function(item){
				var excerpt = Utils.getExcerptFromMarkdown(item.markdown);
				console.log(excerpt);
				item.excerpt = excerpt;
				return item;
			});
			var page = {
				currentPage:currentPage,
				totalPages:totalPages,
				pageSize:pageSize
			}
			ArticleTag.findAll({
				include:[{
					model: Article, 
					as:'articles',
					attributes:['id'],
				}],
			}).then(function(tags){
				return res.render('article_list',{ title : '技术文章', tags:tags,articles:articles , page:page });
			});
		}).catch(function (error){
			console.log(error);
		});
	});
});

router.get('/list',function (req,res,next){
	Article.findAll().then(function(tags){
		return res.send(JSON.stringify(tags));
	});
});

router.get('/tags',function (req,res,next){
	ArticleTag.findAll().then(function(tags){
		return res.send(JSON.stringify(tags));
	});
});

router.get('/hot',function (req,res,next){
	ArticleBrowseRecord.findAll({
		group:['article_id'],
		limit:10,
		attributes: ['article_id'],
		order:[[sequelize.fn('COUNT', sequelize.col('article_id')),'desc']]
	}).then(function(records){
		var articleIds = new Array();
		for (var i in records) {
			articleIds.push(records[i].article_id);
		}
		Article.findAll({
			where:{
				id:{
					$in:articleIds
				}
			},
			attributes: ['id','title'],
		}).then(function(articles){
			return res.send(JSON.stringify(articles));
		}).catch(function (error){
			console.log(error);
		});
	});
});

router.get('/latest',function (req,res,next){
	Article.findAll({
		order:[['id','desc']],
		limit:20,
		include:[{
				model: ArticleTag, 
				as:'tags',
				attributes:['id','name']
			},{
				model:Admin,
				as: 'author',
				attributes:['id','nickname']
		}]
	}).then(function(result){
		var nodedata = SequelizeValues.getValues(result);;
		var articles = nodedata.map(function(item){
			var excerpt = Utils.getExcerptFromMarkdown(item.markdown);
			item.excerpt = excerpt;
			return item;
		});
		res.send(JSON.stringify(articles));
	}).catch(function (error){
		console.log(error);
	});
});

router.get('/detail/:id',function (req,res,next){
	Article.findOne({
		where:{
			id:req.params.id
		},
		include:[{
			model: ArticleTag, 
			as:'tags',
			attributes:['id','name']
		},{
			model:Admin,
			as: 'author',
			attributes:['id','nickname']
		}]
	}).then(function(article){
		recordBrowse(req,res,article.id)
		article.html = Utils.getHtmlMarkdown(article.markdown);
		//all tags
		ArticleTag.findAll({
			include:[{
				model: Article, 
				as:'articles',
				attributes:['id'],
			}],
		}).then(function(tags){
			return res.render('article',{ title : article.title, article:article,tags:tags, articleUrl: Utils.serverAddress() });
		});
	});
});

router.get('/search/:keyword',function (req,res,next){
	Article.findAll({
		where:{
			$or:[
				{
					title:{
						$like:'%' + req.params.keyword + '%'
					}
				},
				{
					markdown:{
						$like:'%' + req.params.keyword + '%'
					}
				}
			]
		},
		group:'id'
	}).then(function (articles){
		res.send(JSON.stringify(articles));
	});
});


/*********************************************
 *
 *		Private function
 *
**********************************************/

function recordBrowse(req,res,articleId){
	var newRecord = {
		article_id:articleId,
	};
	if (req.session.user && !Utils.isNull(req.session.user.id)) {
		newRecord.user_id = req.session.user.id;
	}
	console.log(req.connection.remoteAddress);
	newRecord.remote_address = req.connection.remoteAddress;
	console.log(req);
	ArticleBrowseRecord.build(newRecord).save().then(function(record){
		console.log(record);
	});
}
module.exports = router;