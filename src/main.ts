let board: Board;
let boardSelector: BoardSelector;

function init() {
    board = new Board("Main Board", null);
    board.type = NodeType.Default;
    boardSelector = new BoardSelector(board);

    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;

    // // 4-bit adder example
    // const spacingY = 100; // Vertical spacing
    // const startX = 100; // Starting X position for switches
    // const startY = 100; // Starting Y position for switches
    // const outputX = width - 200; // X position for outputs

    // // Add switches for inputs (A0-A3, B0-B3)
    // for (let i = 0; i < 8; i++) {
    // 	board.addNode(NodeType.Switch);
    // 	board.elements[i].x = startX;
    // 	board.elements[i].y = startY + i * spacingY;
    // }

    // // Add AND gates for carry generation
    // for (let i = 0; i < 4; i++) {
    // 	board.addNode(NodeType.And);
    // 	board.elements[8 + i].x = startX + 300;
    // 	board.elements[8 + i].y = startY + i * spacingY * 2;
    // }

    // // Add XOR gates for sum generation
    // for (let i = 0; i < 4; i++) {
    // 	board.addNode(NodeType.XOr);
    // 	board.elements[12 + i].x = startX + 600;
    // 	board.elements[12 + i].y = startY + i * spacingY * 2;
    // }

    // // Add outputs for sums
    // for (let i = 0; i < 4; i++) {
    // 	board.addNode(NodeType.LED); // Using switches as placeholders for outputs
    // 	board.elements[16 + i].x = outputX;
    // 	board.elements[16 + i].y = startY + i * spacingY * 2;
    // }

    // // Create wires for the 4-bit adder
    // // Connect switches to AND gates
    // for (let i = 0; i < 4; i++) {
    // 	createWireBetweenNodes(i, 0, 8 + i, 0); // A[i] -> AND[i]
    // 	createWireBetweenNodes(4 + i, 0, 8 + i, 1); // B[i] -> AND[i]
    // }

    // // Connect AND gates to XOR gates
    // for (let i = 0; i < 4; i++) {
    // 	createWireBetweenNodes(8 + i, 2, 12 + i, 0); // AND[i] -> XOR[i]
    // }

    // // Connect XOR gates to outputs
    // for (let i = 0; i < 4; i++) {
    // 	createWireBetweenNodes(12 + i, 2, 16 + i, 0); // XOR[i] -> Output[i]
    // }

    // Example: Save the current board as a custom chip
    document.addEventListener("keydown", (e) => {
        if (e.key === "s") {
            const customBoardName = prompt(
                "Enter a name for the custom board:"
            );
            if (customBoardName) {
                saveV2(customBoardName);
                console.log(`Custom board "${customBoardName}" saved.`);
            }
        }
    });

	boardSelector.reloadBoards();

    requestAnimationFrame(update);
}

function update() {
    requestAnimationFrame(update);
    ctx.fillStyle = "#17171e";
    ctx.fillRect(0, 0, width, height);

    // Version #
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Version 0.0.1", 10, 20);

    // ele.draw(ctx);
    // ele.update(mouse, [], ctx, 50, canvas, []);
    board.update();
}
