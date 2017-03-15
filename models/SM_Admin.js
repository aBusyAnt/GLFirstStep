var Sequelize = require('sequelize');
var sequelize = require('../modules/sequelize_db');
var AdminRole = require('./SM_AdminRole');
var config = require('config');

var Admin = sequelize.define('admin',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	name:Sequelize.STRING,
	password:Sequelize.STRING,
	nickname:Sequelize.STRING
});

Admin.belongsTo(AdminRole,{foreignKey:'admin_role_id'});
AdminRole.hasMany(Admin,{foreignKey:'admin_role_id'});

Admin.sync({force:config.get('reinitDB')}).then(function(){
    console.log('Admin sync success');
}).catch(function(error){
    console.log('Admin sync failed:' + error);
});

module.exports = Admin;