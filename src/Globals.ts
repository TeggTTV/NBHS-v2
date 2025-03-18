const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;	
let width: number = 0; // set on load
let height: number = 0; // set on load

let selector = document.querySelector('#boardSelector') as HTMLElement;

type Mouse = {
    x: number,
    y: number,
    down: boolean,
	left: boolean,
	creatingWire: boolean,
	creatingWireNode: LogicNode | null
}

const mouse: Mouse = {
	x: 0,
	y: 0,
	down: false,
	left: false,
	creatingWire: false,
	creatingWireNode: null
};

function mouseOver(x: number, y: number, w: number, h: number, mx: number, my: number) {
	return mx > x && mx < x + w && my > y && my < y + h;
}