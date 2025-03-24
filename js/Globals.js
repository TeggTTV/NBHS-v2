"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = 0; // set on load
let height = 0; // set on load
let selector = document.querySelector("#boardSelector");
const mouse = {
    x: 0,
    y: 0,
    down: false,
    left: false,
    creatingWire: false,
    creatingWireNode: null,
    dragging: false,
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
// function saveCustomBoard(name: string) {
//     console.log("Saving custom nodeelement...");
//     const customLogic: Logic = {
//         name: name,
//         inputs: 0,
//         outputs: 0,
//         type: NodeType.NewType,
//         logic: (inputs: boolean[]) => {
//             // Simulate the custom board logic without recursion
//             let outputs: boolean[] = [];
//             board.elements.forEach((element) => {
//                 if (
//                     !(element instanceof NodeElement && element.name === name)
//                 ) {
//                     element.updateNodes();
//                 }
//             });
//             board.wires.forEach((wire) => {
//                 wire.update();
//             });
//             board.elements.forEach((element) => {
//                 if (element instanceof LED) {
//                     outputs.push(element.nodes[0].powered);
//                 }
//             });
//             return outputs;
//         },
//     };
//     // Count inputs and outputs
//     board.elements.forEach((element) => {
//         if (element instanceof Switch) {
//             customLogic.inputs++;
//         } else if (element instanceof LED) {
//             customLogic.outputs++;
//         }
//     });
//     // Create a new custom board with its elements and wires
//     const customNodeElement = new NodeElement(
//         board,
//         name,
//         width / 2,
//         height / 2,
//         100,
//         100
//     );
//     customNodeElement.nodes.forEach((node) => {
//         node.parent = customNodeElement;
//     });
//     let newBoard = new Board(name, customLogic, board.elements, board.wires);
//     newBoard.elements.forEach((element) => {
//         element.parent = newBoard;
//     });
//     // Add the custom board to the selector
//     boardSelector.boards.push(newBoard);
//     boardSelector.updateBoards();
//     // Clear the current board
//     board.elements = [];
//     board.wires = [];
//     console.log(
//         `Custom board "${name}" saved, added to the selector, and board cleared.`
//     );
//     saveToLocalStorage(customNodeElement);
// }
function saveToLocalStorage(nodeElement) {
    const customElements = JSON.parse(localStorage.getItem("customNodeElements") || "[]");
    const elementData = {
        name: nodeElement.name,
        x: nodeElement.x,
        y: nodeElement.y,
        w: nodeElement.w,
        h: nodeElement.h,
        nodes: nodeElement.nodes.map((node) => ({
            x: node.x,
            y: node.y,
            powered: node.powered,
        })),
    };
    customElements.push(elementData);
    localStorage.setItem("customNodeElements", JSON.stringify(customElements));
}
function createTruthTableFunction(truthTable) {
    return (inputArray) => {
        const match = truthTable.find((entry) => entry.inputs.every((val, index) => val === inputArray[index]));
        return match ? match.outputs : null; // Return outputs or null if no match
    };
}
function saveV2(name) {
    const inputs = board.elements.filter((e) => e instanceof Switch);
    const outputs = board.elements.filter((e) => e instanceof LED);
    if (inputs.length === 0 || outputs.length === 0) {
        console.error("No inputs or outputs found.");
        return;
    }
    const numInputs = inputs.length;
    let truthTable = [];
    function testConfiguration(i, callback) {
        // Set inputs
        for (let j = 0; j < numInputs; j++) {
            inputs[j].powered = (i & (1 << j)) !== 0;
        }
        // Force update
        board.update && board.update();
        // Wait for the circuit to settle before reading outputs
        setTimeout(() => {
            let outputState = outputs.map((output) => output.nodes[0].powered ? 1 : 0);
            truthTable.push({
                inputs: inputs.map((i) => (i.powered ? 1 : 0)),
                outputs: outputState,
            });
            callback();
        }, 100); // Delay of 100ms to ensure stable output
    }
    let r = new Promise((resolve) => {
        function runTests(i = 0) {
            if (i < 1 << numInputs) {
                testConfiguration(i, () => runTests(i + 1));
            }
            else {
                console.table(truthTable);
                resolve(truthTable); // Return the truth table
            }
        }
        runTests();
    });
    //! Override localStorage item
    r.then((newTruthTable) => {
        const existingTables = JSON.parse(localStorage.getItem("savedTruthTables") || "[]");
        const updatedTables = existingTables.concat({
            name: name,
            truthTable: newTruthTable,
            // logic: createTruthTableFunction(newTruthTable),
        });
        localStorage.setItem("savedTruthTables", JSON.stringify(updatedTables));
        console.log(`Truth table appended to ${name}`);
    }).then(() => {
        // clear the board
        board.elements = [];
        board.wires = [];
        boardSelector.reloadBoards();
        console.log("Board cleared.");
    });
}
