var counter = [];
var solution = [0, 0, 0, 0];
var startOfRow = 0;
var row = 1;

function startMasterGame() {
  initializeArray();
  randomizeSolution();
  console.log(solution);
  var s = "";

  for(var i = 0; i < 10; i++) {
    s += '<div class="MasterRow">';
    for(var j = 0; j < 4; j++) {
      s += '<div id="' + i + j + '" class="MasterTiles" onclick="changeColor(this.id)"></div>';
    }
    s += '</div>';
  }

  document.getElementById("MasterBoard").innerHTML = s;
  var t = "";

  for(var r = 1; r < 11; r++) {
    t += '<div class="MasterRow">';
    for(var i = 0; i < 2; i++) {
      t += '<div class="MasterCheckTiles">';
      for(var j = 0; j < 2; j++) {
        t += '<div id ="' + r + i + j + '" class="CheckTiles"></div>';
      }
      t += '</div>';
    }
    t += '</div>';
  }
  document.getElementById("MasterCheck").innerHTML = t;
}

function initializeArray() {
  for(var i = 0; i < 100; i++) {
    counter[i] = -1;
  }
}


function changeColor(elem) {
  counter[parseInt(elem)]++;
  if(counter[parseInt(elem)] === 5) {
  	counter[parseInt(elem)] = 0;
  }

  switch (counter[parseInt(elem)]) {
    case 0:
      document.getElementById(elem).innerHTML = '<div id="red"></div>';
      break;
    case 1:
      document.getElementById(elem).innerHTML = '<div id="blue"></div>';
      break;
    case 2:
      document.getElementById(elem).innerHTML = '<div id="green"></div>';
      break;
    case 3:
      document.getElementById(elem).innerHTML = '<div id="yellow"></div>';
      break;
    case 4:
      document.getElementById(elem).innerHTML = '<div id="orange"></div>';
      break;
  }

}

function checkMaster() {
  var correct = 0;
  var whites = 0;
  var currentRow = [counter[startOfRow], counter[startOfRow+1],counter[startOfRow+2],counter[startOfRow+3]];
  var done = [false, false, false, false];
  var check = [true, true, true, true];

  for(var i = 0; i < solution.length; i++) {
    if(currentRow[i] === -1) { //invalid input
      return; 
    }
  }

  for(var i = 0; i < solution.length; i++) {
    if(solution[i] === currentRow[i]) {
      correct++;
      done[i] = true;
      check[i] = false;
      console.log(correct);
    }
  }

  if(correct === 4) {
    window.alert("Yeah, well done!");
  }

  for(var i = 0; i < solution.length; i++) {
  	if(check[i] === true){
  		for(var j = 0; j < solution.length; j++) {
  			if((done[j] === false) && (currentRow[i] === solution[j])) {
  				done[j] = true;
  				whites++;
  				console.log(whites);
  			}
  		}
  	}
  }

  colorCheckTiles(correct, whites);

  startOfRow += 10;

}

function randomizeSolution() {
  for(var i = 0; i < solution.length; i++) {
    solution[i] = Math.floor(Math.random()*5);
  }
}

function colorCheckTiles(correct, whites) {
  var id = row * 100;
  row++;
  var idArray = [id, id + 1, id + 10, id + 11];

  for(var i = 0; i < correct; i++) {
      document.getElementById(idArray[i]).innerHTML = '<div id="redChecker"></div>';
  }

  for(var i = correct; i < correct + whites; i++) {
  	document.getElementById(idArray[i]).innerHTML = '<div id="whiteChecker"></div>';
  }

}
