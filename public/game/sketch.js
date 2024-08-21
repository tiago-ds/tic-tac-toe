const width = 600;
const height = 600;

let game;

const newGameButton = document.getElementById("newGameButton");
newGameButton.onclick = restartGame;

const winnerAnnouncement = document.getElementById("winner-announcement");
const winnerText = document.getElementById("winner");

function mouseClicked() {
	if(mouseX > width || mouseY > height || mouseX < 0 || mouseY < 0) {
		return;
	}

	//console.log(game);

	if(game.x == socket.id && game.isX) {
		markNewQuadrant(new Point(mouseX, mouseY));
		return;
	}

	if(game.o == socket.id && !game.isX) {
		markNewQuadrant(new Point(mouseX, mouseY));
		return;
	}
}

function setup() {
	createCanvas(width, height);
}

function draw() {
	background('#DCDCDC');
	drawBoard();

	if(!game) {
		return;
	}

	game.moves.forEach(function (mark, i) {
		strokeWeight(5);
		if(game.moves.length == 6 && i == 0 && !game.winner) {
			strokeWeight(1);
		}
		drawMove(mark.row, mark.column, mark.isX);
	})

	if (game.winner) {
		finished = true;
		drawWinner(game.winner);
		toggleWinnerAnnoucement();
		noLoop();
	} 
}
