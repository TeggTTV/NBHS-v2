class LED extends NodeElement {
    nodes: LogicNode[];

    constructor(parent: Board, name: string, x: number, y: number, w: number, h: number) {
        super(parent, name, x, y, w, h);
        this.nodes = [new LogicNode(this, 0, this.h / 2, 7, false)];
    }

    draw() {
        ctx.fillStyle = this.nodes[0].powered ? "white" : "black";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.font = "12px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // ctx.fillText(this.logic.name, this.x + this.w / 2, this.y + this.h / 2);
        ctx.textAlign = "left";
        if (this.focused) {
            ctx.strokeStyle = this.nodes[0].powered ? "white" : "black";
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }

		this.nodes.forEach((node) => {
			node.draw(ctx);
		});
    }

    updateNodes(): void {
        this.nodes.forEach((n) => {
            n.update(mouse, ctx);
        });
        // Update the LED's powered state based on its input node
        if (this.nodes[0].hasWire) {
            this.nodes[0].powered = this.nodes[0].powered;
        } else {
            this.nodes[0].powered = false;
        }
    }
}
