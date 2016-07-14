var grid =[]
var startNewGame = function(){
  for(var i = 0; i < 4; i++){
    grid[i] = [0,0,0,0];
  }
  var assignedTiles = 0;
  while(assignedTiles !== 2){
    var x = getRandomNumber();
    var y = getRandomNumber();
    if(grid[x][y] === 0){
      grid[x][y] = 2;
      assignedTiles ++;
    }
  }
  showBoard();
}
var getRandomNumber = function(){
	return Math.floor((Math.random() * 4));
}
var showBoard = function(){
  s = "";
  for(var i = 0; i < 4; i++){
    s += "<div class = 'row'>";
    for(var j = 0; j < 4; j++){
      s += "<div class ='tile" + grid[i][j] + "'>";
      if(grid[i][j] !== 0){
        s += grid[i][j];
      }
      s += "</div>";
    }
    s += "</div>"
  }
  document.getElementById("board").innerHTML = s;
}
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  if(e.keyCode == '38'){
    pressUp();
  }
  else if (e.keyCode == '40') {
    pressDown();
  }
  else if (e.keyCode == '37') {
    pressLeft();
  }
  else if (e.keyCode == '39') {
    pressRight();
  }
  addNewTile();
  showBoard();
}

var pressDown = function(){
  var times = 0;
  while(times < 4){
    for(var i = 3; i > 0; i--){
      for(var j = 0; j < 4; j++){
        if(grid[i][j] === 0){
          grid[i][j] = grid[i - 1][j];
          grid[i - 1][j] = 0;
        }
      }
    }
    for(var i = 3; i > 1; i--){
      for(var j = 0; j < 4; j++){
        if(grid[i][j] === grid[i - 1][j]){
          grid[i][j] *= 2;
          grid[i - 1][j] = 0;
        }
      }
    }
    times++;
  }
  showBoard();
}
var pressUp = function(){
  var times = 0;
  while(times < 4){
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 4; j++){
        if(grid[i][j] === 0){
          grid[i][j] = grid[i + 1][j];
          grid[i + 1][j] = 0;
        }
      }
    }
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 4; j++){
        if(grid[i][j] === grid[i + 1][j]){
          grid[i][j] *= 2;
          grid[i + 1][j] = 0;
        }
      }
    }
    times++;
  }
  showBoard();
}
var pressRight = function(){
  var times = 0;
  while(times < 4){
    for(var i = 0; i < 4; i++){
      for(var j = 3; j > 0; j--){
        if(grid[i][j] === 0){
          grid[i][j] = grid[i][j - 1];
          grid[i][j - 1] = 0;
        }
      }
    }
    for(var i = 0; i < 4; i++){
      for(var j = 3; j > 0; j--){
        if(grid[i][j] === grid[i][j - 1]){
          grid[i][j] *= 2;
          grid[i][j - 1] = 0;
        }
      }
    }
    times++;
  }
  showBoard();
}
var pressLeft = function(){
  var times = 0;
  while(times < 4){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 3; j++){
        if(grid[i][j] === 0){
          grid[i][j] = grid[i][j + 1];
          grid[i][j + 1] = 0;
        }
      }
    }
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 3; j++){
        if(grid[i][j] === grid[i][j + 1]){
          grid[i][j] *= 2;
          grid[i][j + 1] = 0;
        }
      }
    }
    times++;
  }
  showBoard();
}
var addNewTile = function(){
  var emptySpaces = [];
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      if(grid[i][j] === 0){
        emptySpaces.push([i,j]);
      }
    }
  }
  var randomTile = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
  grid[randomTile[0]][randomTile[1]] = 2;
}
