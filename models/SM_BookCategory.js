
var Sequelize = require('sequelize');
var sequelize = require('../modules/sequelize_db');
var config = require('config');

//Book
var BookCategory = sequelize.define('study_book_category',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	name:Sequelize.STRING,
	number:Sequelize.INTEGER
});

BookCategory.sync({force:config.get('reinitDB')}).then(function(){
    console.log('BookCategory sync success');
}).catch(function(error){
    console.log('BookCategory sync failed:' + error);
});

module.exports = BookCategory;