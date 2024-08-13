const width = 600;
const height = 600;
let moves;
let isX;
let winner;
let finished;

const newGameButton = document.getElementById("newGameButton");
newGameButton.onclick = restartGame;

const winnerAnnouncement = document.getElementById("winner-announcement");
const winnerText = document.getElementById("winner");

function mouseClicked() {
	if(mouseX > width || mouseY > height || mouseX < 0 || mouseY < 0) {
		return;
	}
	markNewQuadrant(new Point(mouseX, mouseY));
	winner = checkWinner(moves);
}

function setup() {
	moves = [];
	isX = true;
	winner = false;
	finished = false;
	createCanvas(width, height);
}

function draw() {
	background('#DCDCDC');
	drawBoard();

	moves.forEach(function (mark, i) {
		strokeWeight(5);
		if(moves.length == 6 && i == 0 && !winner) {
			strokeWeight(1);
		}
		mark.drawMove();
	})

	if (winner) {
		finished = true;
		drawWinner(winner);
		toggleWinnerAnnoucement();
		noLoop();
	} 
}
