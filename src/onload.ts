document.addEventListener('DOMContentLoaded', init);
canvas.addEventListener('mousemove', updateMousePosition);
canvas.addEventListener('mousedown', (e) => {
	if (e.button == 0) {
		mouse.down = true;
	} else if (e.button == 2) {
		mouse.left = true;
	}
});
canvas.addEventListener('mouseup', (e) => {
	if (e.button == 0) {
		mouse.down = false;
	} else if (e.button == 2) {
		mouse.left = false;
	}
});

function updateMousePosition(this: HTMLCanvasElement, ev: MouseEvent) {
	mouse.x = ev.clientX;
	mouse.y = ev.clientY;
}
