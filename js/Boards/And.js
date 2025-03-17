"use strict";
class And extends NodeElement {
    constructor(x, y, w, h) {
        super(x, y, w, h, "And");
        this.focused = false;
        this.dragging = false;
        this.setRel = false;
        this.relativeX = 0;
        this.relativeY = 0;
        this.draggable = true;
        this.mouseDownAndNotOver = false;
        this.nodes = [];
    }
}
