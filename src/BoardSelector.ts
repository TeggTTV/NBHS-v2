const SwitchBoardLogic: Logic = {
	inputs: 0,
	outputs: 1,
    type: NodeType.Switch,
    powered: false,
	logic: (node1: boolean, node2: boolean) => {
        
	},
};
const AndBoardLogic: Logic = {
	inputs: 2,
	outputs: 1,
    type: NodeType.And,
	logic: (node1: boolean, node2: boolean) => {
		if (node1 && node2) {
			return true;
		} else return false;
	},
};
const OrBoardLogic: Logic = {
	inputs: 2,
	outputs: 1,
    type: NodeType.Or,
	logic: (node1: boolean, node2: boolean) => {
		if (node1 || node2) {
			return true;
		} else return false;
	},
};
class BoardSelector {
	public boards: Board[] = [
        new Board(SwitchBoardLogic),
		new Board(AndBoardLogic),
		new Board(OrBoardLogic),
	];
    private selectedBoard: Board;
	constructor(selectedBoard: Board) {
        this.selectedBoard = selectedBoard;
    }
    updateBoards() {
        selector.innerHTML = "";
        for(let board of this.boards) {
            let name = NodeType[board.type]
            let btn = document.createElement("div");
            btn.innerText = name;
            btn.classList.add("addBoardBtn")
            btn.onclick = () => {
                this.selectedBoard.addNode(board.type);
                console.log(board.type);
                
            }
            selector.appendChild(btn);
        }
        
    }
    
}
