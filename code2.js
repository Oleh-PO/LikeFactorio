var map = document.getElementById("map")
var ctx = map.getContext("2d");
var block = 50;
var tails = 19;
var inventoryX = 500;
var inventoryY = 350;
var ironOreNumber = 5;
var yOffsets = 0;
var gamePause = false;
var inventoryOpen = false;
var random75 = function() {
	var tree = Math.floor(Math.random()*4+1);
	if (tree === 4) {
		return false;
	} else {
		return true;
	};
};
var random25 = function() {
	var one = Math.floor(Math.random()*4+1);
	if (one === 1) {
		return true;
	} else {
		return false;
	};
};
var keys = {
	68 : "D",
	83 : "S",
	65 : "A",
	87 : "W",
	69 : "E",
}
var player = {
	color : "DarkRed",
	x : 0,
	y : 0,
};
$("body").keydown(function(event) {
	if (gamePause === false) {
		switch(event.keyCode) {
			case 68: 
				player.x = player.x+ 5;
				break;
			case 83:
				player.y =  player.y + 5;
				break;
			case 65:
				player.x =  player.x- 5;
				break;
			case 87:
				player.y =  player.y- 5;
				break;
			case 32:
				if (inventoryOpen === false) {
					inventoryOpen = true;
				} else {
					inventoryOpen = false;
				};
		};
	};
	if (event.keyCode === 69) {
		if (gamePause === false) {
			gamePause = true;
		} else {
			gamePause = false;
		};
	}
});
var blockMapX = {};
var tailsRandom = function() {
	var r = Math.floor(Math.random()*10);
	if (r >= 0 && r <= 3) {
		return "grass";
	} else if (r > 3 && r <= 6) {
		return "rock";
	} else if (r > 6 && r <= 9) {
		return "sand";
	} else {
		return "grass";
	};
};
var inventory = function() {
	var xOffsets = 0;
	var yOffsets = 0;
	ctx.fillStyle = "LightGray";
	ctx.fillRect(inventoryX, inventoryY, 900, 250);
	ctx.lineWidth = 5;
	ctx.strokeRect(inventoryX, inventoryY, 900, 250);
	for (var i = 0; i < 90; i++) {
		ctx.strokeRect(inventoryX + block*xOffsets, inventoryY + yOffsets * block, block, block);
		xOffsets++;
		if (xOffsets/18 === Math.floor(xOffsets/18) && i !== 0) {
			yOffsets++;
			xOffsets = 0;
		};
	};
};
var mapGenerator =  function() {
	for (var i = 0; i < tails*2; i++) {
		blockMapX[i] = {};
		for (var o = 0; o < tails; o++) {
			(blockMapX[i])[o] = tailsRandom();
		};
	};
};
var oreGenerator = function(name) {
	var randomOreX = Math.floor(Math.random()*tails*2);
	var randomOreY = Math.floor(Math.random()*tails);
	(blockMapX[randomOreX])[randomOreY] = name;
	(blockMapX[randomOreX])[randomOreY-1] = name;
	(blockMapX[randomOreX])[randomOreY+1] = name;
	(blockMapX[randomOreX-1])[randomOreY] = name;
	(blockMapX[randomOreX+1])[randomOreY] = name;
	if (random75()=== true) {
		(blockMapX[randomOreX+1])[randomOreY+1] = name;
	};
	if (random75()=== true) {
		(blockMapX[randomOreX-1])[randomOreY+1] = name;
	};
	if (random75()=== true) {
		(blockMapX[randomOreX+1])[randomOreY-1] = name;
	};
	if (random75()=== true) {
		(blockMapX[randomOreX-1])[randomOreY-1] = name;
	};
	if (random25()=== true) {
		(blockMapX[randomOreX])[randomOreY-2] = name;
	};
	if (random25()=== true) {
		(blockMapX[randomOreX])[randomOreY+2] = name;
	};
	if (random25()=== true) {
		(blockMapX[randomOreX-2])[randomOreY] = name;
	};
	if (random25()=== true) {
		(blockMapX[randomOreX+2])[randomOreY] = name;
	};
};
var mapBilder = function() {
	var xOffsets = 0;
	for (var i = 0; i < tails*2; i++) {
		for(var o = 0; o < tails; o++) {
			if ((blockMapX[xOffsets])[o] === "grass") {
				ctx.fillStyle = "ForestGreen ";
				ctx.fillRect(xOffsets*block, o*block, block, block);
			} else if ((blockMapX[xOffsets])[o] === "rock") {
				ctx.fillStyle = "LightSlateGrey";
				ctx.fillRect(xOffsets*block, o*block, block, block);
			} else if ((blockMapX[xOffsets])[o] === "sand") {
				ctx.fillStyle = "Gold";
				ctx.fillRect(xOffsets*block, o*block, block, block);
			} else if ((blockMapX[xOffsets])[o] === "iron") {
				ctx.fillStyle = "#61666A";
				ctx.fillRect(xOffsets*block, o*block, block, block);
			} else if ((blockMapX[xOffsets])[o] === "copper") {
				ctx.fillStyle = "#b87333";
				ctx.fillRect(xOffsets*block, o*block, block, block);
			};
		};
	xOffsets++;
	};
};
mapGenerator();
for (var i = 0; i < ironOreNumber; i++) {
	oreGenerator("iron");
};
oreGenerator("copper");
setInterval(function() {
	if (gamePause === false) {
		mapBilder();
		ctx.fillStyle = player.color;
		ctx.fillRect(player.x, player.y, block, block);
	};
	if (inventoryOpen === true) {
		inventory();
	};
},32);