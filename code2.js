var map = document.getElementById("map")
var ctx = map.getContext("2d");
var block = 50;
var tails = 19;
var playerIron = 0;
var playerCopper = 0;
var inventoryX = 500;
var inventoryY = 350;
var ironOreNumber = 5;
var yOffsets = 0;
var gamePause = false;
var inventoryOpen = false;
var inventoryMap = {};
var p = 0;
var circle = function(color, x, y, radius) {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.arc(x, y, radius, 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
};
// circle("#b87333", 100, 100, block/2);
var random75 = function() { //3/4 random chands
	var tree = Math.floor(Math.random()*4+1);
	if (tree === 4) {
		return false;
	} else {
		return true;
	};
};
var random25 = function() { //1/4 random chands
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
var inventoryPlayer = [];
var player = {
	color : "DarkRed",
	x : 950,
	y : 500,
};
player.inventory = {
	iron : 0,
	copper : 0,
};
$("#map").click(function(event) { //click detector
	playerIron = 0;
	playerCopper = 0;
	var clickX = Math.floor(event.pageX/block);
	var clickY = Math.floor(event.pageY/block);
	if (gamePause === false && inventoryOpen === false) {	
		if (Math.abs(clickX - player.x / block) <= 3 && Math.abs(clickY - player.y / block) <= 3) {
			inventoryPlayer.push((blockMapX[clickX])[clickY]);
			for (var i = 0; i < inventoryPlayer.length; i++) {
				if (inventoryPlayer[i] === "iron") {
					playerIron++;
				} else if (inventoryPlayer[i] === "copper") {
					playerCopper++;
				};
			};
			player.inventory = {
				iron : playerIron,
				copper : playerCopper,
			};
		};
	};
});
$("body").keydown(function(event) { //keybord detector
	if (gamePause === false) {
		switch(event.keyCode) {
			case 68: 
				player.x = player.x+ 10;
				break;
			case 83:
				player.y =  player.y + 10;
				break;
			case 65:
				player.x =  player.x- 10;
				break;
			case 87:
				player.y =  player.y- 10;
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
var tailsRandom = function() { //random map generator
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
var inventory = function() { //inventory criator
	var inventoryMap = {};
	var xOffsets = 0;
	var yOffsets = 0;
	ctx.fillStyle = "LightGray";
	ctx.strokeStyle = "Black";
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
	if (inventoryPlayer.length > 0) {
		if (player.inventory.iron > 0 || player.inventory.copper > 0) {
			for (var i = 0; inventoryMap[i] !== undefined; i++) {};
			inventoryMap[i] = ["iron" , player.inventory["iron"]];
			inventoryMap[i+1] = ["copper" , player.inventory["copper"]];
		};
	};
	for (var i = 0; i < 50; i++) {
		var o = 0;
		if (o === 9) {
			p ++;
			o = 0;
		}
		if (inventoryMap[i][0] === "iron" && inventoryMap[i][1] !== 0) {
			circle("#61666A", inventoryX + block/2 + block*i, inventoryY + block/2, block/3);
			ctx.fillStyle = "Black";
			ctx.font = "25px Arial";
			ctx.fillText(inventoryMap[i][1], inventoryX + block/1.90 + block*i,  inventoryY + block);
		} else if (inventoryMap[i][0] === "copper" && inventoryMap[i][1] !== 0) {
			circle("#b87333", inventoryX + block/2 + block*i, inventoryY + block/2, block/3);
			ctx.fillStyle = "Black";
			ctx.font = "25px Arial";
			ctx.fillText(inventoryMap[i][1], inventoryX + block/1.90 + block*i,  inventoryY + block);
		} else if (inventoryMap[i][1] !== 0) {
			circle("Black", inventoryX + block/2 + block*i, inventoryY + block/2, block/3);
			ctx.fillStyle = "Black";
			ctx.font = "25px Arial";
			ctx.fillText(inventoryMap[i][1], inventoryX + block/1.90 + block*i,  inventoryY + block);
		};
		o++;
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