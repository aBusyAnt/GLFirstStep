var Sequelize = require('sequelize'),
	sequelize = require('../modules/sequelize_db'),
	config = require('config'),
	User = require('./SM_User');

//////////////////////////////////////////////////////////////
var CourseCategory = sequelize.define('study_course_category',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	name:Sequelize.STRING,
});

CourseCategory.sync().then(function(){
    console.log('CourseCategory sync success');
}).catch(function(error){
    console.log('CourseCategory sync failed:' + error);
});


//////////////////////////////////////////////////////////////
var Course = sequelize.define('study_course',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	title:Sequelize.STRING,
	description:Sequelize.STRING(2048),
	cover_url:Sequelize.STRING,
	price:Sequelize.DECIMAL(10, 2),
	level:{type:Sequelize.INTEGER,defaultValue:1},
	update_status:{type:Sequelize.INTEGER,defaultValue:1},
	tip:Sequelize.STRING
});

Course.belongsTo(CourseCategory,{foreignKey:'course_category_id'});
CourseCategory.hasMany(Course,{foreignKey:'course_category_id'});

Course.sync().then(function(){
    console.log('Course sync success');
}).catch(function(error){
    console.log('Course sync failed:' + error);
});

//////////////////////////////////////////////////////////////
var CourseContent = sequelize.define('study_course_content',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	title:Sequelize.STRING,
	description:Sequelize.STRING(2048),
	sequence:Sequelize.INTEGER,
	duration:Sequelize.INTEGER,
	video_url:Sequelize.STRING(1024),
});

CourseContent.hasMany(CourseContent, {as: 'content',foreignKey:'section_id'});
CourseContent.belongsTo(CourseContent,{as:'section',foreignKey:'section_id'});

CourseContent.belongsTo(Course,{foreignKey:'course_id'});
Course.hasMany(CourseContent,{foreignKey:'course_id'});

CourseContent.sync().then(function(){
    console.log('CourseContent sync success');
}).catch(function(error){
    console.log('CourseContent sync failed:' + error);
});

//////////////////////////////////////////////////////////////
var CourseMemberF = sequelize.define('study_course_member',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	}
});


User.belongsToMany(Course,{
	as:{
		singular:'course',
		plural: 'courses'
	},
	through:{
		model:CourseMemberF,
	},
	foreignKey:'user_id'
});

Course.belongsToMany(User,{
	as:{
		singular:'user',
		plural: 'users'
	},
	through:{
		model:CourseMemberF,
	},
	foreignKey:'course_id'
});

CourseMemberF.sync().then(function(){
    console.log('CourseMemberF sync success');
}).catch(function(error){
    console.log('CourseMemberF sync failed:' + error);
});

//////////////////////////////////////////////////////////////
var CourseContentRecordF = sequelize.define('study_course_content_record',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	}
});

User.belongsToMany(CourseContent,{
	as:{
		singular:'coursecontent',
		plural: 'coursecontents'
	},
	through:{
		model:CourseContentRecordF,
	},
	foreignKey:'user_id'
});

CourseContent.belongsToMany(User,{
	as:{
		singular:'user',
		plural: 'users'
	},
	through:{
		model:CourseContentRecordF,
	},
	foreignKey:'course_content_id'
});

CourseContentRecordF.sync().then(function(){
    console.log('CourseContentRecordF sync success');
}).catch(function(error){
    console.log('CourseContentRecordF sync failed:' + error);
});




//////////////////////////////////////////////////////////////
module.exports = {
	CourseCategory:CourseCategory,
	Course:Course,
	CourseContent:CourseContent,
	CourseMemberF:CourseMemberF,
	CourseContentRecordF:CourseContentRecordF
}