enum NodeType {
	Switch,
	And,
	Or,

	NewType,
}

type Logic = {
	powered?: boolean;
	inputs: number;
	outputs: number;
	type: NodeType;
	logic: Function;
};

class Board {
	public name: string = 'Unnamed Board';
	public type: NodeType;
	public elements: NodeElement[] = [];
	private wires: Wire[] = [];

	constructor(logic: Logic | null) {
		if (logic != null) {
			this.type = logic.type;
		} else {
			this.type = NodeType.NewType;
		}
	}

	public addNode(type: NodeType) {
		switch (type) {
			case NodeType.Switch:
				this.elements.push(
					new Switch(
						this,
						width / 2,
						height / 2,
						100,
						100,
						'Switch',
						false
					)
				);
				break;
			case NodeType.And:
				this.elements.push(
					new And(this, width / 2, height / 2, 100, 100)
				);
				break;

			case NodeType.Or:
				this.elements.push(
					new Or(this, width / 2, height / 2, 100, 100)
				);
				break;
			default:
				break;
		}
	}

	public createWire(startNode: LogicNode, endNode: LogicNode) {
		let wireExists = false;
		this.wires.forEach((w) => {
			if (
				(w.startNode == startNode && w.endNode == endNode) ||
				(w.startNode == endNode && w.endNode == startNode)
			) {
				wireExists = true;
				return;
			}
		});
		if (wireExists) return;

		let wire = new Wire(startNode, endNode);
		this.wires.push(wire);
	}

	public update() {
		this.wires.forEach((w) => {
			w.draw(ctx);
			w.update();
		});
		this.elements.forEach((e) => {
			e.draw(ctx);
			e.update(mouse, this.elements, ctx, 50, canvas, this.elements);
		});
	}
}
