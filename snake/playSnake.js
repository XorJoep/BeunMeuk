
var snakeHighscore = 0;
var playingSnake = false;

function playIfNotPlayingSnake(){
  if (!playingSnake){
    playSnake();
  }
}

function playSnake(){
  playingSnake = true;
  var pressed;
  var gameOver = false;
  var directions = ["north","east","south","west"];
  var direction = directions[getNumber(4)];
  var size = 40;
  var snakePosition = [[getNumber(size),getNumber(size)]];
  var timeInterval = 50;
  var score = 0;
  var foodPosition = getNewFoodPosition()

  var loop = setInterval(function() {step();}, timeInterval)

  function step(){
    pressed = false;
    makeGrid();
    document.onkeydown = getDirection;
    moveSnake(snakePosition);
    checkGameOver();

    if (gameOver){
      window.alert("Game over!")
      clearInterval(loop);
      updateSnakeHighscore();
      playingSnake = false;
    }
  }

  function updateSnakeHighscore(){
    if (score >= snakeHighscore){
      snakeHighscore = score;
      document.getElementById("snakeHighscore").innerHTML = snakeHighscore;
    }
  }

  function getNewFoodPosition(){
    document.getElementById("snakeScore").innerHTML = score;
    var xVal = getNumber(size)
    var yVal = getNumber(size)
    while (contains(snakePosition,[xVal, yVal])){
      var xVal = getNumber(size)
      var yVal = getNumber(size)
    }
    return [xVal, yVal]
  }

  function getNumber(n){
    return Math.floor(Math.random()*n)
  }

  function getDirection(){

    if (!pressed){
      if (event.keyCode == 37 && direction !== "east") {
        direction = "west";
        pressed = true;
      }
      else if (event.keyCode == 38 && direction !== "south") {
        event.preventDefault();
        direction = "north";
        pressed = true;
      }
      else if (event.keyCode == 39 && direction !== "west") {
        direction = "east";
        pressed = true;
      }
      else if (event.keyCode == 40 && direction !== "north") {
        event.preventDefault();
        direction = "south";
        pressed = true;
      }
      else if (event.keyCode == 32){
        event.preventDefault();
      }
    }

  }

  function checkGameOver(){
    var length = snakePosition.length;
    last = snakePosition[length-1];
      if (last[0]<0 || last[0]>=size || last[1]<0 || last[1] >= size || contains(snakePosition.slice(0,length-1),last)){
        gameOver = true;
      }
  }

  function moveSnake(){
    var length = snakePosition.length;
    var lastxVal = snakePosition[length-1][0]
    var lastyVal = snakePosition[length-1][1]
    if (direction === "east"){
      var newCoordinate = [lastxVal+1, lastyVal];
    }
    else if (direction === "north"){
      var newCoordinate = [lastxVal, lastyVal-1];
    }
    else if (direction === "south"){
      var newCoordinate = [lastxVal, lastyVal+1];
    }
    else if (direction === "west"){
      var newCoordinate = [lastxVal-1, lastyVal];
    }
    else{
      window.alert("moveSnake")
    }
    if (newCoordinate.toString() === foodPosition.toString()){
      snakePosition.push(newCoordinate);
      score += 100;
      foodPosition = getNewFoodPosition();
    }
    else {
      snakePosition.push(newCoordinate);
      snakePosition.shift()
    }
  }

  function makeGrid(){

    var screenWidth = document.getElementById("snakeContainer").clientWidth;
    var screenHeight = document.getElementById("snakeContainer").clientHeight;
    var dx = parseInt(Math.round(screenWidth/size));
    var dy = parseInt(Math.round(screenHeight/size));


    var grid = "";

    for (var i=0; i<size; i++){
      var row = "<div style='display:flex;'>";
      for (var j=0; j<size; j++){

        if (contains(snakePosition, [j,i])){
          row  += "<div class=isSnake style='display: in-line; height: "+ dy + "px; width: " + dx + "px;'></div>";
        }
        else if (contains([foodPosition],[j,i])){
          row  += "<div class=isNotSnake style='display: in-line; height: "+ dy + "px; width: " + dx + "px;'>*</div>";
        }
        else {
          row  += "<div class=isNotSnake style='display: in-line; height: "+ dy + "px; width: " + dx + "px;'></div>";
        }
      }
      grid += (row + "</div>");
    }
    document.getElementById("snakeContainer").innerHTML = grid;

  }

  function contains(array, subArray){

    for (i=0; i<array.length; i++){
      if (array[i].toString() === subArray.toString()){
        return true;
      }
    }
    return false;
  }
}
