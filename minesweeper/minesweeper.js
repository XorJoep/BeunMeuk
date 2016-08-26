"use strict";

var grid = [];
var gameOverBoolean = false;
var gameIsStarted = false;
var highScore = 0;
var makeNewBoard = function(){
  for(var i = 0; i < 10; i++){
    grid[i] = [0,0,0,0,0,0,0,0,0,0];
  }
  var amountOfBombs = 20;
  while(amountOfBombs > 0){
    var x = getRandomNumber();
    var y = getRandomNumber();
    if(grid[x][y] !== 1){
      grid[x][y] = 1;
      amountOfBombs --;
    }
  }
}
var playMineSweeper = function(width){
  currentSeconds = 0;
  gameIsStarted = true;
  gameOverBoolean = false;
  makeNewBoard();
  var s = "";
  for(var i = 0; i < width; i++){
    s += '<div id = "parent">';
    for(var j = 0; j < width; j++){
      var id = + i + '' + j;
      s += '<div oncontextmenu = placeFlag("' + id + '") onclick = clickTile("' + i + '' + j + '") class="MinesweeperTile" id=' + i + '' + j + '></div>';
    }
    s += '</div>';
  }

  document.getElementById("MinesweeperTiles").innerHTML = s;
}
var clickTile = function(id){
  if(!gameOverBoolean){
    if(document.getElementById(id).innerHTML !== "@"){
      if(getAmountOfSurroundingBombs(parseInt(id.charAt(0)), parseInt(id.charAt(1)))){
        document.getElementById(id).innerHTML = getAmountOfSurroundingBombs(parseInt(id.charAt(0)), parseInt(id.charAt(1)));
      }
      turnTile(parseInt(id.charAt(0)), parseInt(id.charAt(1)));
    }
  }
}
var getRandomNumber = function(){
	return Math.floor((Math.random() * 10));
}
var turnTile = function(x, y){
  document.getElementById(x + "" + y).className = "turnedTile" + getAmountOfSurroundingBombs(x, y);

  if(getAmountOfSurroundingBombs(x, y) === 0){
    expand(x, y);
  }
  console.log(getAmountOfTurnedTiles());
  if(getAmountOfTurnedTiles() === 80){
    window.alert("You win");
    if(currentSeconds < highscore){
      highscore = currentSeconds;
    }
    gameIsStarted = false;
    document.getElementById("MinesweeperHighscore").innerHTML = "Higscore: " + highscore;
  }
  return getAmountOfSurroundingBombs(x, y) + "";
}
var getAmountOfSurroundingBombs = function(x, y) {
  if(grid[x][y] === 1){
    gameOver();
    document.getElementById(x + "" + y).className = "bombTile";
    return "*";
  }
  var surroundingBombs = 0;
  for(var i = x - 1; i <= x + 1; i++){
    for(var j = y - 1; j <= y + 1; j++){
      if(getIfBomb(i, j)){
        surroundingBombs ++;
      }
    }
  }
  return surroundingBombs;
}
var getIfBomb = function(x, y){
  if(x < 0 || y < 0 || x > 9 || y > 9){
    return false;
  }
  return grid[x][y] === 1;
}
var expand = function(x, y){
  var tilesToTurn = [];
  for(var i = x - 1; i <= x + 1; i++){
    for(var j = y - 1; j <= y + 1; j++){
      if(i >= 0 && j >= 0 && i < 10 && j < 10){
        if(document.getElementById(i + "" + j).className === "MinesweeperTile"){
          tilesToTurn.push([i, j]);
        }
      }
    }
  }
  for(var i = 0; i < tilesToTurn.length; i++){
    clickTile(tilesToTurn[i][0] + "" + tilesToTurn[i][1]);
  }
  return tilesToTurn;
}
var placeFlag = function(id){
    if(document.getElementById(id).innerHTML === ""){
    document.getElementById(id).innerHTML = "@";
    }
    else if(document.getElementById(id).innerHTML === "@"){
      document.getElementById(id).innerHTML = ""
    }
    return false;
}
var gameOver = function(){
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < 10; j++){
      if(grid[i][j] === 1){
        document.getElementById(i + "" + j).innerHTML = "*";
        document.getElementById(i + "" + j).className = "bombTile";

      }
    }
  }
  gameOverBoolean = true;
  gameIsStarted = false;
}
var currentSeconds = 0;
var interval = setInterval(function() {
  if(gameIsStarted){
    document.getElementById("MinesweeperTimer").innerHTML = ++currentSeconds;
  }
}, 1000);
var getAmountOfTurnedTiles = function(){
  var amount = 0;
  for(var i = 0; i < 10; i ++){
    for(var j = 0; j < 10; j++){
      if(document.getElementById(i + "" + j).className !== "MinesweeperTile" && !(document.getElementById(i + "" + j).className === "bombTile")){
        amount++;
      }
    }
  }
  return amount;
}
