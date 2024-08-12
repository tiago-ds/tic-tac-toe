const width = 800;
const height = 800;
let moves;
let isX;

function mouseClicked() {
	markNewQuadrant(new Point(mouseX, mouseY));
}

function setup() {
	moves = [];
	isX = true;
	createCanvas(width, height);
	strokeWeight(5);
}

function markNewQuadrant(point) {
	let newQuadrant = findNewQuadrant(point);

	if (
		moves.find(
		(move) => move.row == newQuadrant[0] && move.column == newQuadrant[1]
		)
	) {
		return;
	}

	moves.push(new Mark(newQuadrant[0], newQuadrant[1], isX));
	isX = !isX;
}

function draw() {
	background(220);
	drawBoard();

	if (moves.length > 0) {
		for (const mark of moves) {
			mark.drawMove();
		}
	}
}
