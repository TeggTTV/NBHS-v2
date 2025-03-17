enum NodeType {
    Switch,
    And,
    Or,

    NewType
}

type Logic = {
	inputs: number;
	outputs: number;
    type: NodeType;
	logic: Function;
};


class Board {
	public name: string = 'Unnamed Board';
    public type: NodeType;
	private elements: NodeElement[] = [];

	constructor(logic: Logic | null) {
        if(logic != null) {
            this.type = logic.type;
        } else {
            this.type = NodeType.NewType
        }
    }

	public addNode(type: NodeType) {
		switch (type) {
			case NodeType.Switch:
				this.elements.push(
					new Switch(width / 2, height / 2, 100, 100, 'Switch', false)
				);
            
		}
	}

	public update() {}
}
