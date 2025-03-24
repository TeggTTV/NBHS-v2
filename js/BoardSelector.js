"use strict";
const SwitchTruthTable = [
    { inputs: [], outputs: [0] },
    { inputs: [], outputs: [1] },
];
const AndTruthTable = [
    { inputs: [0, 0], outputs: [0] },
    { inputs: [0, 1], outputs: [0] },
    { inputs: [1, 0], outputs: [0] },
    { inputs: [1, 1], outputs: [1] },
];
const OrTruthTable = [
    { inputs: [0, 0], outputs: [0] },
    { inputs: [0, 1], outputs: [1] },
    { inputs: [1, 0], outputs: [1] },
    { inputs: [1, 1], outputs: [1] },
];
const NotTruthTable = [
    { inputs: [0], outputs: [1] },
    { inputs: [1], outputs: [0] },
];
const NAndTruthTable = [
    { inputs: [0, 0], outputs: [1] },
    { inputs: [0, 1], outputs: [1] },
    { inputs: [1, 0], outputs: [1] },
    { inputs: [1, 1], outputs: [0] },
];
const NOrTruthTable = [
    { inputs: [0, 0], outputs: [1] },
    { inputs: [0, 1], outputs: [0] },
    { inputs: [1, 0], outputs: [0] },
    { inputs: [1, 1], outputs: [0] },
];
const XOrTruthTable = [
    { inputs: [0, 0], outputs: [0] },
    { inputs: [0, 1], outputs: [1] },
    { inputs: [1, 0], outputs: [1] },
    { inputs: [1, 1], outputs: [0] },
];
const XNOrTruthTable = [
    { inputs: [0, 0], outputs: [1] },
    { inputs: [0, 1], outputs: [0] },
    { inputs: [1, 0], outputs: [0] },
    { inputs: [1, 1], outputs: [1] },
];
const LEDTruthTable = [
    { inputs: [0], outputs: [0] },
    { inputs: [1], outputs: [1] },
];
class BoardSelector {
    constructor(selectedBoard) {
        this.boards = [];
        this.defaultBoards = [
            new Board("Switch", SwitchTruthTable),
            new Board("And", AndTruthTable),
            new Board("Or", OrTruthTable),
            new Board("Not", NotTruthTable),
            new Board("NAnd", NAndTruthTable),
            new Board("NOr", NOrTruthTable),
            new Board("XOr", XOrTruthTable),
            new Board("XNOr", XNOrTruthTable),
            new Board("LED", LEDTruthTable),
        ];
        this.selectedBoard = selectedBoard;
    }
    updateBoards() {
        selector.innerHTML = "";
        console.log(this.boards);
        for (let board of this.boards) {
            let name = board.name || NodeType[board.type];
            let btn = document.createElement("div");
            btn.innerText = name;
            btn.classList.add("addBoardBtn");
            btn.onclick = () => {
                // Add the custom board logic as a new node
                this.selectedBoard.addNode(board);
                // console.log(`Added node of type: ${board.type}`);
            };
            selector.appendChild(btn);
        }
    }
    reloadBoards() {
        this.boards = [];
        this.boards.push(...this.defaultBoards);
        const customElements = NodeElement.loadFromLocalStorage(board);
        console.log("Custom elements loaded:", customElements);
        customElements.forEach((element) => {
            let newBoard = new Board(element.name, element.truthTable);
            this.boards.push(newBoard);
        });
        this.updateBoards();
    }
    addBoard(board) {
        this.boards.push(board);
        this.updateBoards();
    }
    removeBoard(board) {
        this.boards = this.boards.filter((b) => b !== board);
        this.updateBoards();
    }
}
