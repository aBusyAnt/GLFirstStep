var Sequelize = require('sequelize'),
	sequelize = require('../modules/sequelize_db'),
	config = require('config'),
	Article = require('./SM_Article'),
	ArticleTag = require('./SM_ArticleTag');

var ArticleTagF = sequelize.define('study_f_article_tag',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	}
});

Article.belongsToMany(ArticleTag,{
	as:{
		singular:'tag',
		plural: 'tags'
	},
	through:{
		model:ArticleTagF,
	},
	foreignKey:'article_id'
});

ArticleTag.belongsToMany(Article,{
	as:{
		singular:'article',
		plural: 'articles'
	},
	through:{
		model:ArticleTagF,
	},
	foreignKey:'article_tag_id'
});


ArticleTagF.sync({force:config.get('reinitDB')}).then(function(result){
    console.log('ArticleTagF sync success');
    console.log(result);
}).catch(function(error){
    console.log('ArticleTagF sync failed:' + error);
});

module.exports = ArticleTagF;