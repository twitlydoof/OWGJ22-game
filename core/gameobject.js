let NUMBER_OF_GAMEOBJECTS = 0;

function GameObject(position, size)
{
	NUMBER_OF_GAMEOBJECTS = NUMBER_OF_GAMEOBJECTS + 1;
	this.id = NUMBER_OF_GAMEOBJECTS;

	this.position	= position || new Vector2();
	this.size 		= size || new Vector2();
	this.velocity	= new Vector2();
	this.color		= new Color(1, 1, 1);

	this.left	= this.position.x;
	this.top	= this.position.y;
	this.right	= this.position.x + this.size.x;
	this.bottom = this.position.y + this.size.y;
	
}


GameObject.prototype = {
	collidingWith: {},

	draw: function()
	{
		setColor(this.color);
		drawRectangle(this.position, this.size);
	},
	
	intersects: function(otherBox)
	{
		if (this.left <= otherBox.right	&& this.right >= otherBox.left
				&& this.top <= otherBox.bottom && this.bottom >= otherBox.top)
		{
			
			if (this.collidingWith[otherBox.id] != true)
			{
				this.collidingWith[otherBox.id] = true;
				this.onCollision(otherBox);
				console.log("yes");
			}
			return true;
		}
		if (this.collidingWith[otherBox.id] == true)
		{
			console.log("no");
			this.collidingWith[otherBox.id] = false;
		}
	
		return false;
	},

	onCollision: function(objectCollidingWith) {},

	update: function(deltaTime)
	{
		this.position = this.position.add(this.velocity.multiply(deltaTime));
	},

	wake: function()
	{
		this.left = this.position.x;
		this.top = this.position.y;
		this.right = this.position.x + this.size.x;
		this.bottom = this.position.y + this.size.y;
	},



};
