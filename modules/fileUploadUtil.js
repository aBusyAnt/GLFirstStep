var multer = require('multer');
var Utils = require('./utils');
var config = require('config');

function FileUploadUtil(){
}
function destFilenameRandString(req){
	var sid = req.session.sid;
	if (Utils.isNull(sid)) {
		sid = 'admin__';
	}
	var timestamp = new Date().getTime();
	var randString = Utils.randomString(16);
	var destFilename = sid + '_' + timestamp + '_' + randString;
	return destFilename;
}

function getStorageParams(prefix){
	return {
		destination: function(req, file, cb){
			cb(null, __dirname + '/../uploads/');
		}, 
		filename: function(req, file, cb){			
			var fileFormat = (file.originalname).split(".");
			var target_path = prefix + destFilenameRandString(req) + '.' + fileFormat[1];
			cb(null, target_path);
		}
	}
}

FileUploadUtil.bookCoverUpload = function (){
	return multer({
		storage:multer.diskStorage(getStorageParams('bookcover_'))
	});
} 

FileUploadUtil.courseCoverUpload = function (){
	return multer({
		storage:multer.diskStorage(getStorageParams('coursecover_'))
	});
} 



module.exports = FileUploadUtil;

