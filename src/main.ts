let board: Board;
let boardSelector: BoardSelector;

function init() {
	board = new Board(null);
	boardSelector = new BoardSelector(board);
	// ele = new Switch(100, 200, 100, 100, 'Swtich', true);
	canvas.width = width = window.innerWidth;
	canvas.height = height = window.innerHeight;

	boardSelector.updateBoards();

	requestAnimationFrame(update);
}

function update() {
	requestAnimationFrame(update);
	ctx.fillStyle = '#17171e';
	ctx.fillRect(0, 0, width, height);

	// Version #
	ctx.fillStyle = 'white';
	ctx.font = '20px Arial';
	ctx.fillText('Version 0.0.1', 10, 20);

	
	// ele.draw(ctx);
	// ele.update(mouse, [], ctx, 50, canvas, []);
	board.update();

}
