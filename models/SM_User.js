var Sequelize = require('sequelize');
var sequelize = require('../modules/sequelize_db');
var config = require('config');

//User
var User = sequelize.define('study_user',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	name:Sequelize.STRING,
	mobile:{
		type:Sequelize.STRING(11),
		is:/^1[3|4|5|7|8]\d{9}$/
	},
	password:Sequelize.STRING,
});

User.sync({force:config.get('reinitDB')}).then(function(){
    console.log('User sync success');
}).catch(function(error){
    console.log('User sync failed:' + error);
});

module.exports = User;