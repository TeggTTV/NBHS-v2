class And extends NodeElement {
	focused: boolean = false;
	dragging: boolean = false;
	setRel: boolean = false;
	relativeX: number = 0;
	relativeY: number = 0;
	draggable: boolean = true;
	mouseDownAndNotOver: boolean = false;
	nodes: LogicNode[] = [];
	constructor(x: number, y: number, w: number, h: number) {
		super(x, y, w, h, "And");
        
	}
}
