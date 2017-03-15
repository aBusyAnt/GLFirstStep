var Sequelize = require('sequelize'),
	sequelize = require('../modules/sequelize_db'),
	config = require('config'),
	Article = require('./SM_Article'),
	User = require('./SM_User');

var ArticleBrowseRecord = sequelize.define('study_article_browserecord',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	remote_address:Sequelize.STRING
});

Article.hasMany(ArticleBrowseRecord,{foreignKey:'article_id'});
User.hasMany(ArticleBrowseRecord,{foreignKey:'user_id'});

ArticleBrowseRecord.sync(/*{force:config.get('reinitDB')}*/).then(function(){
    console.log('ArticleBrowseRecord sync success');
}).catch(function(error){
    console.log('ArticleBrowseRecord sync failed:' + error);
});

module.exports = ArticleBrowseRecord;