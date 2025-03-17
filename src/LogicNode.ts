class LogicNode {
	parent: any;
	oX: number;
	oY: number;
	x: number;
	y: number;
	r: number;
	powered: boolean;
	mouseDown: boolean;
	dragging: boolean;
	focused: boolean;
	hasWire: boolean;
	connectedWire: any | null;

	constructor(
		parent: any,
		x: number,
		y: number,
		r: number,
		powered: boolean
	) {
		this.parent = parent;
		this.oX = x;
		this.oY = y;
		this.x = parent.x + x;
		this.y = parent.y + y;
		this.r = r;
		this.powered = powered;
		this.mouseDown = false;
		this.dragging = false;
		this.focused = false;

		this.hasWire = false;
		this.connectedWire = null;

		if (this.parent.nodes)
			if (this.parent.nodes.length === 0) {
				this.parent.nodes.push(this);
			} else {
				this.parent.nodes.forEach((node: LogicNode) => {
					if (node === this) {
						if (node.parent.nodes.length === 1) {
							return;
						}
					} else {
						node.parent.nodes.push(this);
					}
				});
			}
	}

	update(mouse: any, nodes: any[], ctx: CanvasRenderingContext2D) {
		this.x = this.parent.x + this.oX;
		this.y = this.parent.y + this.oY;
		if(mouseOver(this.x - this.r, this.y - this.r, this.r*2, this.r*2, mouse.x, mouse.y)) {
			// if(mouse.down)
		}
		// let count = 0;
		// if (wires.length === 0 && this.connectedWire !== undefined) {
		// 	this.connectedWire = null;
		// 	this.hasWire = false;
		// }
		// const wireSet = new Set(wires);
		// if (!wireSet.has(this.connectedWire)) {
		// 	this.connectedWire = null;
		// 	this.hasWire = false;
		// }

		// Logic for updating the power state of the node
		// if (this.connectedWire) {
		// 	if (this.connectedWire.startParent !== this) {
		// 		this.powered = this.connectedWire.startParent.powered;
		// 	} else if (
		// 		this.connectedWire.startParent === this &&
		// 		this.parent instanceof Switch
		// 	) {
		// 		this.connectedWire.endParent.powered = this.parent.powered;
		// 	}
		// } else {
		// 	if (!(this.parent instanceof Switch)) {
		// 		this.evaluateLogicGate();
		// 	} else {
		// 		this.powered = this.parent.powered;
		// 	}
		// }
	}

	private evaluateLogicGate() {
		// if (this.parent instanceof And && this.parent.nodes[2] === this) {
		// 	if (this.parent.nodes[0].powered && this.parent.nodes[1].powered) {
		// 		return;
		// 	}
		// }
		// if (this.parent instanceof Or && this.parent.nodes[2] === this) {
		// 	if (this.parent.nodes[0].powered || this.parent.nodes[1].powered) {
		// 		return;
		// 	}
		// }
		// if (this.parent instanceof XOr && this.parent.nodes[2] === this) {
		// 	if (this.parent.nodes[0].powered && this.parent.nodes[1].powered) {
		// 		this.powered = false;
		// 		return;
		// 	}
		// 	if (this.parent.nodes[0].powered || this.parent.nodes[1].powered) {
		// 		return;
		// 	}
		// }
		this.powered = false;
	}

	draw(ctx: CanvasRenderingContext2D) {
		if (this.parent) {
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.strokeStyle = 'lightgray';
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.fillStyle = this.getFillColor();
			ctx.fill();
		}
	}

	// private getFillColor(): string {
	// 	if (this.powered) return 'green';
	// 	if (
	// 		this.parent instanceof Not &&
	// 		this.parent.nodes[1] === this &&
	// 		!this.parent.nodes[0].powered
	// 	)
	// 		return 'green';
	// 	if (
	// 		this.parent instanceof NAnd &&
	// 		this.parent.nodes[2] === this &&
	// 		!this.parent.nodes[0].powered &&
	// 		!this.parent.nodes[1].powered
	// 	)
	// 		return 'green';
	// 	if (
	// 		this.parent instanceof NOr &&
	// 		this.parent.nodes[2] === this &&
	// 		!this.parent.nodes[0].powered &&
	// 		!this.parent.nodes[1].powered
	// 	)
	// 		return 'green';
	// 	if (
	// 		this.parent instanceof XNOr &&
	// 		this.parent.nodes[2] === this &&
	// 		((!this.parent.nodes[0].powered && !this.parent.nodes[1].powered) ||
	// 			(this.parent.nodes[0].powered && this.parent.nodes[1].powered))
	// 	)
	// 		return 'green';
	// 	return 'red';
	// }
	private getFillColor(): string {
		return 'green';
	}

	mouseOver(x: number, y: number): boolean {
		return (
			x > this.x - this.r &&
			x < this.x + this.r &&
			y > this.y - this.r &&
			y < this.y + this.r
		);
	}
}
