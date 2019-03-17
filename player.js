var player = new GameObject(new Vector2(WIDTH/2-25, 10), new Vector2(50, 50));
let playerMinX = player.size.x;
let playerMaxX = WIDTH-player.size.x;
let playerMinY = 10;
let playerSpeed = 300;

let fireBallTrailList = [];
let fireBallTrailSprite = null;
let numberOfFireBallsToRemove = 0;

function addFireBallTrail(timeWhenCreated)
{
	let fireBallTrail = new GameObject(new Vector2(player.left, player.top), new Vector2(75, 75));
	fireBallTrail.velocity.y = -playerSpeed*4;
	fireBallTrail.timeWhenCreated = timeWhenCreated;
	fireBallTrail.lifeSpan = 2;
	fireBallTrail.preparedForRemoval = false;

	fireBallTrail.update = function(deltaTime, timePassedForTrail)
	{
		if (this.preparedForRemoval == false && timePassedForTrail - this.timeWhenCreated >= this.lifeSpan)
		{
			this.preparedForRemoval = true;
			numberOfFireBallsToRemove += 1;
		}

		let randomSizeEffect = Math.random()*8+1;
		if (fireBallTrail.size.x - randomSizeEffect > 0)
		{
			fireBallTrail.size.x = fireBallTrail.size.x - randomSizeEffect;
			fireBallTrail.position.x = fireBallTrail.position.x + randomSizeEffect/2;
		}
		this.position = this.position.add(this.velocity.multiply(deltaTime));
	}

	fireBallTrailList.push(fireBallTrail);
}



player.load = function()
{
	fireBallTrailSprite = new Image(25, 25);
	fireBallTrailSprite.src = 'assets/fireball_trail.png';

	this.playerSprite = new Image(player.size.x, player.size.y);
	this.playerSprite.src = 'assets/player.png';
	this.playerFireBallSprite = new Image(player.size.x, player.size.y);
	this.playerFireBallSprite.src = 'assets/player_fireball.png';
	this.attacking = false;
	this.timePassedWhileAttacking = 0;
	this.timePassedAfterAttacking = 3; //no need to wait when game starts to attack
	this.maxAttackTime = 2;
	this.attackCoolDown = 3;

	this.draw = function()
	{
		if (this.attacking)
		{
			fireBallTrailList.forEach(fireBallTrail => {
				context.drawImage(fireBallTrailSprite, fireBallTrail.position.x, fireBallTrail.position.y, fireBallTrail.size.x, fireBallTrail.size.y);
			}); 

			context.drawImage(this.playerFireBallSprite, this.position.x, this.position.y, this.size.x + Math.random()*2, this.size.y + Math.random()*2);
		}
		else
			context.drawImage(this.playerSprite, this.position.x, this.position.y);
	}
}

player.update = function(deltaTime)
{
	if (this.attacking)
	{

		addFireBallTrail(this.timePassedWhileAttacking);
		//this is up here, so that just in case can be
		//automatically be removed by the following conditions

		if (this.timePassedWhileAttacking >= 0.8)
		{
			this.velocity.y = 0;
		} 
		if (this.timePassedWhileAttacking >= this.maxAttackTime)
		{
			if (this.position.y <= playerMinY)
			{
				this.attacking = false;
				this.velocity.y = 0;
				this.position.y = playerMinY;
				this.size.x = 50;
				this.size.y = 50;
				this.position.x = this.position.x + 12;
				this.timePassedAfterAttacking = 0;
				fireBallTrailList = [];
				numberOfFireBallsToRemove = 0;
			}
			else
			{
				this.velocity.y = -playerSpeed*0.5;
			}
		}

		

		fireBallTrailList.forEach(fireBallTrail => {
			fireBallTrail.update(deltaTime, this.timePassedWhileAttacking);
		}); 

		while (numberOfFireBallsToRemove > 0)
		{
			fireBallTrailList.shift();
			numberOfFireBallsToRemove--;
		}

		numberOfFireBallsToRemove = 0;
		this.timePassedWhileAttacking += deltaTime;
	}
	else
	{
		this.timePassedAfterAttacking += deltaTime;
	}
		

	if (this.left <= playerMinX)
	{
		if (this.velocity.x < 0)
		this.velocity.x = 0;
	}
	else if (this.right >= playerMaxX)
	{
		if (this.velocity.x > 0)
		this.velocity.x = 0;
	}
	this.position = this.position.add(this.velocity.multiply(deltaTime));
	this.wake();
}

Keyboard.onKeyDown = function(key)
{
	if (key == KEYS.D || key == KEYS.RIGHT)	
	{
		player.velocity.x = playerSpeed;
	}

	if (key == KEYS.A || key == KEYS.LEFT)
	{
		player.velocity.x =  -playerSpeed;
	}

	
	if (key == KEYS.SPACE && player.attacking == false && player.timePassedAfterAttacking >= player.attackCoolDown)
	{
		player.size.x = 75;
		player.size.y = 75;
		player.position.x = player.position.x - 12;
		player.velocity.y = playerSpeed*2;

		player.timePassedWhileAttacking = 0;
		player.attacking = true;
	}
}

Keyboard.onKeyUp = function(key)
{
	if ((key == KEYS.D || key == KEYS.RIGHT) && player.velocity.x == playerSpeed)	
	{
		player.velocity.x = 0;
	}

	if ((key == KEYS.A || key == KEYS.LEFT) && player.velocity.x == -playerSpeed)
	{
		player.velocity.x = 0;
	}
}