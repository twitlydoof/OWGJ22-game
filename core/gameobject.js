function GameObject(position, size)
{
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
			console.log("yes");
			this.onCollision(otherBox);
			return true;
		}
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
