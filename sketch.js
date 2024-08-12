const width = 800;
const height = 800;
let moves;
let isX;
let winner;

const newGameButton = document.getElementById("newGameButton");
newGameButton.onclick = restartGame;

function mouseClicked() {
	if(mouseX > width || mouseY > height) {
		return;
	}
	
	markNewQuadrant(new Point(mouseX, mouseY));
	winner = checkWinner(moves);
}

function setup() {
	moves = [];
	isX = true;
	winner = false;
	createCanvas(width, height);
}

function draw() {
	background(220);
	drawBoard();

	moves.forEach(function (mark, i) {
		strokeWeight(5);
		if(moves.length == 6 && i == 0 && !winner) {
			strokeWeight(1);
		}
		mark.drawMove();
	})

	if (winner) {
		drawWinner(winner);
		noLoop();
	} 
}
