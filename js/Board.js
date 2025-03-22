"use strict";
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Switch"] = 0] = "Switch";
    NodeType[NodeType["And"] = 1] = "And";
    NodeType[NodeType["Not"] = 2] = "Not";
    NodeType[NodeType["XOr"] = 3] = "XOr";
    NodeType[NodeType["NewType"] = 4] = "NewType";
    NodeType[NodeType["LED"] = 5] = "LED";
})(NodeType || (NodeType = {}));
class Board {
    constructor(name, logic) {
        this.name = 'Unnamed Board';
        this.elements = [];
        this.wires = [];
        this.name = name;
        this.logic = logic; // Initialize logic property
        if (logic != null) {
            this.type = logic.type;
        }
        else {
            this.type = NodeType.NewType;
        }
    }
    addNode(type) {
        switch (type) {
            case NodeType.Switch:
                this.elements.push(new Switch(this, width / 2, height / 2, 100, 100, SwitchBoardLogic, false));
                break;
            case NodeType.And:
                this.elements.push(new And(this, width / 2, height / 2, 100, 100, AndBoardLogic));
                break;
            case NodeType.Not:
                this.elements.push(new Not(this, width / 2, height / 2, 100, 100, NotBoardLogic));
                break;
            case NodeType.XOr:
                this.elements.push(new XOr(this, width / 2, height / 2, 100, 100, XOrBoardLogic));
                break;
            case NodeType.LED:
                this.elements.push(new LED(this, width / 2, height / 2, 100, 100, LEDLogic));
                break;
            default:
                // Handle custom boards or unknown types
                const customBoard = boardSelector.boards.find((b) => b.type === type);
                if (customBoard) {
                    const customNode = new NodeElement(this, width / 2, height / 2, 100, 100, customBoard.logic);
                    // Add input and output nodes to the custom node
                    for (let i = 0; i < customBoard.logic.inputs; i++) {
                        customNode.nodes.push(new LogicNode(customNode, 0, (i + 1) * 20, 7, false));
                    }
                    for (let i = 0; i < customBoard.logic.outputs; i++) {
                        customNode.nodes.push(new LogicNode(customNode, customNode.w, (i + 1) * 20, 7, false));
                    }
                    this.elements.push(customNode);
                }
                else {
                    console.warn(`Unknown node type: ${type}`);
                }
                break;
        }
        console.log(`Node of type ${type} added to the board.`);
    }
    createWire(startNode, endNode) {
        let wireExists = false;
        this.wires.forEach((w) => {
            if ((w.startNode == startNode && w.endNode == endNode) ||
                (w.startNode == endNode && w.endNode == startNode)) {
                wireExists = true;
                return;
            }
        });
        if (wireExists)
            return;
        startNode.hasWire = true;
        endNode.hasWire = true;
        let wire = new Wire(startNode, endNode);
        this.wires.push(wire);
    }
    update() {
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
