var getBlock = function(number) {

	block = {
		sizeX : number
	}

	return block;
}

var makeBoard = function(){
	var board = document.getElementById("board");
  var rows = board.getElementsByClassName("row");
  var tiles;
  for (var i = 0; i < rows.length; i++) {
    tiles = rows[i].getElementsByClassName("tile");
    for (var j = 0; j < tiles.length; j++) {
      tiles[j].style.background = grid[i][j] ? "rgb(255," + currentBlock.color : "lightgrey";
    }
}

var interval = setInterval(function() {
    moveCurrentBlock();
}, 1000);
