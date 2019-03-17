/*

Simple 2D JavaScript Vector2 Class

Hacked from evanw's lightgl.js
https://github.com/evanw/lightgl.js/blob/master/src/Vector2.js


Very slightly modified by twitlydoof
*/

function Vector2(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

/* INSTANCE METHODS */

Vector2.prototype = {
	negative: function() {
		return new Vector2(-this.x, -this.y);
	},
	add: function(v) {
		if (v instanceof Vector2) {
			return new Vector2(this.x + v.x, this.y + v.y);
		} else {
			return new Vector2(this.x + v, this.y + v);
		}
	},
	subtract: function(v) {
		if (v instanceof Vector2) {
			return new Vector2(this.x - v.x, this.y - v.y)
		} else {
			return new Vector2(this.x - v, this.y - v)
		}
	},
	multiply: function(v) {
		if (v instanceof Vector2) {
			return new Vector2(this.x * v.x, this.y * v.y)
		} else {
			return new Vector2(this.x * v, this.y * v)
		}

	},
	divide: function(v) {
		let vector2 = new Vector2(this.x, this.y)
		if (v instanceof Vector2) {
			if(v.x != 0) vector2.x /= v.x;
			if(v.y != 0) vector2.y /= v.y;
		} else if (v != 0) {
			vector2.x /= v;
			vector2.y /= v;
		}
		return vector2;
	},
	equals: function(v) {
		return this.x == v.x && this.y == v.y;
	},
	dot: function(v) {
		return this.x * v.x + this.y * v.y;
	},
	cross: function(v) {
		return this.x * v.y - this.y * v.x
	},
	length: function() {
		return Math.sqrt(this.dot(this));
	},
	normalize: function() {
		return this.divide(this.length());
	},
	min: function() {
		return Math.min(this.x, this.y);
	},
	max: function() {
		return Math.max(this.x, this.y);
	},
	toAngles: function() {
		return -Math.atan2(-this.y, this.x);
	},
	angleTo: function(a) {
		return Math.acos(this.dot(a) / (this.length() * a.length()));
	},
	toArray: function(n) {
		return [this.x, this.y].slice(0, n || 2);
	},
	clone: function() {
		return new Vector2(this.x, this.y);
	},
	set: function(x, y) {
		this.x = x; this.y = y;
				return this;
	}
};

/* STATIC METHODS */
Vector2.negative = function(v) {
	return new Vector2(-v.x, -v.y);
};
Vector2.add = function(a, b) {
	if (b instanceof Vector2) return new Vector2(a.x + b.x, a.y + b.y);
	else return new Vector2(a.x + b, a.y + b);
};
Vector2.subtract = function(a, b) {
	if (b instanceof Vector2) return new Vector2(a.x - b.x, a.y - b.y);
	else return new Vector2(a.x - b, a.y - b);
};
Vector2.multiply = function(a, b) {
	if (b instanceof Vector2) return new Vector2(a.x * b.x, a.y * b.y);
	else return new Vector2(a.x * b, a.y * b);
};
Vector2.divide = function(a, b) {
	if (b instanceof Vector2) return new Vector2(a.x / b.x, a.y / b.y);
	else return new Vector2(a.x / b, a.y / b);
};
Vector2.equals = function(a, b) {
	return a.x == b.x && a.y == b.y;
};
Vector2.dot = function(a, b) {
	return a.x * b.x + a.y * b.y;
};
Vector2.cross = function(a, b) {
	return a.x * b.y - a.y * b.x;
};
