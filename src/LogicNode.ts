class LogicNode {
    parent: NodeElement;
    oX: number;
    oY: number;
    x: number;
    y: number;
    r: number;
    powered: boolean;
    mouseDown: boolean;
    // dragging: boolean;
    focused: boolean;
    hasWire: boolean;
    // connectedWire: any | null;
    constructor(
        parent: any,
        x: number,
        y: number,
        r: number,
        powered: boolean
    ) {
        this.parent = parent;
        this.oX = x;
        this.oY = y;
        this.x = parent.x + x;
        this.y = parent.y + y;
        this.r = r;
        this.powered = powered;
        this.mouseDown = false;
        // this.dragging = false;
        this.focused = false;

        this.hasWire = false;
        // this.connectedWire = null;

        if (this.parent.nodes)
            if (this.parent.nodes.length === 0) {
                this.parent.nodes.push(this);
            } else {
                this.parent.nodes.forEach((node: LogicNode) => {
                    if (node === this) {
                        if (node.parent.nodes.length === 1) {
                            return;
                        }
                    } else {
                        node.parent.nodes.push(this);
                    }
                });
            }
    }

    update(mouse: Mouse, ctx: CanvasRenderingContext2D) {
        if (this.parent instanceof Switch) {
            if (this.parent.powered) {
                this.powered = true;
            } else {
                this.powered = false;
            }
        }
        if (!this.hasWire && this.x == this.parent.x) {
            this.powered = false;
        }
        if (this.parent.parent.type === 1) return;
        this.x = this.parent.x + this.oX;
        this.y = this.parent.y + this.oY;
        if (
            mouseOver(
                this.x - this.r,
                this.y - this.r,
                this.r * 2,
                this.r * 2,
                mouse.x,
                mouse.y
            )
        ) {
            if (mouse.down && !mouse.dragging) {
                if (mouse.creatingWire && mouse.creatingWireNode != this) {
                    for (let n of this.parent.nodes) {
                        if (mouse.creatingWireNode == n) {
                            return;
                        }
                    }
                    // create a wire
                    if (mouse.creatingWireNode) {
                        this.parent.parent.createWire(mouse.creatingWireNode, this);
                    }

                    mouse.creatingWire = false;
                    mouse.creatingWireNode = null;
                    mouse.down = false;
                } else if (
                    mouse.creatingWire &&
                    mouse.creatingWireNode == this
                ) {
                    mouse.creatingWire = false;
                    mouse.creatingWireNode = null;
                    mouse.down = false;
                } else {
                    mouse.down = false;
                    mouse.creatingWire = true;
                    mouse.creatingWireNode = this;
                }
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.parent) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.strokeStyle = this.getFillColor();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = this.getFillColor();
            ctx.fill();
        }
    }

    // private getFillColor(): string {
    // 	if (this.powered) return 'green';
    // 	if (
    // 		this.parent instanceof Not &&
    // 		this.parent.nodes[1] === this &&
    // 		!this.parent.nodes[0].powered
    // 	)
    // 		return 'green';
    // 	if (
    // 		this.parent instanceof NAnd &&
    // 		this.parent.nodes[2] === this &&
    // 		!this.parent.nodes[0].powered &&
    // 		!this.parent.nodes[1].powered
    // 	)
    // 		return 'green';
    // 	if (
    // 		this.parent instanceof NOr &&
    // 		this.parent.nodes[2] === this &&
    // 		!this.parent.nodes[0].powered &&
    // 		!this.parent.nodes[1].powered
    // 	)
    // 		return 'green';
    // 	if (
    // 		this.parent instanceof XNOr &&
    // 		this.parent.nodes[2] === this &&
    // 		((!this.parent.nodes[0].powered && !this.parent.nodes[1].powered) ||
    // 			(this.parent.nodes[0].powered && this.parent.nodes[1].powered))
    // 	)
    // 		return 'green';
    // 	return 'red';
    // }
    private getFillColor(): string {
        if (mouse.creatingWire && mouse.creatingWireNode == this) {
            return "yellow";
        }
        if (this.powered) return "green";
        if (this.parent instanceof Switch) {
            if (this.parent.powered) {
                return "green";
            }
        }
        return "red";
    }

    mouseOver(x: number, y: number): boolean {
        return (
            x > this.x - this.r &&
            x < this.x + this.r &&
            y > this.y - this.r &&
            y < this.y + this.r
        );
    }
}
