
var count,counts = 90;
var $btn = $("#form-mobile-verifycode");
$btn.on('click',function(e){
	var mobile = $("#mobile").val();
	$btn.button('loading');
	$('#userRegBtn').attr("disabled",true);
	$.ajax({
		type:'post',
		url:'/verifycode/reg',
		async:true,
		data:{
			mobile:mobile
		},success:function(res){
			console.log(res);
			if(res){
				$('#userRegBtn').attr("disabled",false);
				alert('验证码已发送');
				sendCount();
			}
		},error:function(res){
			alert('验证码发送失败');
			$btn.button('重试');
		}
	});
});

function sendCount(){
	count = counts;
	$btn.addClass("disable");
	var timer = setInterval(function(){
		if(count == 0){
			clearInterval(timer);
			$btn.removeClass("disabled");
			$btn.button('发送验证码');
		}else {
			$btn.addClass("disabled");
			count--;
			$btn.html("剩余" + count + "秒");
		}
	},1000);
}
