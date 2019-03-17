let player = new GameObject(new Vector2(0, 0), new Vector2(50, 50));
let enemy = new GameObject(new Vector2(200, 200), new Vector2(50, 50));
let health = 100;

let gravity = new Vector2(0, 10);

let staticObjects = [];
let dynamicObjects = [];

player.color = enemy.color = new Color(255, 255, 255);

dynamicObjects.push(player);
dynamicObjects.push(enemy);


let speed = 100;

function update(deltaTime)
{
	if (Keyboard.isDown(KEYS.D))
	{
		player.velocity.x = speed;
	}

	if (Keyboard.isDown(KEYS.A))
	{
		player.velocity.x = -speed;
	}

	if (Keyboard.isDown(KEYS.S))
	{
		player.velocity.y = speed;
	}

	if (Keyboard.isDown(KEYS.W))
	{
		player.velocity.y = -speed;
	}

	dynamicObjects.forEach(function(object)
	{
		object.velocity = object.velocity.add(gravity);
		console.log(object.velocity.y);
		object.update(deltaTime);
		object.wake();
	});

	//player.velocity = new Vector2(0, 0);
}




function render()
{
	context.clearRect(0, 0, WIDTH, HEIGHT);

	setColor(255, 0, 0);
	context.fillText(`HEALTH: ${health}`, 0, HEIGHT-12);

	dynamicObjects.forEach(function(object)
	{
		object.draw();
	});

}



player.onCollision = function()
{
	speed = 50;
}









let _startDeltaTime;
function leGameLoop() {
	update((new Date() - _startDeltaTime)/1000);
	render();
	_startDeltaTime = new Date();
	requestAnimationFrame(leGameLoop);
}

_startDeltaTime = new Date();
requestAnimationFrame(leGameLoop);
