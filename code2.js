var map = document.getElementById("map")
var ctx = map.getContext("2d");
var block = 50;
var tails = 39;
var itemSelected = false;
var inventorySelect;
var camOffsetsX = 0;
var camOffsetsY = 0;
var blockOffsetsX = 0;
var blockOffsetsY = 0;
var inventoryX = 500;
var inventoryY = 350;
var ironOreNumber = 15;
var copperOreNumber = 5;
var yOffsets = 0;
var rayCastX = 0;
var rayCastY = 0;
var oreSelector;
var gamePause = false;
var inventoryOpen = false;
// var inventoryMap = {};
var playerOffsetsX = 0;
var playerOffsetsY = 0;
var p = 0;
var circle = function(color, x, y, radius) {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.arc(x, y, radius, 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
};
var ore = ["copper", "iron",];
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
};
var player = {
	color : "DarkRed",
	x : 950,
	y : 500,
};
player.inventory = {};
for (var i = 0; i < 100; i++) {
	player.inventory[i] = 0;
};
// player.inventory[0] = ["iron"];
$("#map").click(function(event) { //click detector
	var clickX = Math.floor((event.pageX + playerOffsetsX)/block);
	var clickY = Math.floor((event.pageY + playerOffsetsY)/block);
	blockOffsetsX = Math.floor(camOffsetsX / block);
	blockOffsetsY = Math.floor(camOffsetsY / block);
	if (gamePause === false && inventoryOpen === false) {	
		if (Math.abs(clickX - player.x / block) <= 3 && Math.abs(clickY - player.y / block) <= 3) {
			for (var i = 0; i < ore.length; i++) {
				if ((blockMapX[clickX + blockOffsetsX])[clickY + blockOffsetsY] === ore[i]) {
					oreSelector = ore[i];
					var o = false;
					var u = 0;
					while (o !== true) {
						if (player.inventory[u] === 0) {
							player.inventory[u] = [oreSelector ,1];
							o = true;
						} else if (player.inventory[u][0] === oreSelector) {
							player.inventory[u] = [oreSelector ,player.inventory[u][1] + 1];
							o = true;
						} else if (u > 100) {
							o = true;
						};
						u++;
					};
				};
			};
		};
	} else if (gamePause === false) {
		clickX = event.pageX;
		clickY = event.pageY;
		if (clickX > inventoryX && clickX < inventoryX + 900) {
			if (clickX > inventoryY && clickY < inventoryY + 250) {
				var blockClickX = Math.floor((clickX - inventoryX) / block);
				var blockClickY = Math.floor((clickY - inventoryY) / block);
				if (itemSelected === false) {
					inventorySelect = blockClickX + blockClickY * 10;
					console.log(player.inventory[inventorySelect]);
					if(player.inventory[inventorySelect] !== 0) {
						itemSelected = true;
					};
				} else if (player.inventory[blockClickX + blockClickY * 10] !== player.inventory[inventorySelect]) {
					player.inventory[blockClickX + blockClickY * 10] = player.inventory[inventorySelect];
					itemSelected = false;
					player.inventory[inventorySelect] = 0;
				} else {
					itemSelected = false;
				};
			};
		} else {
			itemSelected = false;
		}
	};
});
$("body").keydown(function(event) { //keybord detector
	if (gamePause === false) {
		switch(event.keyCode) {
			case 68:
				if (player.x > block * 34 + block/2) {
					camOffsetsX = camOffsetsX + 10;
				} else {
					player.x = player.x + 10;
				};
				break;
			case 83:
				if (player.y > block * 16) {
					camOffsetsY = camOffsetsY + 10;
				} else {
					player.y = player.y + 10;
				};
				break;
			case 65:
				if (player.x < block*3) {
					camOffsetsX = camOffsetsX - 10;
				} else {
					player.x = player.x - 10;
				};
				break;
			case 87:
				if (player.y < block * 2) {
					camOffsetsY = camOffsetsY - 10;
				} else {
					player.y = player.y - 10;
				};
				break;
			case 32:
			itemSelected = false;
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
	xOffsets = 0;
	yOffsets = 0;
	for (var i = 0; i < 90; i++) {
		// console.log(xOffsets + "X|Y" + yOffsets);
		if (player.inventory[i][0] === "iron" && player.inventory[i][1] > 0) {
		circle("#61666A", inventoryX + block/2 + block*xOffsets, inventoryY + block/2 + block * yOffsets, block/3);
		ctx.fillStyle = "Black";
		ctx.font = "25px Arial";
		ctx.fillText(player.inventory[i][1], inventoryX + block/1.90 + block*xOffsets,  inventoryY + block + block * yOffsets);
		} else if (player.inventory[i][0] === "copper" && player.inventory[i][1] > 0) {
		circle("#b87333", inventoryX + block/2 + block*xOffsets, inventoryY + block/2 + block * yOffsets, block/3);
		ctx.fillStyle = "Black";
		ctx.font = "25px Arial";
		ctx.fillText(player.inventory[i][1], inventoryX + block/1.90 + block*xOffsets,  inventoryY + block + block * yOffsets);
		};
		if (xOffsets === 9) {
			yOffsets++;
			xOffsets = 0;
		} else {
			xOffsets++;
		};
	};
	// circle("#b87333", inventoryX + block/2 + block*i, inventoryY + block/2, block/3);
};
var rayCast = function(drow) {
	rayCastY = 0;
	ctx.strokeStyle = "Black";
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(player.x + block/2, player.y);
	for (var i = 0; i < 20; i++) {
		ctx.lineTo(player.x + block/2, player.y - rayCastY);
		// if (inventoryOpen === true) {
			// console.log(blockMapX[Math.floor((player.x + block/2) / block) + blockOffsetsX][Math.floor((player.y - rayCastY) / block + blockOffsetsY)]);
			// console.log(Math.floor((player.x + block/2) / block) + blockOffsetsX + "_|_" + Math.floor((player.y - rayCastY) / block + blockOffsetsY));
		// };
		var test = blockMapX[Math.floor((player.x + block/2) / block) + blockOffsetsX][Math.floor((player.y - rayCastY) / block + blockOffsetsY)];
		if (test === "iron") {
			ctx.stroke();
			return rayCastY;
		} else {
			rayCastY = rayCastY + 10;
		};
	};
	ctx.stroke();
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
	blockOffsetsX = Math.floor(camOffsetsX / block);
	blockOffsetsY = Math.floor(camOffsetsY / block);
	playerOffsetsX = camOffsetsX - Math.floor(camOffsetsX / block) * block;
	playerOffsetsY = camOffsetsY - Math.floor(camOffsetsY / block) * block;
	// console.log(playerOffsetsX + "X|Y" + playerOffsetsY + "playerOffsets");
	// console.log(blockOffsetsX + "X|Y" + blockOffsetsY + "blockOffsets");
	for (var i = 0; i < tails*2; i++) {
		for(var o = 0; o < tails; o++) {
			if ((blockMapX[xOffsets])[o] === "grass") {
				ctx.fillStyle = "ForestGreen ";
				ctx.fillRect((xOffsets - blockOffsetsX)*block - playerOffsetsX, (o - blockOffsetsY) * block - playerOffsetsY, block, block);
			} else if ((blockMapX[xOffsets])[o] === "rock") {
				ctx.fillStyle = "LightSlateGrey";
				ctx.fillRect((xOffsets - blockOffsetsX)*block - playerOffsetsX, (o - blockOffsetsY) * block - playerOffsetsY, block, block);
			} else if ((blockMapX[xOffsets])[o] === "sand") {
				ctx.fillStyle = "Gold";
				ctx.fillRect((xOffsets - blockOffsetsX)*block - playerOffsetsX, (o - blockOffsetsY) * block - playerOffsetsY, block, block);
			} else if ((blockMapX[xOffsets])[o] === "iron") {
				ctx.fillStyle = "#61666A";
				ctx.fillRect((xOffsets - blockOffsetsX)*block - playerOffsetsX, (o - blockOffsetsY) * block - playerOffsetsY, block, block);
			} else if ((blockMapX[xOffsets])[o] === "copper") {
				ctx.fillStyle = "#b87333";
				ctx.fillRect((xOffsets - blockOffsetsX)*block - playerOffsetsX, (o - blockOffsetsY) * block - playerOffsetsY, block, block);
			};
		};
	xOffsets++;
	};
};
mapGenerator();
for (var i = 0; i < ironOreNumber; i++) {
	oreGenerator("iron");
};
for (var i = 0; i < copperOreNumber; i++) {
	oreGenerator("copper");
};
setInterval(function() {
	if (gamePause === false) {
		mapBilder();
		ctx.fillStyle = player.color;
		ctx.fillRect(player.x, player.y, block, block);
		// rayCast();
	};
	if (inventoryOpen === true) {
		inventory();
	};
},16);