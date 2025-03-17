"use strict";
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Switch"] = 0] = "Switch";
    NodeType[NodeType["And"] = 1] = "And";
    NodeType[NodeType["Or"] = 2] = "Or";
    NodeType[NodeType["NewType"] = 3] = "NewType";
})(NodeType || (NodeType = {}));
class Board {
    constructor(logic) {
        this.name = 'Unnamed Board';
        this.elements = [];
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
                this.elements.push(new Switch(width / 2, height / 2, 100, 100, 'Switch', false));
        }
    }
    update() { }
}
