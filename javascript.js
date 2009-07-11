
function pad(num){
	if(num < 10) num = '0'+num;
	return num;
}
function offSet(hours){
	return (hours % 3);
}
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var Maps = function(area){
	this.area = area;
	this.d = new Date();
	this.d.setMinutes(0);
	this.startTime = this.d.getHours() - offSet(this.d.getHours())
	this.dates = this.getDays();
	this.images = this.populateDays();
	this.currentImage = 0;
}
Maps.prototype.increment = function(i){
	if((this.currentImage + i) > -1 && (this.currentImage + i) < this.images.length){
		this.currentImage = this.currentImage + i;
		next = this.currentImage;
		document.getElementById('map').src = this.images[next].url;
		var display_hour = this.images[next].date.getHours();
		if(display_hour < 10) display_hour = '0'+display_hour;
		var t = days[this.images[next].date.getDay()] + ' ' + display_hour + ':00';
		document.getElementById('date').innerHTML = t;
	}
}
Maps.prototype.getDays = function(){
	var dates = new Array(4);
	for(var i = 0; i < 5; i++){
		var year = String(this.d.getFullYear()).substring(2);
		var month = pad(this.d.getMonth()+1);
		var date = pad(this.d.getDate());
		dates[i] = {"date": new Date(this.d), "url": year+month+date};
		this.d.setDate(this.d.getDate()+1);
	}
	return dates;
}
Maps.prototype.populateDays = function(){
	var j = 0;
	var hour = this.startTime;
	var images = new Array()
	for(date in this.dates){
		if(j > 0){
			hour = 0;
		}
		while(hour < 24){
			if(hour == 24){
				url_hour = '00' 
			} else {
				url_hour = pad(hour);
			}
			var url = "http://www.bbc.co.uk/weather/charts/uk/"+this.area+"_cloudrain_" + this.dates[date].url + url_hour + ".jpg";
			var i = new Image();
			i.src = url;
			images[j++] = {
				"url" : url,
				"image" : i,
				'date': new Date(this.dates[date].date.setHours(hour)) };
			if(j < 9){
				hour = hour + 3;
			} else {
				if(hour < 12)
					hour = 12;
				else 
					hour = 24;
			}

		}
	}
	return images;
}
var currentMaps;

$(document).ready(function(){
	$(".location").click(function(){
		var self = this;
		$('.sliding').animate({'left':'-320px'}, function(){
			currentMaps = new Maps($(self).attr('location'));
			currentMaps.increment(0);
		});
	});
	$(".back").click(function(){
		$('.sliding').animate({'left':'0px'}, function(){
			$("#map").attr('src','loading.jpg');
		});
	});
	var currentMaps = new Maps('se');
	document.getElementById('back').onclick = function(){
		currentMaps.increment(-1);
	};
	document.getElementById('forward').onclick = function(){
		currentMaps.increment(+1);
	};
	document.getElementById('map').onclick = function(){
		currentMaps.increment(+1);
	};
	currentMaps.increment(0);
	
});
