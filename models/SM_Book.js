
var Sequelize = require('sequelize');
var sequelize = require('../modules/sequelize_db');
var BookCategory = require('./SM_BookCategory');
var config = require('config');

//Book
var Book = sequelize.define('study_book',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	name:Sequelize.STRING,
	summary:Sequelize.TEXT,
	cover_url:Sequelize.STRING,
	download_url:Sequelize.STRING,
	download_remark:Sequelize.STRING,
	markdown:Sequelize.TEXT,
	visit_number:{type:Sequelize.INTEGER,defaultValue:0},
	download_number:{type:Sequelize.INTEGER,defaultValue:0},
	publishing_house:Sequelize.STRING,
	publishing_date:Sequelize.DATE,
	douban_rate:{type:Sequelize.DECIMAL(10,2),defaultValue:0},
	buy_url:Sequelize.STRING,
	buy_remark:Sequelize.STRING,
});

Book.belongsTo(BookCategory,{foreignKey:'book_category_id'});
BookCategory.hasMany(Book,{foreignKey:'book_category_id'});

Book.sync({force:config.get('reinitDB')}).then(function(){
    console.log('Book sync success');
}).catch(function(error){
    console.log('Book sync failed:' + error);
});

module.exports = Book;

