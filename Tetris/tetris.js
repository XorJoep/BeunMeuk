var grid = [];
var currentBlock;
var normalSpeed = true;
var gameIsStarted = false;

document.onkeydown = checkKey;

var startNewGame = function(){
	currentBlock = getRandomBlock();
	normalSpeed = true;
  grid = [];
	for(var i = 0; i < 16; i++){
		var row = [];
		for(var j = 0; j < 8; j++){
			row.push(0);
		}
		grid.push(row);
	}
	for(var i = 0; i < 4; i++) {
		grid[currentBlock.form[i][0] + currentBlock.y][currentBlock.form[i][1] + currentBlock.x] = currentBlock.color;
	}
	gameIsStarted = true;
	showBoard();
}

function checkKey(e) {
  e = e || window.event;
  if(e.keyCode == '38' ) {//&& checkIfLegalMove("up")){
    currentBlock = rotateBlock(currentBlock, 1);
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
    moveHorizontal(-1);
    showBoard();
  }
  else if (e.keyCode == '39' && checkIfLegalMove("right")) {
    moveHorizontal(1);
    showBoard();
  }
}

var showBoard = function() {
  var board = document.getElementById("board");
  var rows = board.getElementsByClassName("row");
  var tiles;
  for (var i = 0; i < rows.length; i++) {
    tiles = rows[i].getElementsByClassName("tile");
    for (var j = 0; j < tiles.length; j++) {
      tiles[j].style.background = grid[i][j] !== 0 ? grid[i][j]  : "lightgrey";
    	}
	}
}

var moveHorizontal = function(direction) {
	// direction: left = -1, right = +1
	currentBlock.x += direction;
	for (var i = 0; i < 4; i++) {
		grid[currentBlock.form[i][0] + currentBlock.y][currentBlock.form[i][1] + currentBlock.x - direction] = 0;
	}
	for (var i = 0; i < 4; i++) {
		grid[currentBlock.form[i][0] + currentBlock.y][currentBlock.form[i][1] + currentBlock.x] = currentBlock.color;
	}
}

var checkIfLegalMove = function(dir) {
	if(dir === "left"){
		for(var i = 0; i < 4; i++){
			if(currentBlock.form[i][1] + currentBlock.x === 0){
				return false;
			}
      if(grid[currentBlock.y + currentBlock.form[i][0]][currentBlock.x + currentBlock.form[i][1] - 1] !== 0 && !checkIfCoorIsInCurrentBlock(currentBlock.y + currentBlock.form[i][0], currentBlock.x + currentBlock.form[i][1] - 1)){
        console.log("hoi");
        return false;
      }
		}
	}
	if(dir === "right"){
		for(var i = 0; i < 4; i++){
			if(currentBlock.form[i][1]  + currentBlock.x === 7){
				return false;
			}
      if(grid[currentBlock.y + currentBlock.form[i][0]][currentBlock.x + currentBlock.form[i][1] + 1] !== 0 && !checkIfCoorIsInCurrentBlock(currentBlock.y + currentBlock.form[i][0], currentBlock.x + currentBlock.form[i][1] + 1)){
        return false;
      }
		}
	}
	return true;
}

var getRandomBlock = function() {
  // if(grid[3][2] !== 0){
  //   gameOver();
  //   return;
  // }
	var type = Math.floor(Math.random() * 8);
	block = new Block(Blocks[Blocks[type]]);
	block.y = 1;
	block.x = 3;
	return block;
}

var checkIfCoorIsInCurrentBlock = function(a,b){
  for(var i = 0; i < 4; i++){
    if(currentBlock.form[i][0] + currentBlock.y === a && currentBlock.form[i][1] + currentBlock.x === b){
      return true;
    }
  }
  return false;
}

var rotateBlock = function(block, orientation) {
	//rotates around second value in form
	if(!block.rotatable){
     return block;
   }
	for (var i = 0; i < block.form.length; i++) {
    	grid[block.y + block.form[i][0]][block.x + block.form[i][1]] = 0;
      block.form[i] = multiply([block.form[i]], orientation ? [[0, 1], [-1, 0]] : [[0, -1], [1, 0]])[0];
	}
	grid[block.form[0][0] + block.y][block.x + block.form[0][1]] = block.color;
	grid[block.y + block.form[1][0]][block.x + block.form[1][1]] = block.color;
	grid[block.y + block.form[2][0]][block.x + block.form[2][1]] = block.color;
	grid[block.y + block.form[3][0]][block.x + block.form[3][1]] = block.color;
	return block;
}

var checkIfMoveable = function(){
	for(var i = 0; i < 4; i++){
		if(currentBlock.y + currentBlock.form[i][0] === 15){
      checkIfLinesNeedToBeDeleted();
			currentBlock = getRandomBlock();
			return false;
		}
	}
  for(var i = 0; i < 4; i++){
    if(grid[currentBlock.y + currentBlock.form[i][0] + 1][currentBlock.x + currentBlock.form[i][1]] !== 0 && !checkIfCoorIsInCurrentBlock(currentBlock.y + currentBlock.form[i][0] + 1, currentBlock.x + currentBlock.form[i][1])){
      checkIfLinesNeedToBeDeleted();
      currentBlock = getRandomBlock();
      return false;
    }
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
	}
}, 500);

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
var gameOver = function(){
  window.alert("game Over");
}
var checkIfLineIsFull = function(i){
  for(var j = 0; j < 8; j++){
    if(grid[i][j] === 0){
      return false;
    }
  }
  return true;
}
var checkIfLineIsEmpty = function(i){
  for(var j = 0; j < 8; j++){
    if(grid[i][j] !== 0){
      return false;
    }
  }
  return true;
}
var checkIfLinesNeedToBeDeleted = function(){
  for(var i = 0; i < 16; i++){
    if(checkIfLineIsFull(i)){
      for(var j = 0; j < 8; j++){
        grid[i][j] = 0;
      }
    }
  }
  applyGravity();
}
var applyGravity = function(){
  for(var i = 15; i > 0; i--){
    var amountOfEmptyLines = 0;
    while(i - amountOfEmptyLines > 0 && checkIfLineIsEmpty(i - amountOfEmptyLines)){
      amountOfEmptyLines++;
    }
    for(var k = i; k > amountOfEmptyLines; k--){
      for(var j = 0; j < 8; j++){
        grid[k][j] = grid[k - amountOfEmptyLines][j];
      }
    }
  }
}
