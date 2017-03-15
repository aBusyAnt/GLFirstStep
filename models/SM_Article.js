var Sequelize = require('sequelize'),
	sequelize = require('../modules/sequelize_db'),
	config = require('config'),
	Admin = require('./SM_Admin');

var Article = sequelize.define('study_article',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	title:Sequelize.STRING,
	markdown:Sequelize.TEXT,
	cover_url:Sequelize.STRING,
});

Article.belongsTo(Admin,{as:'author',foreignKey:'author_id'});

Article.sync({force:config.get('reinitDB')}).then(function(){
    console.log('Article sync success');
}).catch(function(error){
    console.log('Article sync failed:' + error);
});

module.exports = Article;