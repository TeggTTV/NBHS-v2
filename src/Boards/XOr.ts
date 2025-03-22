class XOr extends NodeElement {
	focused: boolean = false;
	dragging: boolean = false;
	setRel: boolean = false;
	relativeX: number = 0;
	relativeY: number = 0;
	draggable: boolean = true;
	mouseDownAndNotOver: boolean = false;
	nodes: LogicNode[] = [];
	constructor(parent: Board, x: number, y: number, w: number, h: number, logic: Logic) {
		super(parent, x, y, w, h, logic);
		this.nodes = [
			new LogicNode(this, 0, this.h / 2 - this.h / 4, 7, false),
			new LogicNode(this, 0, this.h / 2 + this.h / 4, 7, false),
			new LogicNode(this, this.w, this.h / 2, 7, false),
		];
	}
	updateNodes() {
		this.nodes.forEach((node) => {
			node.update(mouse, ctx);
			node.draw(ctx);
		});

		// Update the logic of the XOR gate based on the input nodes
		const input1 = this.nodes[0].powered;
		const input2 = this.nodes[1].powered;

		// XOR logic: output is true if inputs are different
		this.nodes[2].powered = input1 !== input2;
	}
}
