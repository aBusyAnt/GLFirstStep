var express = require('express'),
	crypto = require('crypto'),
	Utils = require('../modules/utils')
	Course =  require('../models/SM_Course'),
	FormatCheck = require('../modules/format_check');

var CourseController = require('../Controller/CourseController');

var router = express.Router();

router.get('/',function (req,res,next){
	res.redirect('/course/0'); 
});
router.get('/:category',function (req,res,next){
	if(!FormatCheck.id(req.params.category)){
		console.log('The Id is not number,try next()');
		next();
	} else  {
		var controller = new CourseController(req,res);
		object_getAllCourseCount = controller.getAllCoursesCount.bind(controller);
		object_getAllCourseCount(function (totalPages) {
			console.log(totalPages);
	  		res.render('course',{title:'课程列表',category:req.params.category,totalPages:totalPages});
		});
  	}
});

router.get('/all/:category/:page?',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getAllCourseData = controller.getAllCoursesData.bind(controller);
	object_getAllCourseData();
});

router.get('/recommends',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getRecommentCourseList = controller.getRecommentCourseList.bind(controller);
	object_getRecommentCourseList();
});

router.get('/categories',function (req,res,next){
  	Course.CourseCategory.findAll().then(function (categories){
		res.send(categories);
	});
});

router.get('/detail/:id',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getCourseDetail = controller.courseDetail.bind(controller);
	object_getCourseDetail();
  	
});

router.get('/detail/:id/:contentId',function (req,res,next){
	var controller = new CourseController(req,res);
	object_getCourseContentDetail = controller.courseContentDetail.bind(controller);
	object_getCourseContentDetail();
  	
});

router.get('/search/course/:keyword',function (req,res,next){
	var controller = new CourseController(req,res);
	object_searchCourses = controller.courseSearch.bind(controller);
	object_searchCourses();
  	
});

router.get('/search/course/content/:keyword',function (req,res,next){
	var controller = new CourseController(req,res);
	object_searchCourseContent = controller.courseContentSearch.bind(controller);
	object_searchCourseContent();
  	
});

module.exports = router;