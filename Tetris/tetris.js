var grid = [];


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
			form: [[0,1]
			},
		1: {
			code: "I",
			rotatable: true

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
var getBlock = function(number) {

	block = {
		sizeX : number
	}

	return block;
}


var getRandomBlock = function() {
	var type = Math.floor(Math.random() * 7);
	block {
		color : type,
	}
}

