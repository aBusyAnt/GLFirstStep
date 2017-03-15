var Sequelize = require('sequelize');
var sequelize = require('../modules/sequelize_db');
var config = require('config');

var RedirectUrl = sequelize.define('redirect_url',{
	id:{
		type:Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey:true
	},
	redirect_url:Sequelize.STRING,
	original_url:Sequelize.STRING,
	access_number:Sequelize.INTEGER
});


RedirectUrl.sync(/*{force:config.get('reinitDB')}*/).then(function(){
    console.log('RedirectUrl sync success');
}).catch(function(error){
    console.log('RedirectUrl sync failed:' + error);
});


module.exports = RedirectUrl;