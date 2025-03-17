"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = 0; // set on load
let height = 0; // set on load
let selector = document.querySelector('#boardSelector');
const mouse = {
    x: 0,
    y: 0,
    down: false
};
function mouseOver(x, y, w, h, mx, my) {
    return mx > x && mx < x + w && my > y && my < y + h;
}
