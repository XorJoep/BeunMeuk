var grid = [];
var currentBlock;
var gameIsStarted = false;
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
	grid[currentBlock.form[0][0]][currentBlock.form[0][1]] = currentBlock.color;
	grid[currentBlock.form[1][0]][currentBlock.form[1][1]] = currentBlock.color;
	grid[currentBlock.form[2][0]][currentBlock.form[2][1]] = currentBlock.color;
	grid[currentBlock.form[3][0]][currentBlock.form[3][1]] = currentBlock.color;
	showBoard();
}

var showBoard = function(){
	var board = document.getElementById("board");
  var rows = board.getElementsByClassName("row");
  var tiles;
  for (var i = 0; i < rows.length; i++) {
    tiles = rows[i].getElementsByClassName("tile");
    for (var j = 0; j < tiles.length; j++) {
      tiles[j].style.background = grid[i][j] ?  getColor(grid[i][j]) : "lightgrey";
    }
	}
}
var getColor = function(i){
	switch(i){
		case 0:
			return "blue";
			break;
		case 1:
			return "green";
			break;
		case 2:
			return "yellow";
			break;
		case 3:
			return "purple";
			break;
		case 4:
 			return "orange";
			break;
		case 5:
			return "red";
			break;
		case 6:
			return "black";
			break;
		default:
			return "black";
			break;
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
	if(gameIsStarted){
		grid[currentBlock.form[0][0]][currentBlock.form[0][1]] = 0;
		grid[currentBlock.form[1][0]][currentBlock.form[1][1]] = 0;
		grid[currentBlock.form[2][0]][currentBlock.form[2][1]] = 0;
		grid[currentBlock.form[3][0]][currentBlock.form[3][1]] = 0;
	  currentBlock.form[0][1] ++;
		currentBlock.form[1][1] ++;
		currentBlock.form[2][1] ++;
		currentBlock.form[3][1] ++;
		grid[currentBlock.form[0][0]][currentBlock.form[0][1]] = currentBlock.color;
		grid[currentBlock.form[1][0]][currentBlock.form[1][1]] = currentBlock.color;
		grid[currentBlock.form[2][0]][currentBlock.form[2][1]] = currentBlock.color;
		grid[currentBlock.form[3][0]][currentBlock.form[3][1]] = currentBlock.color;
	}
}, 1000);
