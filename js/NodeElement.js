"use strict";
class NodeElement {
    constructor(parent, x, y, w, h, logic) {
        this.focused = false;
        this.dragging = false;
        this.setRel = false;
        this.relativeX = 0;
        this.relativeY = 0;
        this.draggable = true;
        this.mouseDownAndNotOver = false;
        this.nodes = [];
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.logic = logic;
    }
    getMouseOver(mouse) {
        return (mouse.x > this.x &&
            mouse.x < this.x + this.w &&
            mouse.y > this.y &&
            mouse.y < this.y + this.h);
    }
    updateNodes() {
        // If the logic has inputs and outputs, apply the logic
        if (this.logic.inputs > 0 && this.logic.outputs > 0) {
            const inputStates = this.nodes
                .slice(0, this.logic.inputs)
                .map((node) => node.powered);
            // Apply the logic function
            const outputStates = this.logic.logic(inputStates);
            // Update the output nodes based on the logic result
            this.nodes
                .slice(this.logic.inputs, this.logic.inputs + this.logic.outputs)
                .forEach((node, index) => {
                node.powered = Array.isArray(outputStates)
                    ? outputStates[index]
                    : outputStates;
            });
        }
    }
    drawNodes(ctx) {
        this.nodes.forEach((node) => {
            node.draw(ctx);
        });
    }
    drag(x, y) {
        this.x = x - this.relativeX;
        this.y = y - this.relativeY;
    }
    draw(ctx) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.font = "12px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.logic.name, this.x + this.w / 2, this.y + this.h / 2);
        ctx.textAlign = "left";
        if (this.focused) {
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
    }
    remove() {
        let wires = [];
        this.parent.wires.forEach((wire) => {
            for (let node of this.nodes) {
                if (wire.startNode == node || wire.endNode == node) {
                    wires.push(wire);
                }
            }
        });
        wires.forEach((wire) => {
            wire.startNode.hasWire = false;
            wire.endNode.hasWire = false;
            this.parent.wires = this.parent.wires.filter((w) => w !== wire);
        });
        this.nodes.forEach((node) => {
            // Remove any wires connected to this node
            const nodeIndex = this.nodes.indexOf(node);
            if (nodeIndex !== -1) {
                this.nodes.splice(nodeIndex, 1);
            }
        });
        const index = this.parent.elements.indexOf(this);
        if (index !== -1)
            this.parent.elements.splice(index, 1);
    }
    update(mouse, nodeElements) {
        if (mouse.down && !this.getMouseOver(mouse) && !this.dragging) {
            this.draggable = false;
        }
        if (mouse.left && this.getMouseOver(mouse)) {
            this.remove();
        }
        if (this.dragging && this.draggable && mouse.down && this.focused) {
            this.drag(mouse.x, mouse.y);
            // ctx.beginPath();
            // ctx.strokeStyle = NodeElement.HIGHLIGHT_COLOR;
            // ctx.lineWidth = 3;
            // ctx.stroke();
            // ctx.closePath();
        }
        if (this.getMouseOver(mouse) && mouse.down && this.draggable) {
            if (!this.setRel) {
                this.relativeX = mouse.x - this.x;
                this.relativeY = mouse.y - this.y;
            }
            nodeElements.forEach((node) => {
                if (node !== this) {
                    node.focused = false;
                }
            });
            this.focused = true;
            this.setRel = true;
            if (this.focused && this.draggable) {
                this.drag(mouse.x, mouse.y);
                this.dragging = true;
            }
        }
        if (!mouse.down) {
            nodeElements.forEach((ne) => {
                if (this.dragging &&
                    this !== ne &&
                    this.x === ne.x &&
                    this.y === ne.y) {
                    ne.x += 100;
                }
            });
            this.setRel = false;
            this.dragging = false;
            this.relativeX = 0;
            this.relativeY = 0;
            this.draggable = true;
            this.focused = false;
            this.mouseDownAndNotOver = false;
        }
        this.updateNodes();
    }
}
NodeElement.HIGHLIGHT_COLOR = "yellow";
NodeElement.cachedGrid = null;
