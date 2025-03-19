"use strict";
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Switch"] = 0] = "Switch";
    NodeType[NodeType["And"] = 1] = "And";
    NodeType[NodeType["Not"] = 2] = "Not";
    NodeType[NodeType["NewType"] = 3] = "NewType";
})(NodeType || (NodeType = {}));
class Board {
    constructor(logic) {
        this.name = 'Unnamed Board';
        this.elements = [];
        this.wires = [];
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
                this.elements.push(new Switch(this, width / 2, height / 2, 100, 100, 'Switch', false));
                break;
            case NodeType.And:
                this.elements.push(new And(this, width / 2, height / 2, 100, 100));
                break;
            case NodeType.Not:
                this.elements.push(new Not(this, width / 2, height / 2, 100, 100));
                break;
            default:
                break;
        }
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
