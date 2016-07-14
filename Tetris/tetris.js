var grid = [];


var currentBlock;

RGBToHex = function(r,g,b){
    var bin = r << 16 | g << 8 | b;
    return (function(h){
        return new Array(7-h.length).join("0")+h
    })(bin.toString(16).toUpperCase())
}

var Blocks = {

	O: {
		code: "O",
		rotatable: false,
		form: [[0, 0], [1, 0], [0, 1], [1,1]],
		color: RGBToHex(255,255,0) //yellow
		},
	I: {
		code: "I",
		rotatable: true,
		form: [[0, 0], [1, 0], [2, 0], [3, 0]],
		color: RGBToHex(0,200,255) //lightblue
	},
	J: {
		code: "J",
		rotatable: true,
		form: [[0, 0], [1, 0], [1, 0], [2, 0]],
		color: RGBToHex(0,0,255) //darkblue
	},
	L: {
		code: "L",
		rotatable: true,
		form: [[0, 0], [1, 0], [2, 0], [2, 1]],
		color: RGBToHex(255,180,0) //Orange
	},
	S: {
		code: "S",
		rotatable: true,
		form: [[0, 0], [0, 1], [1, 1], [2, 1]],
		color: RGBToHex(255,0,200) //Pink
	},
	T: {
		code: "T",
		rotatable: true,
		form: [[0, 0], [1, 0], [2, 0], [1, 1]],
		color: RGBToHex(200,0,255) //Purple
	},
	Z: {
		code: "Z",
		rotatable: true,
		form: [[0, 1], [1, 1], [1, 0], [2, 0]],
		color: RGBToHex(255,0,0) //Red
	},

	0 : "O",
	1 : "I",
	2 : "J",
	3 : "L",
	4 : "S",
	5 : "T",
	6 : "Z"

	// }
}


var startNewGame = function(){
	for(var i = 0; i < 8; i++){
		var row = [];
		for(var j = 0; j < 16; j++){
			row.push(0);
		}
		grid.push(row);
	}
	currentBlock = getRandomBlock();
}

var showBoard = function(){
	var board = document.getElementById("board");
  var rows = board.getElementsByClassName("row");
  var tiles;
  for (var i = 0; i < rows.length; i++) {
    tiles = rows[i].getElementsByClassName("tile");
    for (var j = 0; j < tiles.length; j++) {
      tiles[j].style.background = grid[i][j] ?  currentBlock.color : "lightgrey";
    }
	}
}

var getRandomBlock = function() {
	var type = Math.floor(Math.random() * 7);
	block = Blocks[Blocks[type]];
	block.y = 0;
	block.x = Math.floor(Math.random() * 8);
	return block;
}

var interval = setInterval(function() {
  currentBlock.moveDown();
}, 1000);
