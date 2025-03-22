const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let width: number = 0; // set on load
let height: number = 0; // set on load

let selector = document.querySelector('#boardSelector') as HTMLElement;

type Mouse = {
	x: number;
	y: number;
	down: boolean;
	left: boolean;
	creatingWire: boolean;
	creatingWireNode: LogicNode | null;
};

const mouse: Mouse = {
	x: 0,
	y: 0,
	down: false,
	left: false,
	creatingWire: false,
	creatingWireNode: null,
};

function mouseOver(
	x: number,
	y: number,
	w: number,
	h: number,
	mx: number,
	my: number
) {
	return mx > x && mx < x + w && my > y && my < y + h;
}

// interface SmallNode {
// 	parent
// }

// class SmallWire {
// 	constructor(startNode: SmallNode, endNode: SmallNode) {

// 	}
// }

// class SmallBoard {
// 	board: Board;
//     constructor(board: Board) {
// 		let newElements: {
// 			type: NodeType,
// 			nodes: LogicNode[]
// 		}[] = [];
// 		this.board = board;
// 		for(let e of this.board.elements) {
// 			newElements.push({
// 				nodes: e.nodes,
// 				type: e.logic.type
// 			})

// 		}
// 		let wires: Wire[] = [];
// 		for(let w of this.board.wires) {
// 		newElements.forEach(e => {
// 			e.nodes.forEach(n => {
// 				if(w.startNode == n) {
// 					wires.push(new Wire({

// 					}, {}));

// 				}
// 			})
// 		})
// 		}
// 	}
// }

function getNode(node: LogicNode) {
	let output: LogicNode | null = null;
	board.wires.forEach((w) => {
		if (w.startNode == node) {
			output = w.endNode;
		}
	});
	return output;
}

/**
 * Helper function to create a wire between two nodes.
 * @param startElementIndex Index of the starting element in the board.
 * @param startNodeIndex Index of the starting node in the element.
 * @param endElementIndex Index of the ending element in the board.
 * @param endNodeIndex Index of the ending node in the element.
 */
function createWireBetweenNodes(
	startElementIndex: number,
	startNodeIndex: number,
	endElementIndex: number,
	endNodeIndex: number
) {
	const startNode = board.elements[startElementIndex].nodes[startNodeIndex];
	const endNode = board.elements[endElementIndex].nodes[endNodeIndex];
	board.createWire(startNode, endNode);
}

function saveCustomBoard(name: string) {
	console.log('Saving custom board...');

	const customLogic: Logic = {
		name: name,
		inputs: 0,
		outputs: 0,
		type: NodeType.NewType,
		logic: (inputs: boolean[]) => {
			// Simulate the custom board logic without recursion
			let outputs: boolean[] = [];
			board.elements.forEach((element) => {
				if (
					!(
						element instanceof NodeElement &&
						element.logic.name === name
					)
				) {
					element.updateNodes();
				}
			});
			board.wires.forEach((wire) => {
				wire.update();
			});
			board.elements.forEach((element) => {
				if (element instanceof LED) {
					outputs.push(element.nodes[0].powered);
				}
			});
			return outputs;
		},
	};

	// Count inputs and outputs
	board.elements.forEach((element) => {
		if (element instanceof Switch) {
			customLogic.inputs++;
		} else if (element instanceof LED) {
			customLogic.outputs++;
		}
	});

	// Create a new custom board with its elements and wires
	const customBoard = new Board(name, customLogic);
	customBoard.elements = [...board.elements];
	customBoard.wires = [...board.wires];

	// Add the custom board to the BoardSelector
	boardSelector.boards.push(customBoard);
	boardSelector.updateBoards();

	// Clear the current board
	board.elements = [];
	board.wires = [];
	console.log(
		`Custom board "${name}" saved, added to the selector, and board cleared.`
	);
}
