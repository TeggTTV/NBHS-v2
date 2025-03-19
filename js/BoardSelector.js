"use strict";
const SwitchBoardLogic = {
    inputs: 0,
    outputs: 1,
    type: NodeType.Switch,
    powered: false,
    logic: (node1, node2) => {
    },
};
const AndBoardLogic = {
    inputs: 2,
    outputs: 1,
    type: NodeType.And,
    logic: (node1, node2) => {
        if (node1 && node2) {
            return true;
        }
        else
            return false;
    },
};
const NotBoardLogic = {
    inputs: 1,
    outputs: 1,
    type: NodeType.Not,
    logic: (node1) => {
        if (node1) {
            return false;
        }
        else
            return true;
    },
};
class BoardSelector {
    constructor(selectedBoard) {
        this.boards = [
            new Board(SwitchBoardLogic),
            new Board(AndBoardLogic),
            new Board(NotBoardLogic),
        ];
        this.selectedBoard = selectedBoard;
    }
    updateBoards() {
        selector.innerHTML = "";
        for (let board of this.boards) {
            let name = NodeType[board.type];
            let btn = document.createElement("div");
            btn.innerText = name;
            btn.classList.add("addBoardBtn");
            btn.onclick = () => {
                this.selectedBoard.addNode(board.type);
                console.log(board.type);
            };
            selector.appendChild(btn);
        }
    }
}
