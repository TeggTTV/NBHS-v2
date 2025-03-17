document.addEventListener("DOMContentLoaded", init);
canvas.addEventListener("mousemove", updateMousePosition);
canvas.addEventListener('mousedown', () => {
	mouse.down = true;
});
canvas.addEventListener('mouseup', () => {
	mouse.down = false;
});

function updateMousePosition(this: HTMLCanvasElement, ev: MouseEvent) {
    mouse.x = ev.clientX;
    mouse.y = ev.clientY;
}
