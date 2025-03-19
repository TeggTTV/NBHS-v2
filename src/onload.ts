document.addEventListener('DOMContentLoaded', init);
canvas.addEventListener('mousemove', updateMousePosition);
document.addEventListener('mousedown', (e) => {
	if (e.button == 0) {
		mouse.down = true;
	} else if (e.button == 2) {
		e.preventDefault();
		mouse.left = true;
	}
});
document.addEventListener('mouseup', (e) => {
	if (e.button == 0) {
		mouse.down = false;
	} else if (e.button == 2) {
		e.preventDefault();
		mouse.left = false;
	}
});

function updateMousePosition(this: HTMLCanvasElement, ev: MouseEvent) {
	mouse.x = ev.clientX;
	mouse.y = ev.clientY;
}
