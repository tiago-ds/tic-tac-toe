const width = 800;
const height = 800;
let moves;
let isX;
let winner;

function mouseClicked() {
	markNewQuadrant(new Point(mouseX, mouseY));
	winner = checkWinner(moves);
}

function setup() {
	moves = [];
	isX = true;
	winner = false;
	createCanvas(width, height);
	strokeWeight(5);
}

function draw() {
	background(220);
	drawBoard();

	for (const mark of moves) {
		mark.drawMove();
	}
	
	if (winner) {
		drawWinner(winner);
		noLoop();
	} 
}
