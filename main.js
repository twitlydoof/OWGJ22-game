let obstacles = [];
let gameOver = false;

function createObstacle()
{
	let obstacle = new GameObject(new Vector2(Math.random() * WIDTH, HEIGHT), new Vector2(50, 50));
	obstacle.velocity.y = -Math.random()*500;
	obstacle.color = new Color(Math.random()*255, Math.random()*255, Math.random()*255);
	if (obstacle.color == BACKGROUND_COLOR)
	{

	}
	obstacles.push(obstacle);
}


function generateObstacles()
{

}

function load()
{
	player.load();
	createObstacle();
}


player.onCollision = function(obstacle)
{
	if (player.attacking == false)
	{
	//	obstacle.explode();
		gameOver = true;
	}
}

function update(deltaTime)
{
	if (gameOver)
	{
		return;
	}
	player.update(deltaTime);
	player.wake();
	obstacles.forEach(obstacle => 
	{
		obstacle.update(deltaTime);
		obstacle.wake();
		player.intersects(obstacle);
	});
}





function render()
{
	context.clearRect(0, 0, WIDTH, HEIGHT);

	if (gameOver)
	{
		console.log("ok");
		return;
	}


	obstacles.forEach(obstacle => 
	{
		obstacle.draw();
	});
	player.draw();

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
