var number;
var tries=0;


function getNumber(){
  number = Math.ceil(Math.random()*100);
  console.log(number);
}

function guessNumber(){

  var guess=document.getElementById("guess").value;
  if (guess.trim()===""){
    document.getElementById("console").innerHTML = "No number was selected.";
    return
  }

  tries++;

  if (guess==number){
    document.getElementById("console").innerHTML = "<div id=consoleWin> Nice, you got it: " + number + "</div>"+
    "<div id=tries>Tries: " + tries + "</div>";

  }
  else if (guess>number){
    document.getElementById("console").innerHTML = "<div id=consoleLose>" + guess + " is not right. Try lower! </div>"
  }
  else if (guess<number){
    document.getElementById("console").innerHTML = "<div id=consoleLose>" + guess + " is not right. Try higher! </div>"
  }
  else{
    document.getElementById("console").innerHTML = "Please insert a number."
    }
}

function guessNumberOnEnter(){
  var keyCode = window.event.keyCode;
  if (keyCode == 13) {
    guessNumber();
    event.preventDefault();
    document.getElementById("guess").value = "";

  }
}
