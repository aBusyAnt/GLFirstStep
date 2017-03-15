var query = require('./db');
var Q = require('q');

function KanjiaClient() {
	console.log('KanjiaClient INIT...');
}

KanjiaClient.prototype.query_promotion = function(wx_mp_id,kanjia_config_id) {
	var deferred = Q.defer();
	console.log(this.t_kanjia);
	query('select * from kanjia_config where wx_mp_id = $1::int and id = $2::int',[wx_mp_id,kanjia_config_id],function(err,rows,result){
		console.log(err);
		if (err) {
			deferred.reject(err);
		} else {
			console.log('query rs ' + rows.length);
			deferred.resolve(result.rows);
		}
	});
	return deferred.promise;
};

module.exports = new KanjiaClient();