function removeAllChildForParentId(nodeId)
{
    var homelogin = document.getElementById(nodeId);
    while(homelogin.hasChildNodes())
    {
        homelogin.removeChild(homelogin.firstChild);
    }
}
function isNull(varable) {
	return typeof varable === 'undefined' || !varable;
}
function isLogined(){
	return !isNull($.cookie('userIsLogined',{ path: '/user'})) && 
		   !isNull($.cookie('userId',{ path: '/user'})) && 
		   !isNull($.cookie('userMobile',{ path: '/user'})); 
}

function getRootPath() {
	return window.location.protocol + '//' + window.location.host;
    // var pathName = window.location.pathname.substring(1);
    // var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    // if (webName == "") {
    //     return window.location.protocol + '//' + window.location.host;
    // }
    // else {
    //     return window.location.protocol + '//' + window.location.host + '/' + webName;
    // }
}
function checkLogin(){
	removeAllChildForParentId('home-login');
	if (isLogined()){
		var userCenterDom = "<li><a href=\"";
		userCenterDom += getRootPath(); 
		userCenterDom += "/usercenter\">个人中心</a></li>"
		
		var logoutDom = "<li><a href=\"";
		logoutDom += getRootPath();
		logoutDom += "/users/logout\"注销</a></li>";
		$('#home-login').append(userCenterDom);		
		$('#home-login').append(logoutDom);	
	} else {
		var regDom = "<li><a href=\""
		regDom +=  getRootPath();
		regDom += "/users/reg\">注册</a></li>";

        var loginDom = "<li><a href=\"";
        loginDom +=  getRootPath();
        loginDom += "/users/login\">登录</a></li>"

		$('#home-login').append(regDom);
		$('#home-login').append(loginDom);
	}
}

