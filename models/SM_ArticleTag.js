var Sequelize = require('sequelize'),
	sequelize = require('../modules/sequelize_db'),
	config = require('config');

var ArticleTag = sequelize.define('study_article_tag',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	name:Sequelize.STRING,
});

ArticleTag.sync({force:config.get('reinitDB')}).then(function(){
    console.log('ArticleTag sync success');
}).catch(function(error){
    console.log('ArticleTag sync failed:' + error);
});

module.exports = ArticleTag;