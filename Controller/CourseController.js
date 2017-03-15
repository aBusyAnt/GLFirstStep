var BaseController = require('./BaseController'),
	Utils = require('../modules/utils'),
	crypto = require('crypto'),
	express = require('express'),
	Course = require('../models/SM_Course'),
	sequelize = require('../modules/sequelize_db');

var SequelizeValues = require('sequelize-values')();


function CourseController(req,res) {
	this.req = req;
	this.res = res;
}

CourseController.prototype = new BaseController(this.req,this.res);

/**** Course Category ****/
CourseController.prototype.getAdminCategoryList = function () {
	var req = this.req;
	var res = this.res;

	var pageSize = 10;
	var currentPage = 1;
	if(!Utils.isNull(req.params.page)){
		currentPage = req.params.page;
	}
	var offset = (currentPage-1)*pageSize;
	Course.CourseCategory.findAndCountAll({ 
		limit: pageSize,
		offset: offset,
		// include:[{
		// 	model: BookCategory,
		// 	attributes:['name']
		// }],
		order:'id desc'
	}).then(function (result){
		console.log(result);
		var totalPages = 0;
		if ( result.count % pageSize == 0 ) { 
            totalPages = parseInt(result.count/pageSize,10);  
        }else{  
            totalPages = parseInt(result.count/pageSize,10)+1;  
        }  

		var categories = result.rows;
		var page = {
			currentPage:currentPage,
			totalPages:totalPages,
			numberOfPages:pageSize,
			url:'/admin/courses/'
		}
		res.render('admin_course_categories',{ title : '课程分类管理' ,categories : categories , page : page});

	}).catch(function (error){
		console.log(error);
	});
}

CourseController.prototype.getAdminCategoryEdit = function () {
	var req = this.req;
	var res = this.res;

	var category = null;
	if (!Utils.isNull(this.req.params.id)) {
		Course.CourseCategory.findById(req.params.id).then(function (result){
			category = result;
			res.render('admin_course_category_edit',{ title : '课程分类' ,category : category});
		});
	} else {
		res.render('admin_course_category_edit',{ title : '课程分类' ,category : category});
	}
}

CourseController.prototype.postAdminCategoryEdit = function () {
	var req = this.req;
	var res = this.res;
	var _this = this;
	var categoryId = req.params.id;

	if (Utils.isNull(req.body.name)) {
		req.flash('error','请输入分类名称');
		var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
		method();
	}
	if (Utils.isNull(req.params.id)) {
		Course.CourseCategory.findAll({
			where:{
				name:req.body.name
			}
		}).then(function (category){
			if(!category || category.length > 0){
				req.flash('error','已存在该分类');
				var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
				method();
			} else {
				Course.CourseCategory.build({
					name:req.body.name
				}).save().then(function (category){
					res.redirect('/admin/course/categories/');
				}).catch(function (error){
					req.flash('error','保存失败');
					var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
					method();
				});		
			}
		}).catch(function (error){
			req.flash('error','查找分类异常');
			var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
			method();
		});
	} else {
		Course.CourseCategory.update({name:req.body.name},{
			where:{
				id:req.params.id
			}
		}).then(function (result){
			res.redirect('/admin/course/categories/');
		})
	}

}

//Course
CourseController.prototype.getAdminCourseList = function () {
	var req = this.req;
	var res = this.res;

	var pageSize = 10;
	var currentPage = 1;
	if(!Utils.isNull(req.params.page)){
		currentPage = req.params.page;
	}
	var offset = (currentPage-1)*pageSize;
	Course.Course.findAndCountAll({ 
		limit: pageSize,
		offset: offset,
		include:[{
			model: Course.CourseCategory,
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

		var courses = result.rows;
		var page = {
			currentPage:currentPage,
			totalPages:totalPages,
			numberOfPages:pageSize,
			url:'/admin/courses/'
		}
		res.render('admin_course',{ title : '课程' ,courses : courses , page : page});

	}).catch(function (error){
		console.log(error);
	});
}

CourseController.prototype.getAdminCourseEdit = function () {
	var req = this.req;
	var res = this.res;
	var course = null;
	if (!Utils.isNull(req.params.id)) {
		Course.Course.findById(req.params.id).then(function (result){
			Course.CourseCategory.findAll().then(function(categories){
				res.render('admin_course_edit',{ title : '编辑课程' ,course : result,categories:categories,levels:courseLevels(),update_status:courseUpdateStatus()});
			}).catch(function (error){
				console.log('query categories error');
			})
		});
	} else {
		Course.CourseCategory.findAll().then(function(categories){
			res.render('admin_course_edit',{ title : '新建课程' ,course : null,categories:categories,levels:courseLevels(),update_status:courseUpdateStatus()});
		}).catch(function (error){
			console.log('query categories error');
		})
	}
}

CourseController.prototype.postAdminCourseEdit = function () {
	var req = this.req;
	var res = this.res;
	var _this = this;
	console.log(req.file);
	if (Utils.isNull(req.body.title) 
		|| Utils.isNull(req.body.description) 
		|| Utils.isNull(req.body.price) 
		|| Utils.isNull(req.body.level)) {
		req.flash('error','输入错误');
		var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
		return method();
	}

	var picName = null;
	if(!Utils.isNull(req.file) && !Utils.isNull(req.file.filename)){
		picName = req.file.filename;
	}

	if(Utils.isNull(req.params.id)){
		var newCourse = {
			title:req.body.title,
			description:req.body.description,
			price:req.body.price,
			tip:req.body.tip,
			level:req.body.level,
			update_status:req.body.update_status,
			course_category_id:req.body.category
		};
		if(picName){
			newCourse.cover_url = picName;
		}
		Course.Course.build(newCourse).save().then(function (category){
			res.redirect('/admin/courses/');
		}).catch(function (error){
			req.flash('error','保存失败');
			var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
			method();
		});	
	} else {
		//update
		var newCourse = {
			title:req.body.title,
			description:req.body.description,
			price:req.body.price,
			tip:req.body.tip,
			level:req.body.level,
			update_status:req.body.update_status,
			course_category_id:req.body.category
		};
		if(picName){
			newCourse.cover_url =   picName;
		}
		Course.Course.update(newCourse,{
			where:{
				id:req.params.id
			}
		}).then(function (course){
			console.log('Course.update success:' + course.id);
			return res.redirect('/admin/courses');
		}).catch(function (error){
			console.log(error);
			req.flash('error','更新失败');
			var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
			method();
		});
	}	
}

//Section list
CourseController.prototype.getAdminCourseSectionsAndContents = function (){
	var req = this.req;
	var res = this.res;
	var _this = this;
	var courseId = req.params.courseId;
	Course.CourseContent.findAndCountAll({ 
		where:{
			section_id:null,
			course_id:courseId
		},
		include:[{
			model: Course.CourseContent,
			as:'content'
		}],
		order:'sequence asc'
	}).then(function (result){
		var courseSections = result.rows;
		console.log(courseSections);
		res.render('admin_course_content',{ title : '课程内容' ,courseId:courseId,courseSections : courseSections});
	}).catch(function (error){
		console.log(error);
	});
}



//Section edit
CourseController.prototype.getAdminCourseSectionEdit = function () {
	var req = this.req;
	var res = this.res;
	var courseId = req.params.courseId;

	if (!Utils.isNull(req.params.id)) {
		Course.CourseContent.findById(req.params.id).then(function (result){
			res.render('admin_course_section_edit',{ title : 'Edit Section' , courseId:courseId , section : result});
		});
	} else {
		res.render('admin_course_section_edit',{ title : 'Edit Section' , courseId:courseId , section : null});
	}
}

//Setcion edit post
CourseController.prototype.postAdminCourseSectionEdit = function () {
	var req = this.req;
	var res = this.res;
	var courseId = req.params.courseId;

	if(Utils.isNull(req.params.id)){
		var newSection = {
			title:req.body.title,
			description:req.body.description,
			sequence:req.body.sequence,
			course_id:courseId
		};
		Course.CourseContent.build(newSection).save().then(function (section){
			var courseContentPage = '/admin/course/contents/' + courseId;
			res.redirect(courseContentPage);
		}).catch(function (error){
			req.flash('error','保存失败');
			var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
			method();
		});	
	} else {
		//update
		var newSection = {
			title:req.body.title,
			description:req.body.description,
			sequence:req.body.sequence,
			course_id:courseId
		};

		Course.CourseContent.update(newSection,{
			where:{
				id:req.params.id
			}
		}).then(function (section){
			var courseContentPage = '/admin/course/contents/' + courseId;
			res.redirect(courseContentPage);
		}).catch(function (error){
			console.log(error);
			req.flash('error','更新失败');
			var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
			method();
		});
	}
}


//Content edit
CourseController.prototype.getAdminCourseContentEdit = function () {
	var req = this.req;
	var res = this.res;
	var courseId = req.params.courseId;

	if (!Utils.isNull(req.params.id)) {
		Course.CourseContent.findById(req.params.id).then(function (result){
			res.render('admin_course_content_edit',{ title : '编辑课程' , courseId:courseId , courseContent : result});
		});
	} else {
		res.render('admin_course_content_edit',{ title : '编辑课程' , courseId:courseId , courseContent : null});
	}
}
//Content edit post
CourseController.prototype.postAdminCourseContentEdit = function () {
	var req = this.req;
	var res = this.res;
	var courseId = req.params.courseId;
	var sectionId = req.params.sectionId;

	if(Utils.isNull(req.params.id)){
		var newContent = {
			title:req.body.title,
			description:req.body.description,
			sequence:req.body.sequence,
			duration:req.body.duration,
			video_url:req.body.video_url,
			section_id:sectionId,
			course_id:courseId
		};
		Course.CourseContent.build(newContent).save().then(function (content){
			var courseContentPage = '/admin/course/contents/' + courseId;
			res.redirect(courseContentPage);
		}).catch(function (error){
			req.flash('error','保存失败');
			var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
			method();
		});	
	} else {
		//update
		var newContent = {
			title:req.body.title,
			description:req.body.description,
			sequence:req.body.sequence,
			duration:req.body.duration,
			video_url:req.body.video_url,
			section_id:sectionId,
			course_id:courseId
		};

		Course.CourseContent.update(newContent,{
			where:{
				id:req.params.id
			}
		}).then(function (content){
			var courseContentPage = '/admin/course/contents/' + courseId;
			res.redirect(courseContentPage);
		}).catch(function (error){
			console.log(error);
			req.flash('error','更新失败');
			var method = Object.getPrototypeOf(_this).redirectBack.bind(_this);
			method();
		});
	}
}



CourseController.prototype.adminRemoveCourse = function () {
	var req = this.req;
	var res = this.res;
	var courseId = req.params.id;
	Course.CourseContent.count({
		where:{
			course_id:courseId
		}
	}).then(function (result){
		if (result > 0) {
			res.render('error',{ title : '错误' ,message : '该课程下含有章节内容，不能删除!'});
		} else  {
			Course.Course.destroy({
				where:{
					id:courseId,
				}
			}).then(function (result){
				res.redirect('/admin/courses');
			})
		}
	});
}

CourseController.prototype.adminRemoveCourseContent = function () {
	var req = this.req;
	var res = this.res;
	var courseId = req.params.courseId;
	var sectionId = req.params.sectionId;

	Course.CourseContent.destroy({
		where:{
			course_id:courseId,
			section_id:sectionId,
			id:req.params.id
		}
	}).then(function (result){
		var courseContentPage = '/admin/course/contents/' + courseId;
		res.redirect(courseContentPage);
	})		
}

CourseController.prototype.adminRemoveCourseSection = function () {
	var req = this.req;
	var res = this.res;
	var courseId = req.params.courseId;
	var sectionId = req.params.id;
	Course.CourseContent.count({
		where:{
			course_id:courseId,
			section_id:sectionId,
		}
	}).then(function (result){
		if (result > 0) {
			res.render('error',{ title : '错误' ,message : '该Section下含有课程，不能删除!'});
		} else  {
			Course.CourseContent.destroy({
				where:{
					course_id:courseId,
					section_id:null,
					id:sectionId
				}
			}).then(function (result){
				var courseContentPage = '/admin/course/contents/' + courseId;
				res.redirect(courseContentPage);
			})
		}
	});
}

CourseController.prototype.adminRemoveCourseCategory = function () {
	var req = this.req;
	var res = this.res;
	var categoryId = req.params.id;
	Course.Course.count({
		where:{
			course_category_id:categoryId
		}
	}).then(function (result){
		if (result > 0) {
			res.render('error',{ title : '错误' ,message : '该分类下含有课程，不能删除!'});
		} else  {
			Course.CourseCategory.destroy({
				where:{
					id:categoryId,

				}
			}).then(function (result){
				res.redirect('/admin/course/categories/');
			})
		}
	});
}

////////////////////////////////////////////////
CourseController.prototype.getRecommentCourseList = function () {
	var req = this.req;
	var res = this.res;
	Course.Course.findAll().then(function (result){
		var nodedata = SequelizeValues.getValues(result);;
		var courses = nodedata.map(function(course){
			course.update_status = getCourseUpdateStatusName(course.update_status);
			console.log('random:' + Utils.randomNumber(3));
			course.studynum = Utils.randomNumber(3);
			return course;
		});

		console.log(courses);
		res.send(JSON.stringify(courses));
	}).catch(function (error){
		console.log(error);
		res.send(JSON.stringify({error:-1,msg:'Query Error'}));
	});
}  

CourseController.prototype.getAllCoursesCount = function (callback) {
	var req = this.req;
	var res = this.res;

	var queryOption = {};
	console.log('req.params.category:' + req.params.category);
	if (req.params.category > 0) {
		queryOption.where = {
			course_category_id : req.params.category
		}
	}

	Course.Course.count(queryOption).then(function (count){
		console.log(count);
		var totalPages = 0;
		var pageSize = 20;
		if ( count % pageSize == 0 ) { 
            totalPages = parseInt(count/pageSize,10);  
        } else {  
            totalPages = parseInt(count/pageSize,10)+1;  
        }
        console.log(totalPages);
		callback(totalPages);
	});
}

CourseController.prototype.getAllCoursesData = function () {
	var req = this.req;
	var res = this.res;

	var pageSize = 20;
	var currentPage = 1;
	if(!Utils.isNull(req.params.page)){
		currentPage = req.params.page;
	}
	var offset = pageSize * (currentPage-1);
	var queryOption = {
		limit:pageSize,
		offset:offset,
		order:'id desc'
	};

	var url = '/course/all';
	if (req.params.category > 0) {
		queryOption.where = {
			course_category_id : req.params.category
		}
	}

	url += req.params.category
	url += '/';

	Course.Course.findAndCountAll(queryOption).then(function (result){
		var totalPages = 0;
		if ( result.count % pageSize == 0 ) { 
            totalPages = parseInt(result.count/pageSize,10);  
        }else{  
            totalPages = parseInt(result.count/pageSize,10)+1;  
        }  

		var page = {
			currentPage:currentPage,
			totalPages:totalPages,
			pageSize:pageSize,
			url:url 
		}

		var courses = SequelizeValues.getValues(result.rows).map(function(course){
			course.update_status = getCourseUpdateStatusName(course.update_status);
			console.log('random:' + Utils.randomNumber(3));
			course.studynum = Utils.randomNumber(3);
			return course;
		});

		var response = {courses:courses,page:page};
		res.send(response);
	}).catch(function (error){
		console.log(error);
	});
}

CourseController.prototype.courseDetail = function () {
	var req = this.req;
	var res = this.res;

	var _this = this;
	Course.Course.findById(req.params.id).then(function (course){
		var courseId = course.id;
		Course.CourseContent.findAndCountAll({ 
			where:{
				section_id:null,
				course_id:courseId
			},
			include:[{
				model: Course.CourseContent,
				as:'content',
			}],
			order:'content.id asc'
		}).then(function (result){
			var courseSections = result.rows;
			console.log(courseSections);
			course.update_status = getCourseUpdateStatusName(course.update_status);
			course.studynum = Utils.randomNumber(3);

			var nodedataCourseSections = courseSections;
			if (nodedataCourseSections.length > 0) {
				var section = nodedataCourseSections[0]
				var theSectionCourses = section.content
				if (theSectionCourses.length > 0){
					return res.render('course_detail',{ title : course.title , course: course, courseSections: courseSections, contentUrl: theSectionCourses[0].video_url, courseUrl: Utils.serverAddress()});
				}
			}
			return res.render('course_detail',{ title : course.title , course: course, courseSections: courseSections, contentUrl: null, courseUrl: Utils.serverAddress()});
		}).catch(function (error){
			console.log(error);
		});
	}).catch(function (error){
		console.log(error);
	});
}

CourseController.prototype.courseContentDetail = function () {
	var req = this.req;
	var res = this.res;

	var _this = this;
	Course.Course.findById(req.params.id).then(function (course){
		var courseId = course.id;

		Course.CourseContent.findAndCountAll({ 
			where:{
				section_id:null,
				course_id:courseId
			},
			include:[{
				model: Course.CourseContent,
				as:'content',
			}],
			order:'content.id asc'
		}).then(function (result){
			var courseSections = result.rows;
			console.log(courseSections);
			course.update_status = getCourseUpdateStatusName(course.update_status);
			course.studynum = Utils.randomNumber(3);

			Course.CourseContent.findById(req.params.contentId).then(function (content) {
				console.log(content);
				res.render('course_detail',{ title: course.title , course: course, courseSections: courseSections, contentUrl: content.video_url});
			}).catch(function (error){
				console.log(error);
				res.render('course_detail',{ title : course.title , course: course, courseSections: courseSections, contentUrl: null});
			})
		}).catch(function (error){
			console.log(error);
		});
	}).catch(function (error){
		console.log(error);
	});
}

CourseController.prototype.courseSearch = function () {
	var req = this.req;
	var res = this.res;
	var _this = this;
	Course.Course.findAll({
		where:{
			$or:[
				{
					title:{
						$like:'%' + req.params.keyword + '%'
					}
				},
				{
					tip:{
						$like:'%' + req.params.keyword + '%'
					}
				},
				{
					description:{
						$like:'%' + req.params.keyword + '%'
					}
				}
			]
		},
		group:'id'
	}).then(function (courses){
		res.send(JSON.stringify(courses));
	});
}
CourseController.prototype.courseContentSearch = function () {
	var req = this.req;
	var res = this.res;
	var _this = this;
	Course.CourseContent.findAll({
		where:{
			$or:[
				{
					title:{
						$like:'%' + req.params.keyword + '%'
					}
				},
				{
					description:{
						$like:'%' + req.params.keyword + '%'
					}
				}
			]
		},
		group:'id'
	}).then(function (courseContents){
		res.send(JSON.stringify(courseContents));
	});
}

////////////////////////////////////////////////
function courseLevels() {
	return [
		{id:1,name:'基础'},
		{id:2,name:'进阶'}
	];
}
function getCourseUpdateStatusName(id) {
	switch(id) {
		case 1:
			return '计划中';
		case 2:
			return '更新中';
		case 3:
			return '更新完';
		default:
			return '状态未知';
	}
}
function courseUpdateStatus() {
	return [
		{id:1,name:'计划中'},
		{id:2,name:'更新中'},
		{id:3,name:'更新完'}
	];
}

module.exports = CourseController;