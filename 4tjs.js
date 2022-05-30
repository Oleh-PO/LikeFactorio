var map = document.getElementById("map")
var ctx = map.getContext("2d");
var block = 50;
var seeLenght = 6;
var rotation = 0;
var arc = 90;
var degry = 1;
var monitor = 1920 / (arc / degry);
var key = {
	87 : "w",
	68 : "d",
	65 : "a",
	83 : "s",
	32 : "spase",
};
var length;
var x;
var y;
var player = function (color, radius) {
	this.x = block * 4;
	this.y = block * 4;
	this.color = color;
	this.radius = radius;
	this.rotation = 0;
	this.L = this.rotation;
};
player.prototype.drowplayer = function() {
	ctx.beginPath();
	ctx.strokeStyle = this.color;
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
};
player.prototype.ray = function (L) {
	ctx.beginPath();
	ctx.strokeStyle = "Blue";
	ctx.moveTo(this.x, this.y);
	y = Math.sqrt(1 / (1 + Math.pow(Math.tan((L) * Math.PI / 180), 2)));
	x = Math.sqrt(1 - (y * y));
	if (L > 270) {
		x = -x;
	} else if (L > 180) {
		x = -x;
		y = -y;
	} else if (L > 90) {
		y = -y;
	};
	ctx.lineTo(this.x + x * this.radius, this.y + y * this.radius);
	for (var o = 0; o < block * seeLenght; o++) {
		if (mapTest(Math.floor(this.x + x * this.radius + x * o), Math.floor(this.y + y * this.radius + y * o)) === true) {
			ctx.lineTo(this.x + x * this.radius + x * o, this.y + y * this.radius + y * o);
		} else {
			length = Math.sqrt(Math.pow(x * o, 2) + Math.pow(y * o, 2)) / 100;
			ctx.stroke();
			return length;
		};
	};
	ctx.stroke();
};
var one = new player("#61666A", block/5);
player.prototype.rayCast = function () {
	for (var i = 0; i < (arc / degry); i++) {
		length = this.ray(this.L);
		if (length < 1.6) {
				ctx.fillStyle = "#61666A";
		} else if (length < 2.6) {
				ctx.fillStyle = "#55595d";
		} else {
			ctx.fillStyle = "#3c4042";
		};
		ctx.fillRect(monitor * i, 450 - ((150 / length) / 2), monitor + 0.9, 150 / length);
		this.L = this.L + degry;
		if (this.L > 360) {
			this.L = 0;
		};
		if (this.rotation > 360) {
			this.rotation = 0;
		};
	};
	this.L = this.rotation;
};
player.prototype.move = function () {
	y = Math.sqrt(Math.pow(block / 10 , 2) / (1 + Math.pow(Math.tan((this.L + 45) * Math.PI / 180), 2)));
	x = Math.sqrt((block/10)*(block/10) - (y * y));
	if (this.L + 45 > 270) {
		x = -x;
	} else if (this.L + 45 > 180) {
		x = -x;
		y = -y;
	} else if (this.L + 45 > 90) {
		y = -y;
	};
	this.x = this.x + x;
	this.y = this.y + y;
};
$("body").keydown(function(event) {
	console.log(event.keyCode);
	switch (key[event.keyCode]) {
		case "w":
			one.move();
			break;
		case "a":
			one.rotation = one.rotation - 2;
			if (one.rotation < 0) {
				one.rotation = one.rotation + 360;
			};
			break;
		case "d": 
			one.rotation = one.rotation + 2;
			break;
	};
});
setInterval(function() {
	ctx.clearRect(0, 0, 2000, 1000);
	one.drowplayer();
	one.rayCast();
	// one.rotation++;
}, 16);