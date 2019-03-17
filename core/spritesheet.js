//a quick implementation of spritesheet

function SpriteSheet(spriteSheetSource, spriteSize, imageSize)
{
	this.sprite = new Image(7750, 50);
	this.sprite.src = spriteSheetSource;
	this.spriteSize = spriteSize;
	this.imageSize = imageSize;
	this.frameNumber = 0;
	this.numberOfFrames = Math.floor(this.sprite.width/this.spriteSize.x);
	this.frameChangeTime = 1/35;
	this.timePassed = 0;
}


SpriteSheet.prototype = 
{
	draw: function(x, y)
	{
		context.drawImage(this.sprite, this.spriteSize.x*this.frameNumber, 0, this.spriteSize.x, this.spriteSize.y, x, y, this.imageSize.x, this.imageSize.y);
	},

	update: function(deltaTime)
	{
		this.timePassed += deltaTime;
		if (this.timePassed >= this.frameChangeTime)
		{
			this.timePassed = 0;
			this.frameNumber += 1;
			if (this.frameNumber > this.numberOfFrames - 1)
			{
				this.frameNumber = 0;
			}
		}
	},
};