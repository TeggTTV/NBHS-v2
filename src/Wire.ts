class Wire {
	public startNode: LogicNode;
	public endNode: LogicNode;
	private color: string;
	constructor(startNode: LogicNode, endNode: LogicNode) {
		this.color = 'yellow';
		this.startNode = startNode;
		this.endNode = endNode;
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 4;
		ctx.beginPath();

		ctx.moveTo(this.startNode.x, this.startNode.y);
		ctx.lineTo(this.endNode.x, this.endNode.y);

		ctx.stroke();
	}
	update() {
		let start = this.startNode;
		let end = this.endNode;

		if (start.powered && start.x == start.parent.x + start.parent.w) {
			end.powered = true;
		} else if (
			!start.powered &&
			start.x == start.parent.x + start.parent.w
		) {
			end.powered = false;
		}
		if (end.powered && end.x == end.parent.x + end.parent.w) {
			start.powered = true;
		} else if (!end.powered && end.x == end.parent.x + end.parent.w) {
			start.powered = false;
		}

        let e = this.isMouseOnWire(mouse, this);
        console.log(e);
        
	}
	isMouseOnWire(mouse: Mouse, wire: Wire) {
		const { x: x1, y: y1 } = wire.startNode;
		const { x: x2, y: y2 } = wire.endNode;
		const { x: mx, y: my, down } = mouse;

		if (!down) return false; // Only detect when mouse is clicked

		// Line segment distance formula
		const A = my - y1;
		const B = x1 - mx;
		const C = x2 - x1;
		const D = y2 - y1;
        
		// Compute the dot product to find projection
		const dot = A * C + B * D;
		const lenSq = C * C + D * D;
		const param = lenSq !== 0 ? dot / lenSq : -1;

		// Find the closest point on the wire
		let nearestX, nearestY;

		if (param < 0) {
			nearestX = x1;
			nearestY = y1;
		} else if (param > 1) {
			nearestX = x2;
			nearestY = y2;
		} else {
			nearestX = x1 + param * C;
			nearestY = y1 + param * D;
		}

		// Compute distance from mouse to closest point
		const dx = mx - nearestX;
		const dy = my - nearestY;
		const distance = Math.sqrt(dx * dx + dy * dy);
        
		return distance <= 2; // Wire is 4 pixls thick, so we check within 2 pixels
	}
}
