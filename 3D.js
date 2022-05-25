var map = document.getElementById("map")
var ctx = map.getContext("2d");
var block = 50;
var x = 0;
var y = 0;
var xL = 0;
var yL = 0;
var RayX = 0;
var RayY = 0;
var arc = 90;
var l = 0;
var lF = 0;
var length;
var degry = 1;
var offset = 0;
var rotation = 0;
var monitor;
var monitorL;
var circleF = {
	coordinateX : 200,
	coordinateY : 200,
};
var mapX = 0;
var mapY = 0;
var map = {
	0 : ["#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
	1 : ["#","_","_","_","_","_","#","_","_","_","_","_","_","#"],
	2 : ["#","_","#","#","#","_","#","#","#","#","#","#","_","#"],
	3 : ["#","_","#","_","_","_","_","_","_","_","_","#","_","#"],
	4 : ["#","_","_","_","_","_","#","#","_","#","_","_","_","#"],
	5 : ["#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
};
var circle = function(color, x, y, radius) {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.arc(x, y, radius, 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
};
var render = function() {
	x = 0;
	y = 0;
	for (var i = 0; i < 6 * map[0].length; i++) {
		if (map[y][x] === "#") {
			ctx.fillStyle = "Black";
			ctx.fillRect(x * block, y * block, block, block);
			ctx.fillStyle = "Red";
			ctx.fillRect(0, 0, 10, 10);
		};
		if (x === map[0].length - 1) {
			y++
			x = 0;
		} else{
			x++;
		};
	};
};
$("#map").click(function(event) {
	// console.log((event.pageX) + "X|Y" + (event.pageY));
	// console.log(offset);
});
var rayCastF = function (xRF, xF, yRF, yF) {
	x = xF;
	y = yF;
	ctx.lineTo((circleF.coordinateX + xF), (circleF.coordinateY + yF));
	for (var o = 0; o < 300; o++) {
		mapY = Math.floor((circleF.coordinateY + yRF + y));
		mapX = Math.floor((circleF.coordinateX + xRF + x));
		if (mapTest(mapX, mapY) === false) {
			monitor = 1920 / 90;
			length = Math.sqrt(Math.pow(x , 2) + Math.pow(y, 2)) / 100;
			if (length < 1.6) {
				ctx.fillStyle = "#61666A";
			} else if (length < 2.6) {
				ctx.fillStyle = "#55595d";
			} else {
			ctx.fillStyle = "#3c4042";
			};
			ctx.fillRect(monitor * monitorL, 450 - ((150 / length) / 2), monitor + 0.75, 150 / length);
			o = 300;
		};
		if (mapTest(mapX, mapY) === true) {
			ctx.lineTo((circleF.coordinateX + xRF + x), (circleF.coordinateY + yRF + y));
			x = x + xRF;
			y = y + yRF;
		};
	};
	monitorL++;
};
var floorRender = function() {
	ctx.fillStyle = "DarkGray";
	ctx.fillRect(0, 450, 1920, 550);
};
var rayCollision = function(xRF, yRF) {
	xL = 0;
	yL = 0;
	for (var o = 0; o < 11; o++) {
		mapY = Math.floor((circleF.coordinateY + 1 + yL));
		mapX = Math.floor((circleF.coordinateX + 1 + xL));
		if (mapTest(mapX, mapY) === false) {
			length = Math.sqrt(Math.pow(xL , 2) + Math.pow(yL, 2)) / 100;
			return true;
		};
		if (mapTest(mapX, mapY) === true) {
			xL = xL + xRF;
			yL = yL + yRF;
		};
	};
};
var rayCast = function() {
	offset = 0;
	ctx.lineWidth = 2;
	monitorL = 0;
	l = rotation;
	for (var i = 0; i < arc; i++) {
		y = Math.sqrt(Math.pow(block / 5 , 2) / (1 + Math.pow(Math.tan((l) * Math.PI / 180), 2)));
		x = Math.sqrt((block/5)*(block/5) - (y * y));
		ctx.beginPath();
		ctx.moveTo(circleF.coordinateX, circleF.coordinateY);
		RayY = Math.sqrt(Math.pow(1, 2) / (1 + Math.pow(Math.tan((l) * Math.PI / 180), 2)));
		RayX = Math.sqrt(Math.pow(1, 2) - Math.pow(RayY, 2));
		// console.log(l);
		if (l > 270) {
			offset = 3;
		} else if (l > 180) {
			offset = 2;
		} else if (l > 90) {
			offset = 1;
		} else {
			offset = 0;
		};
		if (l > 360) {
			offset = 0;
			l = 0;
		};
		if (rotation > 360) {
			rotation = 0;
		}
		if (offset === 0) {
			ctx.strokeStyle = "Red";
			rayCastF(RayX, x, RayY, y);
		} else if (offset === 1) {
			ctx.strokeStyle = "Blue";
			rayCastF(RayX, x, -RayY, -y);
		} else if(offset === 2) {
			ctx.strokeStyle = "Green";
			rayCastF(-RayX, -x, -RayY, -y);
		} else if (offset = 3) {
			ctx.strokeStyle = "Yellow";
			rayCastF(-RayX, -x, RayY, y);
		};
		l = l + degry;
		ctx.stroke();
	};
};
$("body").keydown(function(event) { //keybord detector33
	y = Math.floor(Math.sqrt(10 / (1 + Math.pow(Math.tan((45 + rotation) * Math.PI / 180), 2))));
	x = Math.sqrt((10) - Math.pow(Math.floor(Math.sqrt(10 / (1 + Math.pow(Math.tan((45) * Math.PI / 180), 2)))),2));
	switch(event.keyCode){
		case 83:
			if (rotation >= 0 && rotation < 45) {
				circleF.coordinateY = circleF.coordinateY - y;
				circleF.coordinateX = circleF.coordinateX - x;
			} else if (rotation >= 45 && rotation < 135) {
				circleF.coordinateY = circleF.coordinateY + y;
				circleF.coordinateX = circleF.coordinateX - x;
			} else if (rotation >= 135 && rotation < 225) {
				circleF.coordinateY = circleF.coordinateY + y;
				circleF.coordinateX = circleF.coordinateX + x;
			} else if (rotation >= 225 && rotation < 310) {
				circleF.coordinateY = circleF.coordinateY - y;
				circleF.coordinateX = circleF.coordinateX + x;
			};
			break;
		case 87:
			if (rotation >= 0 && rotation < 45 && rayCollision(1, 1) !== true) {
				circleF.coordinateY = circleF.coordinateY + y;
				circleF.coordinateX = circleF.coordinateX + x;
			} else if (rotation >= 45 && rotation < 135 && rayCollision(1, -1) !== true){
				circleF.coordinateY = circleF.coordinateY - y;
				circleF.coordinateX = circleF.coordinateX + x;
			} else if (rotation >= 135 && rotation < 225 && rayCollision(-1, 1) !== true) {
				circleF.coordinateY = circleF.coordinateY - y;
				circleF.coordinateX = circleF.coordinateX - x;
			} else if (rotation >= 225 && rotation < 360 && rayCollision(-1, -1) !== true) {
				circleF.coordinateY = circleF.coordinateY + y;
				circleF.coordinateX = circleF.coordinateX - x;
			};
			break;
		case 49:
			offset = 0;
			break;
		case 50:
			offset = 1;
			break;
		case 51:
			offset = 2;
			break;
		case 52:
			offset = 3;
			break;
		case 65: 
			// lF--;
			rotation--;
			break;
		case 68:
			rotation++;
			// lF++;
			break
	};
});
 setInterval(function() {
 	ctx.clearRect(0, 0, 2000, 1000);
	// render();
	circle("#61666A", circleF.coordinateX, circleF.coordinateY, block/5);
	floorRender();
	rayCast();
},16);