"use strict";
document.addEventListener("DOMContentLoaded", init);
canvas.addEventListener("mousemove", updateMousePosition);
canvas.addEventListener('mousedown', () => {
    mouse.down = true;
});
canvas.addEventListener('mouseup', () => {
    mouse.down = false;
});
function updateMousePosition(ev) {
    mouse.x = ev.clientX;
    mouse.y = ev.clientY;
}
