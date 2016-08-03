window.onload= function(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://usweb.dotomi.com/resources/swfs/circles.json', false);
	xhr.onreadystatechange = function(){
		console.log(percentTween(50,'x'));
		console.log("width: ", window.innerWidth);
		if(xhr.readyState==4 && xhr.status==200){
			var circles = JSON.parse(xhr.response).numOfCircles;
			var tl = new TimelineMax({repeat:-1});

			for(var i=0;i<circles;i++){
				var tempCircle = document.createElement('div');
				addListener(tempCircle,["click","mouseover"], getColor);


				tempCircle.classList.add('circle');
				document.body.appendChild(tempCircle);
				tl.to(tempCircle, 1, {rotation:360,transformOrigin:"50px 50px", x:percentTween(50,'x')});
			}			
		}
	};
	xhr.send();

	
	function getColor() {
	    var chars = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += chars[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

	function addListener(elmt, eventArray, func){
		eventArray.forEach(function(evt){
			elmt.addEventListener(evt, function(){
				this.style.backgroundColor = func();
			})
		})
	}

	function percentTween(percent, axis){
		if(axis=='x'){
			return window.innerWidth*(percent/100);
		} else {
			return window.innerHeight*(percent/100);
		}
	}
}