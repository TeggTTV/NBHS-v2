"use strict";
class NOr extends NodeElement {
    constructor(parent, name, x, y, w, h) {
        super(parent, name, x, y, w, h);
        this.focused = false;
        this.dragging = false;
        this.setRel = false;
        this.relativeX = 0;
        this.relativeY = 0;
        this.draggable = true;
        this.mouseDownAndNotOver = false;
        this.nodes = [];
        this.nodes = [
            new LogicNode(this, 0, this.h / 2 - this.h / 4, 7, false),
            new LogicNode(this, 0, this.h / 2 + this.h / 4, 7, false),
            new LogicNode(this, this.w, this.h / 2, 7, false),
        ];
    }
    updateNodes() {
        this.nodes.forEach((node) => {
            node.update(mouse, ctx);
        });
        // NOR logic: output is true if NOT (either input is true)
        this.nodes[2].powered = !(this.nodes[0].powered || this.nodes[1].powered);
    }
}
