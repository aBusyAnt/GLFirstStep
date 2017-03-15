var Sequelize = require('sequelize'),
	sequelize = require('../modules/sequelize_db'),
	config = require('config'),
	Article = require('./SM_Article');

var ArticleComment = sequelize.define('study_article_comment',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	markdown:Sequelize.TEXT,
});


Article.hasMany(ArticleComment,{foreignKey:'comment_id'});

ArticleComment.sync({force:true/*config.get('reinitDB')*/}).then(function(){
    console.log('ArticleComment sync success');
}).catch(function(error){
    console.log('ArticleComment sync failed:' + error);
});

module.exports = ArticleComment;