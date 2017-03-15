var Sequelize = require('sequelize');
var config = require('config');
var theconfig = {
	ssl: config.get('database.ssl'),
	type: config.get('database.type'),
	user: config.get('database.user'),
	password: config.get('database.password'),
	host: config.get('database.host'),
	database: config.get('database.database') 
}

var sequelize = new Sequelize(theconfig.database, theconfig.user, theconfig.password, {
  host: theconfig.host,
  dialect:theconfig.type,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
        ssl: theconfig.ssl
  }

});
module.exports = sequelize;