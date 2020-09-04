window.onscroll = function() {//监听滚动
	var aside = document.getElementById("aside")//侧栏
	var osTop = document.documentElement.scrollTop || document.body.scrollTop;//滚动条到顶部的距离
	if(document.body.clientWidth <= 1366) {//判断浏览器可视宽度是否小于1366
		if(osTop > 100) {
			aside.style.display = "none";
		}else if(osTop <= 100) {
			aside.style.display = "block";
		}
	}
}