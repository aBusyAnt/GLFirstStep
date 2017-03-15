var Sequelize = require('sequelize');
var sequelize = require('../modules/sequelize_db');
var config = require('config');

var AdminRole = sequelize.define('admin_role',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	name:Sequelize.STRING,
	number:Sequelize.INTEGER
});

AdminRole.sync({force:config.get('reinitDB')}).then(function(){
    console.log('AdminRole sync success');
}).catch(function(error){
    console.log('AdminRole sync failed:' + error);
});

module.exports = AdminRole;