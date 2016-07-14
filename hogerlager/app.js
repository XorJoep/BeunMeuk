var numbers = [];
var highscore = 0;
var startGame = function(){
	numbers.push(getRandomNumber());
	loadNumbers();
	setButtons(false);
}
var loadNumbers = function(){
	document.getElementById("numbers").innerHTML = stringify(numbers);
}
var stringify = function(value){
	var s = "";
	for(var i = 0; i < value.length; i++){
		s +=  value[i] + " ";
	}
	return s;
}
var higher = function(){
	numbers.push(getRandomNumber());
	loadNumbers();
	if(numbers[numbers.length - 1] < numbers[numbers.length - 2]){
		reset("lager");
	}
	else if(numbers[numbers.length - 1] == numbers[numbers.length - 2]){
		reset("even hoog");
	}
}
var lower = function(){
	numbers.push(getRandomNumber());
	loadNumbers();
	if(numbers[numbers.length - 1] > numbers[numbers.length - 2]){
		reset("hoger");
	}
	else if(numbers[numbers.length - 1] == numbers[numbers.length - 2]){
		reset("even hoog");
	}
}
var reset = function(value){
	window.alert("hij was " + value);
	document.getElementById("numbers").innerHTML = "";
	if(numbers.length > highscore){
		document.getElementById("highscore").innerHTML = "Highscore : " + numbers.length;
		highscore = numbers.length;
	}
	numbers = [];
	setButtons(true);
}
var setButtons = function(value){
	document.getElementById("higher").disabled = value;
	document.getElementById("lower").disabled = value;
}
var getRandomNumber = function(){
	return Math.floor((Math.random() * 10) + 1);
}
