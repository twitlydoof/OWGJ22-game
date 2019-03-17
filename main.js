let player = new GameObject(new Vector2(0, 0), new Vector2(50, 50));
let enemy = new GameObject(new Vector2(200, 200), new Vector2(50, 50));
let ground = new GameObject(new Vector2(0, HEIGHT-100), new Vector2(WIDTH, 100));
let health = 100;

let gravity = new Vector2(0, 10);

let staticObjects = [];
let dynamicObjects = [];
	
player.color = enemy.color = new Color(255, 255, 255);

dynamicObjects.push(player);
dynamicObjects.push(enemy);

ground.color = new Color(225, 169, 95);

staticObjects.push(ground);

let speed = 100;

function update(deltaTime)
{

	dynamicObjects.forEach(function(object)
	{
		object.velocity = object.velocity.add(gravity);
		staticObjects.forEach(function(staticObject)
		{
			if (object.intersects(staticObject))
			{
				if (object.velocity.y > 0)
				{
					object.velocity.y = 0;
					object.position.y = staticObject.top - object.size.y;
				}
			}
		});
		object.update(deltaTime);
		object.wake();
	});

	//player.velocity = new Vector2(0, 0);
}


Keyboard.onKeyDown = function(key)
{
	if (key == KEYS.D)	
	{
		player.velocity.x = player.velocity.x + speed;
	}

	if (key == KEYS.A)
	{
		player.velocity.x = player.velocity.x - speed;
	}

	//if (key == KEYS.S)
	//{
	//	player.velocity.y = player.velocity.y + speed;
	//}

	//if (key == KEYS.W)
	//{
	//	player.velocity.y = player.velocity.y - speed;
	//}
}

Keyboard.onKeyUp = function(key)
{
	if (key == KEYS.D)	
	{
		player.velocity.x = player.velocity.x - speed;
	}

	if (key == KEYS.A)
	{
		player.velocity.x = player.velocity.x + speed;
	}

	//if (key == KEYS.S)
	//{
	//	player.velocity.y = player.velocity.y - speed;
	//}

	//if (key == KEYS.W)
	//{
	//	player.velocity.y = player.velocity.y + speed;
	//}
}


function render()
{
	context.clearRect(0, 0, WIDTH, HEIGHT);

	setColor(255, 0, 0);
	context.fillText(`HEALTH: ${health}`, 0, HEIGHT-12);

	staticObjects.forEach(function(object)
	{
		object.draw();
	});

	dynamicObjects.forEach(function(object)
	{
		object.draw();
	});

}



player.onCollision = function()
{
	player.color = new Color(Math.random()*255, Math.random()*255, Math.random()*255);
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
