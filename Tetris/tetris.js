var grid = [];
var currentBlock;
var normalSpeed = true;
var gameIsStarted = false;

document.onkeydown = checkKey;

var startNewGame = function(){
	normalSpeed = true;
	for(var i = 0; i < 16; i++){
		var row = [];
		for(var j = 0; j < 8; j++){
			row.push(0);
		}
		grid.push(row);
	}
	currentBlock = getRandomBlock();
	grid[currentBlock.form[0][0] + currentBlock.y][currentBlock.form[0][1] + currentBlock.x] = currentBlock.color;
	grid[currentBlock.form[1][0] + currentBlock.y][currentBlock.form[1][1] + currentBlock.x] = currentBlock.color;
	grid[currentBlock.form[2][0] + currentBlock.y][currentBlock.form[2][1] + currentBlock.x] = currentBlock.color;
	grid[currentBlock.form[3][0] + currentBlock.y][currentBlock.form[3][1] + currentBlock.x] = currentBlock.color;
	gameIsStarted = true;
	showBoard();
}
function checkKey(e) {
  e = e || window.event;
  if(e.keyCode == '38' ) {//&& checkIfLegalMove("up")){
    currentBlock = rotateBlock(currentBlock,1);
    showBoard();
  }
  if (e.keyCode == '40') {
		if(normalSpeed){
    	normalSpeed = false;
		}
		else{
			normalSpeed = true;
		}
  }
  if (e.keyCode == '37' && checkIfLegalMove("left")) {
    pressLeft();
    showBoard();
  }
  else if (e.keyCode == '39' && checkIfLegalMove("right")) {
    pressRight();
    showBoard();
  }
}
var showBoard = function(){
  var board = document.getElementById("board");
  var rows = board.getElementsByClassName("row");
  var tiles;
  for (var i = 0; i < rows.length; i++) {
    tiles = rows[i].getElementsByClassName("tile");
    for (var j = 0; j < tiles.length; j++) {
      tiles[j].style.background = grid[i][j] !==0  ? grid[i][j]  : "lightgrey";
    	}
	}
}

var pressLeft = function() {
	grid[currentBlock.form[0][0] + currentBlock.y][currentBlock.form[0][1] + currentBlock.x] = 0;
	grid[currentBlock.form[1][0] + currentBlock.y][currentBlock.form[1][1] + currentBlock.x] = 0;
	grid[currentBlock.form[2][0] + currentBlock.y][currentBlock.form[2][1] + currentBlock.x] = 0;
	grid[currentBlock.form[3][0] + currentBlock.y][currentBlock.form[3][1] + currentBlock.x] = 0;
	currentBlock.x--;
	grid[currentBlock.form[0][0] + currentBlock.y][currentBlock.form[0][1]  + currentBlock.x] = currentBlock.color;
	grid[currentBlock.form[1][0] + currentBlock.y][currentBlock.form[1][1]  + currentBlock.x] = currentBlock.color;
	grid[currentBlock.form[2][0] + currentBlock.y][currentBlock.form[2][1]  + currentBlock.x] = currentBlock.color;
	grid[currentBlock.form[3][0] + currentBlock.y][currentBlock.form[3][1]  + currentBlock.x] = currentBlock.color;
}
var pressRight = function() {
	grid[currentBlock.form[0][0] + currentBlock.y][currentBlock.form[0][1] + currentBlock.x] = 0;
	grid[currentBlock.form[1][0] + currentBlock.y][currentBlock.form[1][1] + currentBlock.x] = 0;
	grid[currentBlock.form[2][0] + currentBlock.y][currentBlock.form[2][1] + currentBlock.x] = 0;
	grid[currentBlock.form[3][0] + currentBlock.y][currentBlock.form[3][1] + currentBlock.x] = 0;
	currentBlock.x ++;
	grid[currentBlock.form[0][0] + currentBlock.y][currentBlock.form[0][1] + currentBlock.x] = currentBlock.color;
	grid[currentBlock.form[1][0] + currentBlock.y][currentBlock.form[1][1] + currentBlock.x] = currentBlock.color;
	grid[currentBlock.form[2][0] + currentBlock.y][currentBlock.form[2][1] + currentBlock.x] = currentBlock.color;
	grid[currentBlock.form[3][0] + currentBlock.y][currentBlock.form[3][1] + currentBlock.x] = currentBlock.color;
}
var checkIfLegalMove = function(dir){
	if(dir === "left"){
		for(var i = 0; i < 4; i++){
			if(currentBlock.form[i][1] + currentBlock.x === 0){
				return false;
			}
		}
	}
	if(dir === "right"){
		for(var i = 0; i < 4; i++){
			if(currentBlock.form[i][1]  + currentBlock.x === 7){
				return false;
			}
		}
	}
	return true;
}
var getRandomBlock = function() {
	var type = Math.floor(Math.random() * 7);
	block = new Block(Blocks[Blocks[type]]);
	block.y = 1;
	block.x = 3;
	return block;
}

var rotateBlock = function(block, orientation) {
	//rotates around second value in form
	if(!block.rotatable) return block;
		for (var i = 0; i < block.form.length; i++) {
			block.form[i] = multiply([block.form[i]], orientation ? [[0, 1], [-1, 0]] : [[0, -1], [1, 0]])[0];
		}
	return block;

}

var checkIfMoveable = function(){
	for(var i = 0; i < 4; i++){
		if(currentBlock.y + currentBlock.form[i][0] === 15){
			currentBlock = getRandomBlock();
			return false;
		}
	}
	var currentBlockCoords = [];
	for(var i = 0; i < 4; i++){
		currentBlockCoords.push([currentBlock.y + currentBlock.form[i][0] , currentBlock.x + currentBlock.form[i][1]]);
	}
	return true;
}

var interval = setInterval(function() {
	if(gameIsStarted && normalSpeed && checkIfMoveable()){
		grid[currentBlock.y + currentBlock.form[0][0]][currentBlock.x + currentBlock.form[0][1]] = 0;
		grid[currentBlock.y + currentBlock.form[1][0]][currentBlock.x + currentBlock.form[1][1]] = 0;
		grid[currentBlock.y + currentBlock.form[2][0]][currentBlock.x + currentBlock.form[2][1]] = 0;
		grid[currentBlock.y + currentBlock.form[3][0]][currentBlock.x + currentBlock.form[3][1]] = 0;
	  currentBlock.y ++;
		grid[currentBlock.form[0][0] + currentBlock.y][currentBlock.x + currentBlock.form[0][1]] = currentBlock.color;
		grid[currentBlock.y + currentBlock.form[1][0]][currentBlock.x + currentBlock.form[1][1]] = currentBlock.color;
		grid[currentBlock.y + currentBlock.form[2][0]][currentBlock.x + currentBlock.form[2][1]] = currentBlock.color;
		grid[currentBlock.y + currentBlock.form[3][0]][currentBlock.x + currentBlock.form[3][1]] = currentBlock.color;
		showBoard();
		// debugger;
	}
}, 1000);
var interval = setInterval(function() {
	if(gameIsStarted && !normalSpeed && checkIfMoveable()){
		grid[currentBlock.y + currentBlock.form[0][0]][currentBlock.x + currentBlock.form[0][1]] = 0;
		grid[currentBlock.y + currentBlock.form[1][0]][currentBlock.x + currentBlock.form[1][1]] = 0;
		grid[currentBlock.y + currentBlock.form[2][0]][currentBlock.x + currentBlock.form[2][1]] = 0;
		grid[currentBlock.y + currentBlock.form[3][0]][currentBlock.x + currentBlock.form[3][1]] = 0;
	  currentBlock.y ++;
		grid[currentBlock.form[0][0] + currentBlock.y][currentBlock.x + currentBlock.form[0][1]] = currentBlock.color;
		grid[currentBlock.y + currentBlock.form[1][0]][currentBlock.x + currentBlock.form[1][1]] = currentBlock.color;
		grid[currentBlock.y + currentBlock.form[2][0]][currentBlock.x + currentBlock.form[2][1]] = currentBlock.color;
		grid[currentBlock.y + currentBlock.form[3][0]][currentBlock.x + currentBlock.form[3][1]] = currentBlock.color;
		showBoard();
	}
}, 100);
