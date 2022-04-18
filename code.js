var map = document.getElementById("map")
var ctx = map.getContext("2d");
var block = 50;
var tails = 19;
var gamePause = false;
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
var mapGenerator =  function() {
	for (var i = 0; i < tails*2; i++) {
		blockMapX["y"+i] = {};
		for (var o = 0; o < tails; o++) {
			(blockMapX["y"+i])[o] = tailsRandom();
		};
	};
};
var oreGenerator = function(name) {
	var randomOreX = Math.floor(Math.random()*tails*2);
	var randomOreY = Math.floor(Math.random()*tails);
	(blockMapX["y"+randomOreX])[randomOreY] = name;
	(blockMapX["y"+randomOreX])[randomOreY-1] = name;
	(blockMapX["y"+randomOreX])[randomOreY+1] = name;
	var offsets = randomOreX + 1;
	(blockMapX["y"+offsets])[randomOreY] = name;
	var offsets = randomOreX - 1;
	(blockMapX["y"+offsets])[randomOreY] = name;
	// for (var i = 0; i < 1; i++) {
		if ((blockMapX["y"+randomOreX])[randomOreY-2] === "iron") {
			console.log("YES");
		};
	// };
};
var mapBilder = function() {
	var xOffsets = 0;
	for (var i = 0; i < tails*2; i++) {
		for(var o = 0; o < tails; o++) {
			if ((blockMapX["y"+xOffsets])[o] === "grass") {
				ctx.fillStyle = "ForestGreen ";
				ctx.fillRect(xOffsets*block, o*block, block, block);
			} else if ((blockMapX["y"+xOffsets])[o] === "rock") {
				ctx.fillStyle = "LightSlateGrey";
				ctx.fillRect(xOffsets*block, o*block, block, block);
			} else if ((blockMapX["y"+xOffsets])[o] === "sand") {
				ctx.fillStyle = "Gold";
				ctx.fillRect(xOffsets*block, o*block, block, block);
			} else if ((blockMapX["y"+xOffsets])[o] === "iron") {
				ctx.fillStyle = "#61666A";
				ctx.fillRect(xOffsets*block, o*block, block, block);
			};
		};
	xOffsets++;
	};
};
mapGenerator();
oreGenerator("iron");
setInterval(function() {
	if (gamePause === false) {
		mapBilder();
		ctx.fillStyle = player.color;
		ctx.fillRect(player.x, player.y, block, block);
	};
},32);