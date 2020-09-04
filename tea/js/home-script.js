window.onload = function() {
	function $(selector) {
		let el = document.querySelectorAll(selector);
		if (el.length == 1) return el[0];
		if (el.length > 1) return el;
		return false;
	}
	
				
	Carousel.prototype.changeStyle = function(i,now) {
		this.li_list[i].classList.toggle("now");
		this.li_list[now].classList.toggle("now");
		this.spot_list[i].classList.toggle("spot-now");
		this.spot_list[now].classList.toggle("spot-now");
	}
	
	Carousel.prototype.judgeIndex = function(i,order) {
		var left = this.li_list[0].style.marginLeft;
		var width = this.li_list[0].offsetWidth;
		if(order == "left") {
			if(i == 0) {
				this.li_list[0].style.marginLeft = -(this.li_list.length - 1)*width + "px";
				var now = this.li_list.length - 1;
			} else {
				this.li_list[0].style.marginLeft = parseInt(left) + width + "px";
				var now = i - 1;
			}
		} else if(order == "right") {
			if(i == this.li_list.length - 1) {
				this.li_list[0].style.marginLeft = "0px";
				var now = 0;
			} else {
				this.li_list[0].style.marginLeft = parseInt(left) - width + "px";
				var now = i + 1;
			}
		}
		this.changeStyle(i,now);
	}
	
	Carousel.prototype.findListIndex = function() {
		for(let i = 0; i < this.li_list.length; i++) {
			if(this.li_list[i].getAttribute("class") == "now") return i;
		}
		return -1;
	}
	
	Carousel.prototype.addSpot = function(getSpot) {
		if(getSpot) {
			this.nav.style.display = "flex";
		} else {
			this.nav.style.display = "none";
		}
	}
	
	
	
	Carousel.prototype.listenerSpot = function(spotClickable) {
		var _this = this;
			
		for(let spot_i = 0; spot_i < this.spot_list.length; spot_i++) {
			if(spotClickable) {
				this.spot_list[spot_i].addEventListener("click",function() {
					var index = _this.findListIndex(_this.li_list);
					var now = spot_i;
					_this.li_list[0].style.marginLeft = -(now)*_this.li_list[0].offsetWidth + "px";
					_this.changeStyle(index,now);
				});
			}
		}
	}
	
	Carousel.prototype.autoPlay = function(flag) {
		var _this = this;
		if(flag) {
			_this.autoInterval = setInterval(function() {
				var index = _this.findListIndex();
				_this.judgeIndex(index,_this.direction);
			},_this.interval_time);
		} else {
			if(_this.autoInterval !== undefined) {
				clearInterval(_this.autoInterval);
			}
		}
	}
	
	
	function Carousel(selector,option) {
		var _this = this;
		
		this.li_list = $(selector + " li");
		this.nav = $(selector + " .nav");
		this.spot_list = $(selector + " .spot");
		this.left = $(selector + " .left");
		this.right = $(selector + " .right");
		
		this.nav.style.display = "none";
		this.li_list[0].style.marginLeft = "0px";
		this.flag = false;
		this.interval_time = 2000;
		this.direction = "right";
		this.getSpot = false;
		this.spotClickable = false;
		this.autoInterval;
		
		if(option !== undefined) {
			if(option.flag !== undefined) this.flag = option.flag;
			if(option.interval_time !== undefined) this.interval_time = option.interval_time;
			if(option.direction !== undefined) this.direction = option.direction;
			if(option.getSpot !== undefined) this.getSpot = option.getSpot;
			if(option.spotClickable !== undefined) this.spotClickable = option.spotClickable;
		}
		
		this.left.addEventListener("click",function() {
			var index = _this.findListIndex(_this.li_list);
			_this.judgeIndex(index,"left");
		})
		
		this.right.addEventListener("click",function() {
			var index = _this.findListIndex(_this.li_list);
			_this.judgeIndex(index,"right");
		})
		
		this.addSpot(this.getSpot);
		
		this.listenerSpot(this.spotClickable);
		
		this.autoPlay(this.flag);
	}
	
	
	var carousel1 = new Carousel("#carousel1",{
		"flag" : true,
		"getSpot" : true
	});
}