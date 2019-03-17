
let gravity = new Vector2(0, 10);



function load()
{
	player.load();
}

function update(deltaTime)
{
	player.update(deltaTime);
	player.wake();
}





function render()
{
	context.clearRect(0, 0, WIDTH, HEIGHT);

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
