var map = document.getElementById("map")
var ctx = map.getContext("2d");
var block = 50;
var seeLenght = 6;
var arc = 90;
var degry = 0.5;
var height = 450;
var multiplayer = 2;
var width = 1920
var monitor = ((width) / (arc / degry)) / multiplayer;
var key = {
	87 : "w",
	68 : "d",
	65 : "a",
	83 : "s",
	32 : "spase",
	16 : "shift",
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
	this.hp = 20;
	this.vertically = 0;
};
player.prototype.drowplayer = function() {
	ctx.beginPath();
	ctx.strokeStyle = this.color;
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
	ctx.fillRect((width / multiplayer) * (this.id - 1), 100, this.hp * block, block);
	this.drowSight();
};
player.prototype.drowFloor = function() {
	ctx.fillStyle = "Grey";
	ctx.fillRect((this.id -1) * width / multiplayer, height + this.vertically, monitor * arc / degry, height - this.vertically + 200);
}
player.prototype.drowSight = function () {
	ctx.strokeStyle = "Black";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo((width / multiplayer  / 2) + (width / multiplayer  * (this.id - 1))  - block / 2.5, 450);
	ctx.lineTo((width / multiplayer  / 2) + (width / multiplayer  * (this.id - 1)) + block / 2.5, 450);
	ctx.moveTo((width / multiplayer  / 2) + (width / multiplayer  * (this.id - 1)), 450 - block / 2.5);
	ctx.lineTo((width / multiplayer  / 2) + (width / multiplayer  * (this.id - 1)), 450 + block / 2.5);
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
			// whatIlook(Math.floor(this.x + x * this.radius + x * o), Math.floor(this.y + y * this.radius + y * o), length);
			return [length, whatIlook(Math.floor(this.x + x * this.radius + x * o), Math.floor(this.y + y * this.radius + y * o), length)];
		};
	};
	ctx.stroke();
	return [undefined, undefined];
};
var one = new player("Red", block/5, 1);
var two = new player("Blue", block/5, 2);
player.prototype.rayCast = function () {
	for (var i = 0; i < (arc / degry); i++) {
		length = this.ray(this.L, this.color)[0];
		ctx.fillRect((monitor * i) + (width / multiplayer) * (this.id - 1), (height + this.vertically) - ((150 / length) / 2), monitor + 0.9, 150 / length);
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
player.prototype.shoot = function (player) {
	renderPlayer(player);
	// console.log(this.ray(this.rotation + arc / 2, "Magenta")[1]);
	if (this.ray(this.rotation + arc / 2, "Magenta")[1] === player.id) {
		player.hp--;
		if (player.hp <= 0) {
			alert(player.id + " lose!");
			player.hp = 20;
			player.x = 200;
			player.y = 200;
			player.rotation = 0;
			this.hp = 20;
			this.x = 300;
			this.y = 250;
			this.rotation = 0;
		};
	};
	recet();
};
player.prototype.move = function () {
	renderPlayer(one);
	if (multiplayer > 1) {
		renderPlayer(two);
	};
	if(this.ray(this.rotation + arc / 2, "Black")[0] > this.radius / 100) {
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
	recet();
};
$("html").click(function (event) {
	// console.log(event.pageX);
	if (event.pageX > (width / 2) / multiplayer && event.pageX < width / 2) {
		one.rotation++;
	} else if (event.pageX < width / 2) {
		one.rotation--;
	};
	if (multiplayer === 2 && event.pageX > width / 2) {
		if (event.pageX > (width / 2) / multiplayer + width / 2) {
			two.rotation++;
		} else {
			two.rotation--;
		};
	};
});
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
		case "s":
			one.shoot(two);
			break;
		case "spase":
			one.vertically = one.vertically + 10;
			break;
		case "shift":
			one.vertically = one.vertically - 10;
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
			case "_":
				two.shoot(one);
				break;
		};
	};
});
setInterval(function() {
	ctx.clearRect(0, 0, 3000, 1000);
	one.drowFloor();
	renderPlayer(one);
	if (multiplayer > 1) {
		two.drowFloor();
		renderPlayer(two);
	};
	one.rayCast();
	one.drowplayer();
	if (multiplayer > 1) {
		two.rayCast();
		ctx.fillStyle = "Black";
		ctx.fillRect((width / multiplayer) - 3, 0, 6, 1100);
		two.drowplayer();
	};
	recet();
	// one.rotation++;
}, 16);