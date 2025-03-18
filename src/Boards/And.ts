class And extends NodeElement {
	focused: boolean = false;
	dragging: boolean = false;
	setRel: boolean = false;
	relativeX: number = 0;
	relativeY: number = 0;
	draggable: boolean = true;
	mouseDownAndNotOver: boolean = false;
	nodes: LogicNode[] = [];
	constructor(parent: Board, x: number, y: number, w: number, h: number) {
		super(parent, x, y, w, h, 'And');
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

		if (this.nodes[0].powered && this.nodes[1].powered) {
			this.nodes[2].powered = true;
		} else this.nodes[2].powered = false;
	}
}
