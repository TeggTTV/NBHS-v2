class NodeElement {
    x: number;
    y: number;
    w: number;
    h: number;
    name: string;
    focused: boolean = false;
    dragging: boolean = false;
    setRel: boolean = false;
    relativeX: number = 0;
    relativeY: number = 0;
    draggable: boolean = true;
    mouseDownAndNotOver: boolean = false;
    parent: Board;

    nodes: LogicNode[] = [];

    private static readonly HIGHLIGHT_COLOR = "yellow";
    private static cachedGrid: { x: number; y: number }[] | null = null;

    truthTable: TruthTable[] | null = null;
    private custom: boolean = false;

    constructor(
        parent: Board,
        name: string,
        x: number,
        y: number,
        w: number,
        h: number,
        truthTable?: TruthTable[] | null
    ) {
        this.parent = parent;
        this.name = name;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.truthTable = truthTable || null;
        if (this.truthTable) {
            this.custom = true;

            this.nodes = [];
            // Create nodes based on the truth table
            const numInputs = this.truthTable[0].inputs.length;
            const numOutputs = this.truthTable[0].outputs.length;
            console.log(
                `Truth table inputs: ${numInputs}, outputs: ${numOutputs}`
            );

            // Create input nodes
            let inputs: LogicNode[] = [];
            for (let i = 0; i < numInputs; i++) {
                inputs.push(new LogicNode(this, 0, this.h / 2, 7, false));
            }
            // Create output nodes
            let outputs: LogicNode[] = [];
            for (let i = 0; i < numOutputs; i++) {
                outputs.push(new LogicNode(this, this.w, this.h / 2, 7, false));
            }

            // Add input and output nodes to the nodes array
            this.nodes = [...inputs, ...outputs];

            // Space out input nodes vertically
            for (let i = 0; i < numInputs; i++) {
                this.nodes[i].oY = (this.h / (numInputs + 1)) * (i + 1);
            }

            // Space out output nodes vertically
            for (let i = 0; i < numOutputs; i++) {
                this.nodes[numInputs + i].oY =
                    (this.h / (numOutputs + 1)) * (i + 1);
            }

            // Save custom element to localStorage
        } else {
            this.custom = false;
        }
    }

    getMouseOver(mouse: { x: number; y: number }): boolean {
        return (
            mouse.x > this.x &&
            mouse.x < this.x + this.w &&
            mouse.y > this.y &&
            mouse.y < this.y + this.h
        );
    }

    updateNodes(): void {
        // If the logic has inputs and outputs, apply the logic
        this.nodes.forEach((node) => {
            // node.x = this.x + node.oX;
            // node.y = this.y + node.oY;
            node.update(mouse, ctx);
        });

        if (!this.custom) return;
        if (!this.truthTable) return;

        if (this.truthTable) {
            // Update the truth table based on the current state of the nodes
            const inputs = this.nodes.map((node) => (node.powered ? 1 : 0));
            let truthTableFunction = createTruthTableFunction(this.truthTable);

            const outputs = truthTableFunction(inputs);
            // Update the nodes based on the outputs
            if (!outputs) return;
            for (let i = 0; i < outputs.length; i++) {
                this.nodes[this.nodes.length - outputs.length + i].powered =
                    outputs[i] === 1;
            }
        }

        // for (let i = 0; i < this.nodes.length; i++) {
        //     if (this.nodes[i].powered) {
        //         (this.truthTable.elements[i] as Switch).powered = true;
        //     } else {
        //         (this.truthTable.elements[i] as Switch).powered = false;
        //     }
        // }

        // let leds: LED[] = [];
        // this.truthTable.elements.forEach((e) => {
        //     if (e instanceof LED) {
        //         leds.push(e);
        //     }
        // });

        // for (let i = 0; i < leds.length; i++) {
        //     this.nodes[this.nodes.length - leds.length + i].powered =
        //         leds[i].nodes[0].powered;
        // }
        // for (let i = 0; i < this.truthTable.wires.length; i++) {
        //     const wire = this.truthTable.wires[i];
        //     // wire.draw(ctx);
        //     wire.update(true);
        // }

        // this.truthTable.elements.forEach((e) => {
        //     // e.draw(ctx);
        //     // e.update(mouse, this.miniBoard!.elements);
        //     e.updateNodes();
        // });
    }

    drag(x: number, y: number): void {
        this.x = x - this.relativeX;
        this.y = y - this.relativeY;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.font = "12px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.name, this.x + this.w / 2, this.y + this.h / 2);
        ctx.textAlign = "left";
        if (this.focused) {
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        }

        this.nodes.forEach((node) => {
            node.draw(ctx);
        });
    }

    remove(): void {
        let wires: Wire[] = [];
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
        if (index !== -1) this.parent.elements.splice(index, 1);
    }

    update(mouse: Mouse, nodeElements: NodeElement[]): void {
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
                mouse.dragging = true;
            }
        }

        if (!mouse.down) {
            nodeElements.forEach((ne) => {
                if (
                    this.dragging &&
                    this !== ne &&
                    this.x === ne.x &&
                    this.y === ne.y
                ) {
                    ne.x += 100;
                }
            });
            this.setRel = false;
            this.dragging = false;
            mouse.dragging = false;
            this.relativeX = 0;
            this.relativeY = 0;
            this.draggable = true;
            this.focused = false;
            this.mouseDownAndNotOver = false;
        }

        this.updateNodes();
    }

    static loadFromLocalStorage(parent: Board): NodeElement[] {
        const customElements = JSON.parse(
            localStorage.getItem("savedTruthTables") || "[]"
        );
        return customElements.map(
            (data: { name: string; truthTable: TruthTable[] }) => {
                const nodeElement = new NodeElement(
                    parent,
                    data.name,
                    0,
                    0,
                    100,
                    100,
                    data.truthTable
                );
                nodeElement.custom = true;
                return nodeElement;
            }
        );
    }
}
