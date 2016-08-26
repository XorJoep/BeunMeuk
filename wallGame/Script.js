var wallGame = function(){

	console.log("Starting a new game.");

	//var topGame = document.getElementById("game").getBoundingClientRect().top;
	var heightGame =  document.getElementById("game").getBoundingClientRect().height;
	var leftGame =  document.getElementById("game").getBoundingClientRect().left;
	var rightGame =  document.getElementById("game").getBoundingClientRect().right;
	var widthGame = document.getElementById("game").getBoundingClientRect().width;

	console.log(document.getElementById("game").getBoundingClientRect());

	var wallsi = 0;
	var intervalSpeed=8;
	var intervalWall=1500;
	var widthOfHole=80;
	var level=0;

	var mWI;
	var textInterval;
	var cWI;
	var moveAvatarInterval;
	var detectCollisionInterval;

	//var playerX = leftGame + widthGame /2;
	var playerX = widthGame /2;
	//var playerY = topGame + heightGame * 0.8;
	var playerY = heightGame * 0.8;
	var cursorX;

	//var myAudio;
	//var hitWall = new Audio('hitwall.mp3');

	startGame();

	function startGame () {
		document.getElementById("game").innerHTML="";

		//mouse movement
		document.onmousemove = function(e){
		    cursorX = e.pageX;
		}
		createAvatar();
		moveAvatarInterval = setInterval(function(){moveAvatar();},10);
	 	cWI = setInterval(function(){createWall();}, intervalWall);
		mWI = setInterval(function(){moveWall()},intervalSpeed);
		detectCollisionInterval = setInterval (function(){detectCollision();},10);
		textInterval = setInterval(function(){showInfo();}, 50);

	 	//myAudio = new Audio('loop.mp3');
		//myAudio.loop = true;
		//myAudio.play();
	 }

	function createWall(){
		var wall = document.createElement("wall");
		wall.className = "classWall";
		document.getElementById("game").appendChild(wall);

    //wall.style.top= topGame + "px";
		wall.style.top= 0 + "px";
    wall.style.height= heightGame/15 + "px";
    //wall.style.left= leftGame + "px";
		wall.style.left= 0 + "px";
		//wall.style.right= rightGame + "px";
    wall.style.width = widthGame + "px";

		console.log(  wall.style.top,wall.style.height,	wall.style.left,wall.style.right,wall.style.width);

    //give each wall a random hole
		var hole = document.createElement("hole");
		hole.className = "classHole";
		var holeLeft = 0 + Math.random() *(widthGame-widthOfHole);
		hole.style.top = 0 + "px";
		hole.style.height = heightGame/15 + "px";
		hole.style.left= holeLeft + "px";
		hole.style.right = holeLeft+widthOfHole + "px";
		hole.style.width= widthOfHole + "px";
		document.getElementById("game").appendChild(hole);

		if (level === 0 ) {
		 	wall.style.backgroundColor= "gray";
		 }

		 if (level === 1 ) {
		 	wall.style.backgroundColor= "brown";
		 }

		 if (level === 2 ) {
		 	wall.style.backgroundColor= "red";
		 }
		  if (level === 3 ) {
		 	wall.style.backgroundColor= "orange";
		 }
		  if (level === 4 ) {
		 	wall.style.backgroundColor= "yellow";
		 }
		  if (level === 5 ) {
		 	wall.style.backgroundColor= "GreenYellow";
		 }
		   if (level === 6 ) {
		 	wall.style.backgroundColor= "Green";
		 }
		  if (level === 7 ) {
			 	wall.style.backgroundColor= "Turquoise";
		 }
		  if (level === 8 ) {
			 	wall.style.backgroundColor= "RoyalBlue";
		 }
			if (level ===9) {
				wall.style.backgroundColor= "Fuchsia";
		 }

	}

	function moveWall(){
		var wallsArray = document.body.getElementsByTagName("wall");
		var holesArray = document.body.getElementsByTagName("hole");

		for (var i=0; i < wallsArray.length; i++ ) {

			var pxWall = parseInt(wallsArray[i].style.top);
			pxWall++;
			wallsArray[i].style.top = pxWall+"px";
			holesArray[i].style.top = pxWall+"px";
			//var bottomGame= document.getElementById("game").getBoundingClientRect().bottom;

			//if (pxWall + parseInt(wallsArray[i].style.height) > parseInt(bottomGame)){
			if (pxWall + parseInt(wallsArray[i].style.height) > heightGame){
				document.getElementById("game").removeChild(wallsArray[i]);
				document.getElementById("game").removeChild(holesArray[i]);
				wallsi++;
				FASTER();
			}
		}
	}

	function createAvatar() {
		avatar = document.createElement("avatar");
		document.getElementById("game").appendChild(avatar);
		avatar.className = "classAvatar";
		avatar.setAttribute("id", "idAvatar");
		avatar.style.top= playerY + "px";
		avatar.style.left = playerX + "px";
	}

	function moveAvatar() {
		var MA = document.getElementById("idAvatar");
		if (MA === null) {
			return;
		}

		if (cursorX > rightGame -20){
			 playerX=width-20;
		}
		else if (cursorX < leftGame ) {
			playerX = 0;
		}
		else {
			playerX = cursorX;
		}
		MA.style.left=playerX + "px";
	}


	function detectCollision() {
		var wallsArray = document.body.getElementsByTagName("wall");
		var holesArray = document.body.getElementsByTagName("hole");
		var avatar = document.getElementById("idAvatar");

		if (wallsArray === null) {
			console.log("array is empty!");
			return;
		}

		if (avatar === null){
			return;
		}

		for (var i=0; i < wallsArray.length; i++ ) {

			if (wallsArray[i] === null){
				console.log("index" + i + "is empty");
				return;
			}
			var positionwall =wallsArray[i].getBoundingClientRect();
			var positionavatar = avatar.getBoundingClientRect();

			if (positionwall.bottom -1 > positionavatar.top && positionwall.top < positionavatar.bottom) {
				var positionHole = holesArray[i].getBoundingClientRect();

				if ( positionavatar.left +2 < positionHole.left || positionavatar.right -2 > positionHole.right) {
					gameOver();
					//myAudio.pause();
					//hitWall.play();
				}
			}
		}
	}

	function FASTER() {
		//TO DO: when you reach 16, you win
		if (wallsi !== 0 && wallsi % 5 === 0 ) {
			console.log('FASTER');
			level++;

			if (level % 2 === 0) {
				intervalWall-=40 *level;
				clearInterval(cWI);
				cWI=setInterval(createWall,intervalWall);

				intervalSpeed--;
				clearInterval(mWI);
				mWI=setInterval(moveWall, intervalSpeed);
				console.log("intervalspeed increased");
			}
			else {
				if (widthOfHole >40) {
				 	widthOfHole -= 10;
				}
			}
		}
	}

	function showInfo() {
		//var textfield = document.getElementById("gametext");
		document.getElementById("level").innerHTML = level;
		document.getElementById("wallPassed").innerHTML = wallsi;
	}

	function gameOver() {
		wallsi=0;
		level=0;
		widthOfHole=80;
		intervalSpeed=8;
		intervalWall=1500;
		clearInterval(textInterval);
		clearInterval(detectCollisionInterval);
		clearInterval(moveAvatarInterval);
		clearInterval(cWI);
		clearInterval(mWI);

		document.getElementById("game").removeChild(document.getElementById("idAvatar"));
		document.getElementById("game").innerHTML= '<div id = "gameover"> GAME OVER</div>' + '<button id ="restart" onClick = "wallGame();"> restart</button>';

	}

}
