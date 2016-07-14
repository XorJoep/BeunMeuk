


var getRandomBlock = function() {
	var type = Math.floor(Math.random() * 7);
	block {
		color : type,
	}
}


// var newBlock = function(blockType) {
// 	this.x = 0;
// 	this.y = 3;
// 	this.rotation = 0;


// 	return block;
// }

var Blocks = {
	O : 0,
	I : 1,
	J : 2,
	L : 3,
	S : 4,
	T : 5,
	Z : 6,
	prop: {
		0: {
			code: "O",
			rotatable: false,
			form: [[0,1]
			},
		1: {
			code: "I",
			rotatable: true

		}
	}
// }