var express = require('express'),
	crypto = require('crypto'),
	fs = require('fs'),
	config = require('config'),
	Utils = require('../modules/utils'),
	fileUploadUtil = require('../modules/fileUploadUtil');

var AdminRole = require('../models/SM_AdminRole'),
	Admin = require('../models/SM_Admin'),
	BookCategory = require('../models/SM_BookCategory'),
	Book = require('../models/SM_Book'),
	Article = require('../models/SM_Article'),
	ArticleComment = require('../models/SM_ArticleComment'),
	ArticleTag = require('../models/SM_ArticleTag'),
	ArticleTagF = require('../models/SM_ArticleTagF'),
	Course = require('../models/SM_Course'),
	SM_RedirectUrl = require('../models/SM_RedirectUrl');

var CourseController = require('../Controller/CourseController');

var router = express.Router();


router.all('/*', checkLogin);

/*********************************************
 *
 *		Admin
 *
**********************************************/
//Admin Home
router.get('/', function (req, res, next) {
	res.render('admin',{ title : '管理员' });
});

//Role
router.get('/role',function (req, res) {
	res.render('admin_role',{ title : '添加管理员角色' });
});

router.post('/role',function (req, res) {
	AdminRole.build(req.body).save().then(function (adminRole){
		return res.redirect('/admin/role');
	}).catch(function (error){
		req.flash('error',{ error : error });
		return res.redirect('/admin');

	});
});

/*********************************************
 *
 *		Book Category
 *
**********************************************/
router.get('/book_categories',function(req,res,next){
	BookCategory.findAll().then(function (categories){
		res.render('admin_book_categories',{ title : '书籍分类管理' ,categories : categories});
	});
});
router.get('/book_categories/new/:id?',function(req,res,next){
	if (!Utils.isNull(req.params.id)) {
		BookCategory.findById(req.params.id).then(function (result){
			res.render('admin_book_categories_new',{ title : '添加书籍分类',category:result});
		});
	} else {
		res.render('admin_book_categories_new',{ title : '添加书籍分类',category:null});
	}
});
router.post('/book_categories/new/:id?',function(req,res,next){
	if (Utils.isNull(req.body.name)) {
		req.flash('error','请输入分类名称');
		return res.redirect('/admin/book_categories/new');
	}
	if (Utils.isNull(req.params.id)) {
		BookCategory.findOne({
			where:{
				name:req.body.name
			}
		}).then(function (category){
			if(category){
				req.flash('error','已存在该分类');
				return res.redirect('/admin/book_categories/new');
			} else {
				BookCategory.build({
					name:req.body.name
				}).save().then(function (category){
					return res.redirect('/admin/book_categories');
				}).catch(function (error){
					req.flash('error','保存失败');
					return res.redirect('/admin/book_categories/new');
				});		
			}
		}).catch(function (error){
			req.flash('error','查找分类异常');
			return res.redirect('/admin/book_categories/new');
		});
	} else {
		var category = {
			name:req.body.name
		}
		BookCategory.update(category,{
			where:{
				name:req.body.name
			}
		}).then(function (result){
			return res.redirect('/admin/book_categories');
		})
	}
});


router.get('/book_category/remove/:id',function(req,res,next){
	Book.count({
		where:{
			book_category_id:req.params.id
		}
	}).then(function (result){
		if (result > 0) {
			res.render('error',{ title : '错误' ,message : '该分类含有书籍，不能删除!'});
		} else  {
			BookCategory.destroy({
				where: {
					id:req.params.id
				}
			}).then(function (result){
				return res.redirect('/admin/book_categories');
			}).catch(function(error){
				console.log('error:  删除失败');
				return res.redirect('/admin/book_categories');
			});
		}
	});
});
/*********************************************
 *
 *		Book
 *
**********************************************/
router.get('/books/:page?',function(req,res,next){
	var pageSize = 10;
	var currentPage = 1;
	if(!Utils.isNull(req.params.page)){
		currentPage = req.params.page;
	}
	var offset = (currentPage-1)*pageSize;
	console.log('offset:' + offset + ',currentPage' + currentPage);
	Book.findAndCountAll({ 
		limit: pageSize,
		offset: offset,
		include:[{
			model: BookCategory,
			attributes:['name']
		}],
		order:'id desc'
	}).then(function (result){
		var totalPages = 0;
		if ( result.count % pageSize == 0 ) { 
            totalPages = parseInt(result.count/pageSize,10);  
        }else{  
            totalPages = parseInt(result.count/pageSize,10)+1;  
        }  

		var books = result.rows;
		console.log(result.rows);
		var page = {
			currentPage:currentPage,
			totalPages:totalPages,
			numberOfPages:pageSize,
			url:'/admin/books/'
		}
		res.render('admin_books',{ title : '书籍管理' ,books : books , page : page});

	}).catch(function (error){
		console.log(error);
	});
});

router.get('/book/new/:id?',function(req,res,next){
	BookCategory.findAll().then(function (categories){
		if(!Utils.isNull(req.params.id)){
			Book.findById(req.params.id).then(function (book){
				res.render('admin_books_new',{ title : '添加书籍',categories : categories , book : book });
			});
		}else{
			res.render('admin_books_new',{ title : '添加书籍',categories : categories , book : null });
		}
	});
});

router.post('/book/new/:id?',fileUploadUtil.bookCoverUpload().single('pic'),function(req,res,next){
	var picName = null;
	if(!Utils.isNull(req.file) && !Utils.isNull(req.file.filename)){
		picName = req.file.filename;
	}
	var name = req.body.name;
	var summary = req.body.summary;
	var publishing_house = req.body.publishing_house;
	var publishing_date = req.body.publishing_date;
	var categoryId = req.body.category;
	var downloadurl = generateRedirectUrl(req.body.downloadurl);
	var download_remark = req.body.download_remark;
	var douban_rate = req.body.douban_rate;
	var buy_url = generateRedirectUrl(req.body.buy_url);
	var buy_remark = req.body.buy_remark;
	var markdown = req.body.markdown;

	console.log(req.body.content_makedown);
	if (!name && !enname) {
		req.flash('error','请输入中文书名或英文书名');
		return res.redirect('/admin/book/new');
	};

	if(Utils.isNull(req.params.id)){
		//insert new 
		var newBook = {
			name:name,
			summary:summary,
			markdown : markdown,
			download_url:downloadurl,
			publishing_house:publishing_house,
			publishing_date:publishing_date,
			book_category_id:categoryId,
			download_remark:download_remark,
			douban_rate:douban_rate,
			buy_url:buy_url,
			buy_remark:buy_remark
		};
		if(picName){
			newBook.cover_url =  picName;
		}
		Book.build(newBook).save().then(function (book){
			console.log('book.save success');
			return res.redirect('/admin/books');
		}).catch(function (error){
			console.log(error);
			req.flash('error','保存失败');
			return res.redirect('/admin/book/new');
		});
	} else {
		//update
		var newBook = {
			name:name,
			summary:summary,
			markdown : markdown,
			download_url:downloadurl,
			publishing_house:publishing_house,
			publishing_date:publishing_date,
			book_category_id:categoryId,
			download_remark:download_remark,
			douban_rate:douban_rate,
			buy_url:buy_url,
			buy_remark:buy_remark
		};
		if(picName){
			newBook.cover_url  =  picName;
		}
		console.log('Book.update:' + req.params.id);
		Book.update(newBook,{
			where:{
				id:req.params.id
			}
		}).then(function (book){
			console.log('Book.update success:' + book.id);
			return res.redirect('/admin/books');
		}).catch(function (error){
			console.log(error);
			req.flash('error','更新失败');
			return res.redirect('/admin/book/new/' + req.params.id);
		});
	}
});

router.get('/book/remove/:id',function(req,res,next){
	Book.destroy({
		where: {
			id:req.params.id
		}
	}).then(function (result){
		SM_RedirectUrl.destroy({
			where:{
				$or:[{
					redirect_url:result.download_url
				},{
					redirect_url:result.buy_url
				}]
			}
		}).then(function (result){
			console.log(result);
		})
		return res.redirect('/admin/books');
	}).catch(function(error){
		console.log('error:  删除失败');
		return res.redirect('/admin/books');
	});
});

/*********************************************
 *
 *		Article Tag
 *
**********************************************/
router.get('/article_tags',function(req,res,next){
	ArticleTag.findAll().then(function (tags){
		res.render('admin_article_tag',{ title : '文章标签管理' ,tags : tags});
	});
});
router.get('/article_tag/edit/:id?',function(req,res,next){
	if (!Utils.isNull(req.params.id)) {
		 ArticleTag.findById(req.params.id).then(function (result){
	 		res.render('admin_article_tag_edit',{ title : '添加文章标签',tag:result});
		 })
	} else  {
		res.render('admin_article_tag_edit',{ title : '添加文章标签',tag:null});
	}
});
router.post('/article_tag/edit/:id?',function(req,res,next){
	if (Utils.isNull(req.body.name)) {
		req.flash('error','请输入标签名称');
		return res.redirect('/admin/article_tag/edit');
	}
	if (Utils.isNull(req.params.id)) {
		ArticleTag.findOne({
			where:{
				name:req.body.name
			}
		}).then(function (tag){
			if(tag){
				req.flash('error','已存在该标签');
				return res.redirect('/admin/article_tag/edit');
			} else {
				ArticleTag.build({
					name:req.body.name
				}).save().then(function (tag){
					return res.redirect('/admin/article_tags');
				}).catch(function (error){
					req.flash('error','保存失败');
					return res.redirect('/admin/article_tag/edit');
				});		
			}
		}).catch(function (error){
			console.log(error);
			req.flash('error','查找标签异常');
			return res.redirect('/admin/article_tag/edit');
		});
	} else  {
		var newArticleTag = {
			name:req.body.name
		};
		ArticleTag.update(newArticleTag,{
			where:{
				id:req.params.id
			}
		}).then(function (result){
			return res.redirect('/admin/article_tags');
		}).catch (function (error){
			console.log(error);
			return res.redirect('/admin/article_tags');
		})
	}

});

router.get('/article_tag/remove/:id',function(req,res,next){
	ArticleTagF.count({
		where:{
			article_tag_id:req.params.id
		}
	}).then(function (result) {
		if (result > 0) {
			res.render('error',{ title : '错误' ,message : '该Tag含有文章，不能删除!'});
		} else {
			ArticleTag.destroy({
				where: {
					id:req.params.id
				}
			}).then(function (result){
				return res.redirect('/admin/article_tags');
			}).catch(function(error){
				console.log('error:  删除失败');
				return res.redirect('/admin/article_tags');
			});
		}
	})
});

/*********************************************
 *
 *		Article
 *
**********************************************/

router.get('/articles/:page?',function(req,res,next){
	var pageSize = 10;
	var currentPage = 1;
	if(!Utils.isNull(req.params.page)){
		currentPage = req.params.page;
	}
	var offset = (currentPage-1)*pageSize;
	Article.findAndCountAll({ 
		limit: pageSize,
		offset: offset,
		// include:[{
		// 	model: BookCategory,
		// 	attributes:['name']
		// }],
		order:'id desc'
	}).then(function (result){
		var totalPages = 0;
		if ( result.count % pageSize == 0 ) { 
            totalPages = parseInt(result.count/pageSize,10);  
        }else{  
            totalPages = parseInt(result.count/pageSize,10)+1;  
        }  

		var articles = result.rows;
		var page = {
			currentPage:currentPage,
			totalPages:totalPages,
			numberOfPages:pageSize,
			// url:'/admin/books/'
		}
		res.render('admin_article',{ title : '文章管理' ,articles : articles , page : page});

	}).catch(function (error){
		console.log(error);
	});
});

router.get('/article/edit/:id?',function(req,res,next){
	if(!Utils.isNull(req.params.id)){
		Article.findById(req.params.id).then(function (article){
			ArticleTag.findAll().then(function (tags){
				ArticleTagF.findAll({
					where:{
						article_id:req.params.id
					}
				}).then(function (f_articletags){
					var json_f_articletags = JSON.stringify(f_articletags);
					console.log(json_f_articletags);
					return res.render('admin_article_edit',{
						title:'修改文章',
						article:article,
						tags:tags,
						f_articletags:json_f_articletags
					});
				});
			}).catch(function (error){
				console.log(error);
				return res.redirect('/admin/article');
			});
		});
	}else{
		ArticleTag.findAll().then(function (tags){
			return res.render('admin_article_edit',{ title : '添加文章',article : null,tags:tags});
		}).catch(function (error){
			console.log(error);
			return res.redirect('/admin/article');
		});
	}
});


router.post('/article/edit/:id?',function(req,res,next){
	var title = req.body.title;
	var markdown = req.body.markdown;
	var tags = null;
	if (Utils.isArray(req.body.tags)) {
		tags = req.body.tags;
	} else {
		tags = new Array();
		tags.push(req.body.tags);
	}

	if (Utils.isNull(title) || Utils.isNull(markdown)) {
		console.log('请输入标题与文章内容');
		req.flash('error','请输入标题与文章内容');
		var url = '/admin/article/edit';
		if (!Utils.isNull(req.params.id)){
			url += '/' + req.params.id;
		}
		return res.redirect(url);
	}

	if(Utils.isNull(req.params.id)){
		//insert
		var newArticle = {
			title:title,
			markdown:markdown,
			author_id:req.session.admin.id
		};
		Article.build(newArticle).save().then(function (article){
			ArticleTag.findAll({
				where:{
					id:{
						$in:tags
					} 
				}
			}).then(function (articleTags){
				article.setTags(articleTags);	
				return res.redirect('/admin/articles');						
			});
		}).catch(function (error){
			console.log(error);
			req.flash('error','保存失败');
			return res.redirect('/admin/article/edit');
		});
	} else {
		//update
		var newArticle = {
			title:title,
			markdown:markdown,
			author_id:req.session.admin.id
		};
		Article.update(newArticle,{
			where:{
				id:req.params.id
			}
		}).then(function (result){
			Article.findById(req.params.id).then(function(article){
				ArticleTag.findAll({
					where:{
						id:{
							$in:tags
						} 
					}
				}).then(function (articleTags){
					console.log(articleTags);
					article.setTags(articleTags);	
					return res.redirect('/admin/articles');				
				});
			});
		}).catch(function (error){
			console.log(error);
			req.flash('error','更新失败');
			return res.redirect('/admin/article/edit/' + req.params.id);
		});
	}
});

router.get('/article/remove/:id',function(req,res,next){
	Article.destroy({
		where: {
			id:req.params.id
		}
	}).then(function (result){
		return res.redirect('/admin/articles');
	}).catch(function(error){
		console.log('error:  删除失败');
		return res.redirect('/admin/articles');
	});
});

/*********************************************
 *
 *			Course Category
 *
**********************************************/
router.get('/course/categories/:page?',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getAdminCategoryList = controller.getAdminCategoryList.bind(controller);
	object_getAdminCategoryList();
});

router.get('/course/category/edit/:id?',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getAdminCategoryEdit = controller.getAdminCategoryEdit.bind(controller);
	object_getAdminCategoryEdit();
});


router.post('/course/category/edit/:id?',function(req,res,next){
	var controller = new CourseController(req,res);
	object_postAdminCategoryEdit = controller.postAdminCategoryEdit.bind(controller);
	object_postAdminCategoryEdit();
});

router.get('/course/category/remove/:id?',function (req,res,next){
	var controller = new CourseController(req,res);
	object_adminRemoveCourseCategory = controller.adminRemoveCourseCategory.bind(controller);
	object_adminRemoveCourseCategory();
});


/*********************************************
 *
 *			Course
 *
**********************************************/
router.get('/courses/:page?',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getAdminCourseList = controller.getAdminCourseList.bind(controller);
	object_getAdminCourseList();
});

router.get('/course/edit/:id?',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getAdminCourseEdit = controller.getAdminCourseEdit.bind(controller);
	object_getAdminCourseEdit();
});


router.post('/course/edit/:id?',fileUploadUtil.courseCoverUpload().single('pic'),function(req,res,next){
	console.log(req.file);
	var controller = new CourseController(req,res);
	object_postAdminCourseEdit = controller.postAdminCourseEdit.bind(controller);
	object_postAdminCourseEdit();
});
router.get('/course/remove/:id',function (req,res,next){
	var controller = new CourseController(req,res);
	object_removeCourse = controller.adminRemoveCourse.bind(controller);
	object_removeCourse();
});
//CourseContent
router.get('/course/contents/:courseId',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getAdminCourseContentList = controller.getAdminCourseSectionsAndContents.bind(controller);
	object_getAdminCourseContentList();
});

router.get('/course/content/:courseId/:sectionId/edit/:id?',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getAdminCourseContentEdit = controller.getAdminCourseContentEdit.bind(controller);
	object_getAdminCourseContentEdit();
});

router.post('/course/content/:courseId/:sectionId/edit/:id?',function (req,res,next){
	var controller = new CourseController(req,res);
	object_postAdminCourseContentEdit = controller.postAdminCourseContentEdit.bind(controller);
	object_postAdminCourseContentEdit();
});
router.get('/course/content/:courseId/:sectionId/remove/:id',function (req,res,next){
	var controller = new CourseController(req,res);
	object_removeCourseContent = controller.adminRemoveCourseContent.bind(controller);
	object_removeCourseContent();
});

//Course Section
router.get('/course/section/:courseId/edit/:id?',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getAdminCourseSectionEdit = controller.getAdminCourseSectionEdit.bind(controller);
	object_getAdminCourseSectionEdit();
});
router.post('/course/section/:courseId/edit/:id?',function (req,res,next){
	var controller = new CourseController(req,res);
	object_postAdminCourseSectionEdit = controller.postAdminCourseSectionEdit.bind(controller);
	object_postAdminCourseSectionEdit();
});
router.get('/course/section/:courseId/remove/:id',function (req,res,next){
	var controller = new CourseController(req,res);
	object_adminRemoveCourseSection = controller.adminRemoveCourseSection.bind(controller);
	object_adminRemoveCourseSection();
});
/*********************************************
 *
 *		private function
 *
**********************************************/
function checkLogin (req, res, next) {
	console.log('req.session.admin:' + req.session.admin);
	if(!req.session.admin) {
		console.log('未登入,跳转到登录页...');
		req.flash('error','未登入');
		return res.redirect('/adminlogin');
	} else {
		next();
	}
}

function checkNotLogin(req, res, next) {
	if (req.session.admin) {
		req.flash('error','已登入');
		return res.redirect('/admin');
	}
	next();
}

function generateRedirectUrl(originalUrl){
	var redirectUrl = Utils.generateRedirectUrl(originalUrl);
	var newRecord = {
		redirect_url:redirectUrl,
		original_url:originalUrl		
	};
	SM_RedirectUrl.build(newRecord).save().then(function (result){
		console.log(result);
	});
	return redirectUrl;
}

module.exports = router;