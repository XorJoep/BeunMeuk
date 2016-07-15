//Lets you create a block from these properties.

RGBToHex = function(r,g,b){
    var bin = r << 16 | g << 8 | b;
    return (function(h){
        return "#" + new Array(7-h.length).join("0")+h
    })(bin.toString(16).toUpperCase())
}

function Block(blockprop){
	this.code = blockprop.code;
	this.rotatable = blockprop.rotatable;
	this.form = blockprop.form;
	this.color = blockprop.color;
}

var Blocks = {

	O: {
		code: "O",
		rotatable: false,
		form: [[-1, 0], [0, 0], [0, 1], [-1,1]],
		color: RGBToHex(255,255,0) //yellow
		},
	I: {
		code: "I",
		rotatable: true,
		form: [[0, 0], [-1, 0], [1, 0], [2, 0]],
		color: RGBToHex(0,200,255) //lightblue
		},
	J: {
		code: "J",
		rotatable: true,
		form: [[0, 0], [-1, 0], [-1, 1], [1, 0]],
		color: RGBToHex(0,0,255) //darkblue
		},
	L: {
		code: "L",
		rotatable: true,
		form: [[0, 0], [-1, 0], [1, 0], [1, 1]],
		color: RGBToHex(255,180,0) //Orange
		},
	S: {
		code: "S",
		rotatable: true,
		form: [[0, 0], [-1, 0], [0, 1], [1, 1]],
		color: RGBToHex(255,0,200) //Pink
		},
	T: {
		code: "T",
		rotatable: true,
		form: [[0, 0], [-1, 0], [0, 1], [1, 0]],
		color: RGBToHex(200,0,255) //Purple
		},
	Z: {
		code: "Z",
		rotatable: true,
		form: [[0,0], [0, -1], [1, -1], [-1, 0]],
		color: RGBToHex(255,0,0) //Red
	},

	0 : "O",
	1 : "I",
	2 : "J",
	3 : "L",
	4 : "S",
	5 : "T",
	6 : "Z"

	// }
}

function multiply(a, b) {
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
	  for (var r = 0; r < aNumRows; ++r) {
	    m[r] = new Array(bNumCols); // initialize the current row
	    for (var c = 0; c < bNumCols; ++c) {
	      m[r][c] = 0;             // initialize the current cell
	      for (var i = 0; i < aNumCols; ++i) {
	        m[r][c] += a[r][i] * b[i][c];
	      }
	    }
	  }
	  return m;
}
