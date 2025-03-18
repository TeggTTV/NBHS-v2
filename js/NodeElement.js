"use strict";
class NodeElement {
    constructor(parent, x, y, w, h, name) {
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
        this.name = name;
    }
    getMouseOver(mouse) {
        return (mouse.x > this.x &&
            mouse.x < this.x + this.w &&
            mouse.y > this.y &&
            mouse.y < this.y + this.h);
    }
    updateNodes() { }
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
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.font = '12px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.name, this.x + this.w / 2, this.y + this.h / 2);
        ctx.textAlign = "left";
        if (this.focused) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
    }
    remove(nodeElements) {
        this.nodes.forEach((node) => {
            const nodeIndex = this.nodes.indexOf(node);
            if (nodeIndex !== -1) {
                this.nodes.splice(nodeIndex, 1);
            }
        });
        const index = nodeElements.indexOf(this);
        if (index !== -1)
            nodeElements.splice(index, 1);
    }
    update(mouse, nodeList, ctx, gridSize, canvas, nodeElements) {
        if (mouse.down && !this.getMouseOver(mouse) && !this.dragging) {
            this.draggable = false;
        }
        if (mouse.left && this.getMouseOver(mouse)) {
            this.remove(this.parent.elements);
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
            nodeList.forEach((node) => {
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
NodeElement.HIGHLIGHT_COLOR = 'yellow';
NodeElement.cachedGrid = null;
