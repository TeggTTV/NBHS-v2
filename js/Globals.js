"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width = 0; // set on load
let height = 0; // set on load
let selector = document.querySelector('#boardSelector');
const mouse = {
    x: 0,
    y: 0,
    down: false,
    left: false,
    creatingWire: false,
    creatingWireNode: null,
};
function mouseOver(x, y, w, h, mx, my) {
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
function getNode(node) {
    let output = null;
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
function createWireBetweenNodes(startElementIndex, startNodeIndex, endElementIndex, endNodeIndex) {
    const startNode = board.elements[startElementIndex].nodes[startNodeIndex];
    const endNode = board.elements[endElementIndex].nodes[endNodeIndex];
    board.createWire(startNode, endNode);
}
function saveCustomBoard(name) {
    console.log('Saving custom board...');
    const customLogic = {
        name: name,
        inputs: 0,
        outputs: 0,
        type: NodeType.NewType,
        logic: (inputs) => {
            // Simulate the custom board logic without recursion
            let outputs = [];
            board.elements.forEach((element) => {
                if (!(element instanceof NodeElement &&
                    element.logic.name === name)) {
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
        }
        else if (element instanceof LED) {
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
    console.log(`Custom board "${name}" saved, added to the selector, and board cleared.`);
}
