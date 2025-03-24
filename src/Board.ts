enum NodeType {
    Default,
    NewType,
    Switch,
    And,
    Or,
    Not,
    NAnd,
    NOr,
    XOr,
    XNOr,
    LED,
}

type Logic = {
    name: string;
    powered?: boolean;
    inputs: number;
    outputs: number;
    type: NodeType;
    logic: Function;
};

class Board {
    public name: string = "Unnamed Board";
    public type: NodeType;
    public truthTable: TruthTable[] | null; // Add logic property
    public elements: NodeElement[] = [];
    public wires: Wire[] = [];

    constructor(
        name: string,
        truthTable: TruthTable[] | null,
        elements?: NodeElement[],
        wires?: Wire[]
    ) {
        this.name = name;
        this.truthTable = truthTable; // Initialize logic property
        if (truthTable != null) {
            this.type = NodeType.NewType;
        } else {
            this.type = NodeType.NewType;
        }

        this.elements = elements || [];
        this.wires = wires || [];
    }
    public addElement(element: NodeElement) {
        this.elements.push(element);
    }
    public addNode(board: Board) {
        let truthTable = board.truthTable;
        if (!truthTable) return;
        if (truthTable[0].inputs.length == 0) {
            // switch
            this.elements.push(
                new Switch(
                    this,
                    "Switch",
                    width / 2,
                    height / 2,
                    100,
                    100,
                    false
                )
            );
        } else if (truthTable == LEDTruthTable) {
            this.elements.push(
                new LED(this, "LED", width / 2, height / 2, 100, 100)
            );
        } else {
			// Add logic gates
			this.elements.push(
				new NodeElement(
					this,
					board.name,
					width / 2,
					height / 2,
					100,
					100,
					truthTable
				)
			);
		
		}

        // switch (type) {
        //     case NodeType.Switch:
        //         this.elements.push(
        //             new Switch(
        //                 this,
        //                 "Switch",
        //                 width / 2,
        //                 height / 2,
        //                 100,
        //                 100,
        //                 false
        //             )
        //         );
        //         break;
        //     case NodeType.And:
        //         this.elements.push(
        //             new And(this, "And", width / 2, height / 2, 100, 100)
        //         );
        //         break;

        //     case NodeType.Not:
        //         this.elements.push(
        //             new Not(this, "Not", width / 2, height / 2, 100, 100)
        //         );
        //         break;
        //     case NodeType.XOr:
        //         this.elements.push(
        //             new XOr(this, "XOr", width / 2, height / 2, 100, 100)
        //         );
        //         break;
        //     case NodeType.Or:
        //         this.elements.push(
        //             new Or(this, "Or", width / 2, height / 2, 100, 100)
        //         );
        //         break;
        //     case NodeType.NAnd:
        //         this.elements.push(
        //             new NAnd(this, "NAnd", width / 2, height / 2, 100, 100)
        //         );
        //         break;
        // 	case NodeType.NOr:
        // 		this.elements.push(
        // 			new NOr(this, "NOr", width / 2, height / 2, 100, 100)
        // 		);
        // 		break;
        // 	case NodeType.XNOr:
        // 		this.elements.push(
        // 			new XNOr(this, "XNOr", width / 2, height / 2, 100, 100)
        // 		);
        // 		break;

        //     case NodeType.LED:
        //         this.elements.push(
        //             new LED(this, "LED", width / 2, height / 2, 100, 100)
        //         );
        //         break;
        //     default:
        //         // Handle custom boards or unknown types
        //         // const customBoard = boardSelector.boards.find(
        //         //     (b) => b.type === type
        //         // );
        //         // if (customBoard) {
        //         //     const customNode = new NodeElement(
        //         //         this,
        //         //         customBoard.name,
        //         //         width / 2,
        //         //         height / 2,
        //         //         100,
        //         //         100,
        //         //     );

        //         //     let nodes = [];
        //         //     // Add input and output nodes to the custom node
        //         //     for (let i = 0; i < customBoard.logic!.inputs; i++) {
        //         //         nodes.push(
        //         //             new LogicNode(customNode, 0, (i + 1) * 20, 7, false)
        //         //         );
        //         //     }
        //         //     for (let i = 0; i < customBoard.logic!.outputs; i++) {
        //         //         nodes.push(
        //         //             new LogicNode(
        //         //                 customNode,
        //         //                 customNode.w,
        //         //                 (i + 1) * 20,
        //         //                 7,
        //         //                 false
        //         //             )
        //         //         );
        //         //     }
        //         //     customNode.nodes = nodes;
        //         //     customNode.nodes.forEach((node) => {
        //         //         node.parent = customNode;
        //         //     });
        //         //     this.elements.push(customNode);
        //         // } else {
        //         //     console.warn(`Unknown node type: ${type}`);
        //         // }
        //         break;
        // }
        // console.log(`Node of type ${type} added to the board.`);
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

        startNode.hasWire = true;
        endNode.hasWire = true;
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
            e.update(mouse, this.elements);
        });
    }
}
