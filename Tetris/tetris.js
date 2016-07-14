var grid = [];
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
