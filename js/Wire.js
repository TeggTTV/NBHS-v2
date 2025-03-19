"use strict";
class Wire {
    constructor(startNode, endNode) {
        this.color = "yellow";
        this.startNode = startNode;
        this.endNode = endNode;
    }
    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.startNode.x, this.startNode.y);
        ctx.lineTo(this.endNode.x, this.endNode.y);
        ctx.stroke();
    }
    update() {
        let start = this.startNode;
        let end = this.endNode;
        if (start.powered && start.x == start.parent.x + start.parent.w) {
            end.powered = true;
        }
        else if (!start.powered &&
            start.x == start.parent.x + start.parent.w) {
            end.powered = false;
        }
        if (end.powered && end.x == end.parent.x + end.parent.w) {
            start.powered = true;
        }
        else if (!end.powered && end.x == end.parent.x + end.parent.w) {
            start.powered = false;
        }
        let e = this.isMouseOnWire(mouse, this);
        if (e < 4) {
            this.color = 'red';
            if (mouse.left) {
                this.startNode.parent.parent.wires = this.startNode.parent.parent.wires.filter((w) => w != this);
                this.startNode.hasWire = false;
                this.endNode.hasWire = false;
            }
        }
    }
    isMouseOnWire(mouse, wire) {
        const dx = this.endNode.x - this.startNode.x;
        const dy = this.endNode.y - this.startNode.y;
        // Handle zero-length line segment
        if (dx === 0 && dy === 0)
            return Math.sqrt(Math.pow(mouse.x - this.startNode.x, 2) +
                Math.pow(mouse.y - this.startNode.y, 2));
        const t = ((mouse.x - this.startNode.x) * dx + (mouse.y - this.startNode.y) * dy) /
            (dx * dx + dy * dy);
        // Clamp t to [0, 1] interval
        const tClamped = Math.max(0, Math.min(1, t));
        const nearestX = this.startNode.x + tClamped * dx;
        const nearestY = this.startNode.y + tClamped * dy;
        return Math.sqrt(Math.pow(mouse.x - nearestX, 2) + Math.pow(mouse.y - nearestY, 2));
    }
    ;
}
