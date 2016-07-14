var grid = [];
var currentBlock;

var Blocks = {
	O : 0,
	I : 1,
	J : 2,
	L : 3,
	S : 4,
	T : 5,
	Z : 6,
	prop: {
		0: {
			code: "O",
			rotatable: false,
			form: [[0, 0], [1, 0], [0, 1], [1,1]]
			},
		1: {
			code: "I",
			rotatable: true,
			form: [[0, 0], [1, 0], [2, 0], [3, 0]]
		},
		2: {
			code: "J",
			rotatable: true,
			form: [[0, 0], [1, 0], [1, 0], [2, 0]]
		},
		3: {
			code: "L",
			rotatable: true,
			form: [[0, 0], [1, 0], [2, 0], [2, 1]]
		},
		4: {
			code: "S",
			rotatable: true,
			form: [[0, 0], [0, 1], [1, 1], [2, 1]]
		},
		5: {
			code: "T",
			rotatable: true,
			form: [[0, 0], [1, 0], [2, 0], [1, 1]]
		},
		6: {
			code: "Z",
			rotatable: true,
			form: [[0, 1], [1, 1], [1, 0], [2, 0]]
		}
	}
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
	block = {
		color : type,
		form : Blocks.prop[type].form
	}
	return block;
}

var interval = setInterval(function() {
  currentBlock.moveDown();
}, 1000);
