"use strict";
class Switch extends NodeElement {
    constructor(parent, x, y, w, h, logic, powered) {
        super(parent, x, y, w, h, logic);
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
        // 	this/nodes.forEach((node) => {
        // 		if (
        // 			!node.mouseOver(mouse.x, mouse.y) &&
        // 			mouse.down &&
        // 			!this.startedDraggingWire
        // 		) {
        // 			count++;
        // 			if (count === nodes.length) {
        // 				this.mouseDownAndNotOver = true;
        // 				return;
        // 			}
        // 		}
        // 	});
        // 	if (!mouse.down) {
        // 		this.mouseDownAndNotOver = false; // Reset the flag when the mouse is released
        // 	}
        // 	if (!mouse.down && this.startedDraggingWire) {
        // 		this.startedDraggingWire = false;
        // 		this.wireEnd = {
        // 			x: mouse.x,
        // 			y: mouse.y,
        // 		};
        // 		nodeElements.forEach((ne) => {
        // 			this.nodes.forEach((node) => {
        // 				if (
        // 					node.x === this.wireStart.x - node.r &&
        // 					node.y === this.wireStart.y
        // 				) {
        // 					this.selectedNode = node;
        // 				}
        // 			});
        // 			ne.nodes.forEach((node) => {
        // 				if (
        // 					node.x === this.wireStart.x - node.r &&
        // 					node.y === this.wireStart.y
        // 				) {
        // 					this.selectedNode = node;
        // 				}
        // 				this.nodes.forEach((parentNode) => {
        // 					if (
        // 						node !== this &&
        // 						node !== parentNode &&
        // 						node.mouseOver(this.wireEnd.x, this.wireEnd.y)
        // 					) {
        // 						let count = 0;
        // 						if (!this.createdWire) {
        // 							this.wireEnd.node = node;
        // 							this.createdWire = true;
        // 							let wire = new Wire(
        // 								this.wireStart.node!,
        // 								node,
        // 								'yellow'
        // 							);
        // 							node.hasWire = true;
        // 							node.connectedWire = wire;
        // 							if (wires.length <= 0) {
        // 								wires.push(wire);
        // 							} else {
        // 								wires.forEach((w) => {
        // 									count++;
        // 									if (
        // 										(wire.startParent ===
        // 											w.startParent &&
        // 											wire.endParent ===
        // 												w.endParent) ||
        // 										(wire.startParent ===
        // 											w.endParent &&
        // 											wire.endParent ===
        // 												w.startParent)
        // 									) {
        // 										wires.splice(
        // 											wires.indexOf(w),
        // 											1
        // 										);
        // 									}
        // 									if (count === wires.length) {
        // 										wires.push(wire);
        // 									}
        // 								});
        // 							}
        // 						}
        // 					}
        // 				});
        // 			});
        // 		});
        // 	}
        // }
        // if (this.startedDraggingWire && mouse && !this.mouseDownAndNotOver) {
        // 	this.wireEnd.x = mouse.x;
        // 	this.wireEnd.y = mouse.y;
        // 	// draw wire
        // 	ctx.beginPath();
        // 	ctx.lineWidth = 3;
        // 	ctx.strokeStyle = 'yellow';
        // 	ctx.moveTo(this.wireStart.x, this.wireStart.y);
        // 	ctx.lineTo(this.wireEnd.x, this.wireEnd.y);
        // 	ctx.stroke();
        // 	ctx.closePath();
        // }
        // if (mouse && !mouse.down) {
        // 	this.startedDraggingWire = false;
        // 	this.createdWire = false;
        // }
        // this.nodes.forEach((n) => {
        // 	if (mouse && !this.mouseDownAndNotOver) {
        // 		if (
        // 			mouseOver(
        // 				n.x - n.r,
        // 				n.y - n.r,
        // 				n.r * 2,
        // 				n.r * 2,
        // 				mouse.x,
        // 				mouse.y
        // 			) &&
        // 			mouse.down &&
        // 			!this.startedDraggingWire &&
        // 			!n.parent.dragging
        // 		) {
        // 			this.startedDraggingWire = true;
        // 			n.parent.draggable = false;
        // 			if (n.x === n.parent.x) {
        // 				this.wireStart = {
        // 					node: n,
        // 					x: n.x - n.r,
        // 					y: n.y,
        // 				};
        // 			} else {
        // 				this.wireStart = {
        // 					node: n,
        // 					x: n.x + n.r,
        // 					y: n.y,
        // 				};
        // 			}
        // 		}
        // 	}
        // });
        this.nodes.forEach((node) => {
            node.update(mouse, ctx);
            node.draw(ctx);
        });
    }
}
