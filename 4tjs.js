var map = document.getElementById("map")
var ctx = map.getContext("2d");
var block = 50;
var seeLenght = 6;
var rotation = 0;
var arc = 90;
var degry = 1;
var multiplayer = 2;
var monitor = ((1920) / (arc / degry)) / multiplayer;
var key = {
	87 : "w",
	68 : "d",
	65 : "a",
	83 : "s",
	32 : "spase",
	39 : "->",
	37 : "<-",
	38 : "^",
	40 : "_",
};
var length;
var x;
var y;
var player = function (color, radius, number) {
	this.x = block * 4;
	this.y = block * 4;
	this.color = color;
	this.radius = radius;
	this.rotation = 0;
	this.L = this.rotation;
	this.id = number;
};
player.prototype.drowplayer = function() {
	ctx.beginPath();
	ctx.strokeStyle = this.color;
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
};
player.prototype.ray = function (L, color) {
	ctx.beginPath();
	ctx.strokeStyle = color;
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
			whatIlook(Math.floor(this.x + x * this.radius + x * o), Math.floor(this.y + y * this.radius + y * o), length);
			return length;
		};
	};
	ctx.stroke();
};
var one = new player("Red", block/5, 1);
var two = new player("Blue", block/5, 2);
player.prototype.rayCast = function () {
	for (var i = 0; i < (arc / degry); i++) {
		length = this.ray(this.L, this.color);
		// if (length < 1.6) {
		// 		ctx.fillStyle = "#61666A";
		// } else if (length < 2.6) {
		// 		ctx.fillStyle = "#55595d";
		// } else {
		// 	ctx.fillStyle = "#3c4042";
		// };
		ctx.fillRect((monitor * i) + (monitor * arc) * (this.id - 1), 450 - ((150 / length) / 2), monitor + 0.9, 150 / length);
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
	if(this.ray(this.rotation + arc / 2, "Black") > this.radius / 100) {
		y = Math.sqrt(Math.pow(block / 10 , 2) / (1 + Math.pow(Math.tan((this.rotation + arc / 2) * Math.PI / 180), 2)));
		x = Math.sqrt((block/10)*(block/10) - (y * y));
		if (this.L + arc / 2 > 270) {
			x = -x;
		} else if (this.L + arc / 2 > 180) {
			x = -x;
			y = -y;
		} else if (this.L + arc / 2 > 90) {
			y = -y;
		};
		this.x = this.x + x;
		this.y = this.y + y;
	};
};
$("body").keydown(function(event) {
	// console.log(event.keyCode);
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
	if (multiplayer > 1) {
		switch (key[event.keyCode]) {
			case "^":
				two.move();
				break;
			case "<-":
				two.rotation = two.rotation - 2;
				if (two.rotation < 0) {
					two.rotation = two.rotation + 360;
				};
				break;
			case "->": 
				two.rotation = two.rotation + 2;
				break;
		};
	};
});
setInterval(function() {
	ctx.clearRect(0, 0, 3000, 1000);
	renderPlayer(one);
	if (multiplayer > 1) {
		renderPlayer(two);
	};
	one.drowplayer();
	one.rayCast();
	if (multiplayer > 1) {
		two.drowplayer();
		two.rayCast();
		ctx.fillStyle = "Black";
		ctx.fillRect(monitor * arc - 3, 0, 6, 1000);
	};
	recet();
	// one.rotation++;
}, 16);