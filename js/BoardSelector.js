"use strict";
const SwitchBoardLogic = {
    inputs: 0,
    outputs: 1,
    type: NodeType.Switch,
    powered: false,
    logic: (node1, node2) => { },
    name: 'Switch',
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
    name: 'And',
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
    name: 'Not',
};
const XOrBoardLogic = {
    inputs: 2,
    outputs: 1,
    type: NodeType.XOr,
    logic: (node1, node2) => {
        return node1 !== node2;
    },
    name: 'XOr',
};
const LEDLogic = {
    inputs: 1,
    outputs: 0,
    type: NodeType.LED,
    logic: (node1) => node1,
    name: 'LED',
};
class BoardSelector {
    constructor(selectedBoard) {
        this.boards = [
            new Board('Switch', SwitchBoardLogic),
            new Board('And', AndBoardLogic),
            new Board('Not', NotBoardLogic),
            new Board('XOr', XOrBoardLogic),
            new Board('LED', LEDLogic),
        ];
        this.selectedBoard = selectedBoard;
    }
    updateBoards() {
        selector.innerHTML = '';
        for (let board of this.boards) {
            let name = board.name || NodeType[board.type];
            let btn = document.createElement('div');
            btn.innerText = name;
            btn.classList.add('addBoardBtn');
            btn.onclick = () => {
                // Add the custom board logic as a new node
                this.selectedBoard.addNode(board.type);
                console.log(`Added node of type: ${board.type}`);
            };
            selector.appendChild(btn);
        }
    }
}
