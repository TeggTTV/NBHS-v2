const SwitchTruthTable: TruthTable[] = [
    { inputs: [], outputs: [0] },
    { inputs: [], outputs: [1] },
];
const AndTruthTable: TruthTable[] = [
    { inputs: [0, 0], outputs: [0] },
    { inputs: [0, 1], outputs: [0] },
    { inputs: [1, 0], outputs: [0] },
    { inputs: [1, 1], outputs: [1] },
];
const OrTruthTable: TruthTable[] = [
    { inputs: [0, 0], outputs: [0] },
    { inputs: [0, 1], outputs: [1] },
    { inputs: [1, 0], outputs: [1] },
    { inputs: [1, 1], outputs: [1] },
];
const NotTruthTable: TruthTable[] = [
    { inputs: [0], outputs: [1] },
    { inputs: [1], outputs: [0] },
];
const NAndTruthTable: TruthTable[] = [
    { inputs: [0, 0], outputs: [1] },
    { inputs: [0, 1], outputs: [1] },
    { inputs: [1, 0], outputs: [1] },
    { inputs: [1, 1], outputs: [0] },
];
const NOrTruthTable: TruthTable[] = [
    { inputs: [0, 0], outputs: [1] },
    { inputs: [0, 1], outputs: [0] },
    { inputs: [1, 0], outputs: [0] },
    { inputs: [1, 1], outputs: [0] },
];
const XOrTruthTable: TruthTable[] = [
    { inputs: [0, 0], outputs: [0] },
    { inputs: [0, 1], outputs: [1] },
    { inputs: [1, 0], outputs: [1] },
    { inputs: [1, 1], outputs: [0] },
];
const XNOrTruthTable: TruthTable[] = [
    { inputs: [0, 0], outputs: [1] },
    { inputs: [0, 1], outputs: [0] },
    { inputs: [1, 0], outputs: [0] },
    { inputs: [1, 1], outputs: [1] },
];
const LEDTruthTable: TruthTable[] = [
    { inputs: [0], outputs: [0] },
    { inputs: [1], outputs: [1] },
];
class BoardSelector {
    public boards: Board[] = [];
    public defaultBoards: Board[] = [
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
    private selectedBoard: Board;
    constructor(selectedBoard: Board) {
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
    addBoard(board: Board) {
        this.boards.push(board);
        this.updateBoards();
    }
    removeBoard(board: Board) {
        this.boards = this.boards.filter((b) => b !== board);
        this.updateBoards();
    }
}
