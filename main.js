let obstacles = [];
let gameOver = false;


let backgroundColor = new Color(BACKGROUND_COLOR_RED, BACKGROUND_COLOR_GREEN, BACKGROUND_COLOR_BLUE);
function createObstacle()
{
	let obstacle = new GameObject(new Vector2(Math.random() * WIDTH, HEIGHT), new Vector2(50, 50));
	obstacle.velocity.x = player.position.x - obstacle.position.x;
	obstacle.velocity.y = -Math.random()*500-100;
	obstacle.color = new Color(Math.random()*255, Math.random()*255, Math.random()*255);
	obstacle.preparedForRemoval = false;
	obstacle.safeToTouch = false;
	while (obstacle.color.equals(backgroundColor))
	{
		obstacle.color = new Color(Math.random()*255, Math.random()*255, Math.random()*255);
	}
	obstacle.explode = function()
	{
		obstacles.safeToTouch = obstacle.preparedForRemoval = true;
		obstacle.velocity.y = -obstacle.velocity.y;
		
		if (obstacle.position.x > player.position.x+player.size.x/2)
			obstacle.velocity.x = 1000*Math.random()+500;
		else if (obstacle.position.x < player.position.x+player.size.x/2)
			obstacle.velocity.x = -1000*Math.random()+500;
		else
			obstacle.velocity.x = 0;

	}
	obstacles.push(obstacle);
	return obstacle;
}

let currentRicardoMilos = undefined;
let ricardoMilosSprite;
function createRicardoMilos()
{
	currentRicardoMilos = createObstacle();
	currentRicardoMilos.safeToTouch = true;
	currentRicardoMilos.tag = "Ricardo Milos"

	currentRicardoMilos.draw = function()
	{
		ricardoMilosSprite.draw(this.position.x, this.position.y);
	}
}

function load()
{
	context.font = "20px Bradley Hand, cursive";

	ricardoMilosSprite = new SpriteSheet("assets/powerup_ricardomilos_spritesheet.png", new Vector2(100, 100), new Vector2(100, 100));

	player.load();
	

}


player.onCollision = function(obstacle)
{
	if (obstacle.tag == "Ricardo Milos")
	{
		obstacles.forEach(obstacle => {
			obstacle.explode();
		})
		return;
	}
	if (obstacle.safeToTouch)
		return;
	if (player.attacking == true)
	{
		obstacle.explode();
		points += 10;
	}
	else
		gameOver = true;
	
}

let gameTimePassed = 0;
let obstaclesCreated = 0;
let points = 0;
let highestPoints = 0;
let ricardoMilosTime = 10;
let ricardoMilosTimeSinceCreated = ricardoMilosTime;
let clearTime = 10;
function update(deltaTime)
{
	if (gameOver == true)
	{
		if (Keyboard.isDown(KEYS.SPACE))
		{
			if (points > highestPoints)
				highestPoints = points;
			gameOver = false;
			gameTimePassed = obstaclesCreated = points = 0;
			ricardoMilos = 1;
			obstacles = [];
			player.load();
			player.timePassedAfterAttacking = 0;
			player.velocity = new Vector2();
			player.wake();
		}
		return;
	} 

	gameTimePassed += deltaTime;

	if(Math.floor(gameTimePassed) % 2 == 0)
	{
		
		obstaclesCreated += 1;
		if (obstaclesCreated <= Math.ceil(points/15+0.1))
			createObstacle();
	}
	else
		obstaclesCreated = 0;


	ricardoMilosTimeSinceCreated += deltaTime;
	if (ricardoMilosTime - ricardoMilosTimeSinceCreated <= 0)
	{
		createRicardoMilos();
		ricardoMilosTimeSinceCreated = 0;
	}

	obstacles.forEach(obstacle => 
	{
		obstacle.update(deltaTime);
		obstacle.wake();
		player.intersects(obstacle);
	});
	player.update(deltaTime);
	player.wake();
	ricardoMilosSprite.update(deltaTime);
}





function render()
{
	context.clearRect(0, 0, WIDTH, HEIGHT);

	if (gameOver)
	{
		setColor(255, 0, 0);
		context.fillText("Game Over!", WIDTH/2-"Game Over!".length*7, HEIGHT/2-120);
		setColor(255, 255, 0);
		let pointText = `Points: ${Math.floor(gameTimePassed+points)}`;
		context.fillText(pointText, WIDTH/2-pointText.length*7, HEIGHT/2-80);
		setColor(255, 255, 255);
		context.fillText("Press SpaceBar to try again!", WIDTH/2-"Press SpaceBar to try again!".length*5, HEIGHT/2+20);
		return;
	}


	obstacles.forEach(obstacle => 
	{
		obstacle.draw();
	});
	player.draw();

	setColor(255, 255, 255);
	context.fillText(`Points: ${Math.floor(gameTimePassed+points)}`, 0, HEIGHT-30);
	context.fillText(`Highest points: ${Math.floor(highestPoints)}`, 0, HEIGHT-5);
}


let _startDeltaTime;
function leGameLoop() {
	update((new Date() - _startDeltaTime)/1000);
	render();
	_startDeltaTime = new Date();
	requestAnimationFrame(leGameLoop);
}

load();
_startDeltaTime = new Date();
requestAnimationFrame(leGameLoop);
