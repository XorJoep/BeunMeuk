function play2048(){

  var grid =[]

  document.onkeydown = checkKey;

  var gameOver = false;
  var startNewGame = function(){
    gameOver = false;
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

  var getColor = function(value) {
    l = Math.log2(value);
    return "" + (250-l*50)*(l<6) + ", " + (l%6*50)*(l>6) + ")";
  }

  var showBoard = function(){
    var board = document.getElementById("board2048");
    var rows = board.getElementsByClassName("row2048");
    var tiles;
    for (var i = 0; i < rows.length; i++) {
      tiles = rows[i].getElementsByClassName("tile");
      for (var j = 0; j < tiles.length; j++) {
        tiles[j].textContent = grid[i][j] || "";
        tiles[j].style.background = grid[i][j] ? "rgb(255," + getColor(grid[i][j]) : "lightgrey";
        tiles[j].style.fontSize = Math.log2(grid[i][j]) > 6 ? "30px" : "50px";
      }
    }

  }


  function checkKey(e) {
    e = e || window.event;
    if(e.keyCode == '38' && checkIfLegalMove("up") && !gameOver){
      e.preventDefault();
      pressUp();
      addNewTile();
      showBoard();
    }
    else if (e.keyCode == '40' && checkIfLegalMove("down") && !gameOver) {
      e.preventDefault();
      pressDown();
      addNewTile();
      showBoard();
    }
    else if (e.keyCode == '37' && checkIfLegalMove("left") && !gameOver) {
      e.preventDefault();
      pressLeft();
      addNewTile();
      showBoard();
    }
    else if (e.keyCode == '39' && checkIfLegalMove("right") && !gameOver) {
      e.preventDefault();
      pressRight();
      addNewTile();
      showBoard();
    }
    checkIfgameOver();
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
      times++;
    }
    for(var i = 3; i > 0; i--){
      for(var j = 0; j < 4; j++){
        if(grid[i][j] === grid[i - 1][j]){
          grid[i][j] *= 2;
          for(var k = i - 1; k >= 0; k--){
            grid[k][j] = k > 0 ? grid[k - 1][j] : 0;
          }
        }
      }
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
      times++;
    }
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 4; j++){
        if(grid[i][j] === grid[i + 1][j]){
          grid[i][j] *= 2;
          for(var k = i + 1; k < 4; k++){
            grid[k][j] = k < 3 ? grid[k + 1][j] : 0;
          }
        }
      }
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
      times++;
    }
    for(var i = 0; i < 4; i++){
      for(var j = 3; j > 0; j--){
        if(grid[i][j] === grid[i][j - 1]){
          grid[i][j] *= 2;
          for(var k = j - 1; k >= 0; k--){
            grid[i][k] = k > 0 ? grid[i][k - 1] : 0;
          }
        }
      }
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
      times++;
    }
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 3; j++){
        if(grid[i][j] === grid[i][j + 1]){
          grid[i][j] *= 2;
          for(var k = j + 1; k < 4; k++){
            grid[i][k] = k < 3 ? grid[i][k + 1] : 0;
          }
        }
      }
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
    if(randomTile != undefined){
      grid[randomTile[0]][randomTile[1]] = 2;
    }
    else if(emptySpaces.length === 0){
      gameOver();
    }
  }
  var checkIfLegalMove = function(direction){
    if(direction === "down"){
      for(var i = 0; i < 3; i++){
        for(var j = 0; j < 4; j++){
          if((grid[i][j] !== 0 && grid[i + 1][j] === 0) || (grid[i][j] === grid[i + 1][j] && grid[i][j] !== 0)){
            return true;
          }
        }
      }
    }
    if(direction === "up"){
      for(var i = 3; i > 0; i--){
        for(var j = 0; j < 4; j++){
          if((grid[i][j] !== 0 && grid[i - 1][j] === 0) || (grid[i][j] === grid[i - 1][j] && grid[i][j] !== 0)){
            return true;
          }
        }
      }
    }
    if(direction === "left"){
      for(var i = 0; i < 4; i++){
        for(var j = 3; j > 0; j--){
          if((grid[i][j] !== 0 && grid[i][j - 1] === 0) || (grid[i][j] === grid[i][j - 1] && grid[i][j] !== 0)){
            return true;
          }
        }
      }
    }
    if(direction === "right"){
      for(var i = 0; i < 4; i++){
        for(var j = 0; j < 3; j++){
          if((grid[i][j] !== 0 && grid[i][j + 1] === 0) ||  (grid[i][j] === grid[i][j + 1] && grid[i][j] !== 0)){
            return true;
          }
        }
      }
    }
    return false;
  }
  var checkIfgameOver = function(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(grid[i][j] === 0){
          return false;
        }
      }
    }
    if(checkIfLegalMove("up") || checkIfLegalMove("down") || checkIfLegalMove("left") || checkIfLegalMove("right")){
      return false;
    }
    window.alert("game over");
    return true;
  }

  startNewGame();

}
