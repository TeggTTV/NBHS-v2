"use strict";
class Switch extends NodeElement {
    constructor(parent, name, x, y, w, h, powered) {
        super(parent, name, x, y, w, h);
        this.nodes = [new LogicNode(this, this.w, this.h / 2, 7, false)];
        this.powered = powered;
        this.wireStart = { x: 0, y: 0 };
        this.wireEnd = { x: 0, y: 0 };
        this.startedDraggingWire = false;
        this.wireDraggable = false;
        this.selectedNode = null;
        this.createdWire = false;
        this.mouseDownAndNotOver = false;
    }
    updateNodes() {
        // let count = 0;
        // if (mouse) {
        // 	// Check if the mouse is pressed over the switch
        if (mouse.down &&
            !this.mouseDownAndNotOver &&
            mouseOver(this.x, this.y, this.w, this.h, mouse.x, mouse.y)) {
            this.powered = !this.powered; // Toggle the power state
            this.mouseDownAndNotOver = true; // Prevent further toggling until mouse is released
        }
        this.nodes.forEach((node) => {
            node.update(mouse, ctx);
        });
    }
}
