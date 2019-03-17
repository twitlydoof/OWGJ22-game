//color stuff
var currentFillColor = null;


function Color(r, g, b)
{
	this.r = r || 0;
	this.g = g || 0;
	this.b = b || 0;
}


function setColor(color, a, b)
{
	if (typeof(color) == "number")
	{
		color = new Color(color, a, b);
	}
	currentColor = color;

	context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
}


function getColor()
{
	return currentFillColor;
}

currentFillColor = Color(255, 255, 255);


//key event stuff
// credits to Arthur Schreiber from http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
// slightly modified by twitlydoof

const KEYS =
{
	BACKSPACE: 8,
	TAB: 9,
	RETURN: 13,
	SHIFT: 16,
	CTRL: 17,
	ALT: 18,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,

	ZERO: 48,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,

	Q: 81,
	W: 87,
	E: 69,
	R: 82,
	T: 84,
	Z: 90,
	U: 85,
	I: 73,
	O: 79,
	P: 80,
	A: 65,
	S: 83,
	D: 68,
	F: 70,
	G: 71,
	H: 72,
	J: 74,
	K: 75,
	L: 76,
	Y: 89,
	X: 88,
	C: 67,
	V: 86,
	B: 66,
	N: 78,
	M: 77,
}

var Keyboard = {
	_pressed: {},



	isDown: function(keyCode) {
		return this._pressed[keyCode];
	},

	onKeyDown: function(event) {

	},

	onKeyUp: function(event) {

	},
};


window.addEventListener("keyup", function(event)
{
	if (Keyboard._pressed[event.keyCode])
	{
		Keyboard.onKeyUp(event.keyCode);
		delete Keyboard._pressed[event.keyCode];
	}
}, false);
window.addEventListener("keydown", function(event)
{
	if (!Keyboard._pressed[event.keyCode])
	{
		Keyboard.onKeyDown(event.keyCode);
		Keyboard._pressed[event.keyCode] = true;
	}
}, false);
