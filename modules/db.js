var query = require('pg-query');
var config = require('config');

var theconfig = {
	ssl: config.get('database.ssl'),
	type: config.get('database.type'),
	user: config.get('database.user'),
	password: config.get('database.password'),
	host: config.get('database.host'),
	database: config.get('database.database') 
}

var connectString = theconfig.type + '://' + theconfig.user + ':' + theconfig.password + '@' + theconfig.host + '/' + theconfig.database + '?ssl=' + theconfig.ssl; 

query.connectionParameters = connectString;

module.exports = query;


