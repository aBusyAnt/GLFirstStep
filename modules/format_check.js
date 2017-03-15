
//Test Site:http://refiddle.com/

function FormatCheck(){
}

/*******Register input Check*******/

FormatCheck.mobile = function mobile(mobile){
	// var patt = /1(3[0-9]|4[57]|5[0-35-9]|8[0-9]|70)\d{8}/gm;
	var patt = /^1[3|4|5|7|8]\d{9}$/gm;
	return patt.test(mobile);
};
FormatCheck.nickname = function nickname(name){
	var patt = /[a-zA-Z0-9]{1,250}/;
	return patt.test(name);
};
FormatCheck.password = function password(password){
	var patt = /[a-zA-Z0-9~@#$%^&*]{6,64}/;
	return patt.test(password);
};
FormatCheck.verifycode = function verifycode(verifycode){
	var patt = /\d{6}/;
	return patt.test(verifycode);
};



FormatCheck.id = function id(id){
	var patt = /\d/;
	return patt.test(id);
};

module.exports = FormatCheck;