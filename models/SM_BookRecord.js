var Sequelize = require('sequelize');
var sequelize = require('../modules/sequelize_db');
var config = require('config');
var User = require('./SM_User');
var Book = require('./SM_Book');

//BookRecord
var BookRecord = sequelize.define('study_book_record',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	op:Sequelize.ENUM('download', 'browse','favorite','buy'),
	remote_address:Sequelize.STRING
});

Book.hasMany(BookRecord,{as:'book',foreignKey:'study_book_id'});
User.hasMany(BookRecord,{as:'user',foreignKey:'study_user_id'});

BookRecord.sync(/*{force:config.get('reinitDB')}*/).then(function(){
    console.log('BookRecord sync success');
}).catch(function(error){
    console.log('BookRecord sync failed:' + error);
});

module.exports = BookRecord;