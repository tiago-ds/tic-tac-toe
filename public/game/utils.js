function drawBoard() {
	strokeWeight(5);
	line((1 / 3) * width, 10, (1 / 3) * width, height - 10);
	line((2 / 3) * width, 10, (2 / 3) * width, height - 10);
	line(10, (1 / 3) * height, width - 10, (1 / 3) * height);
	line(10, (2 / 3) * height, width - 10, (2 / 3) * height);
}

function findNewQuadrant(point) {
	let newQuadrant = [];
	if (point.x <= (1 / 3) * width) {
		newQuadrant.push(0);
	} else if (point.x > (2 / 3) * width) {
		newQuadrant.push(2);
	} else {
		newQuadrant.push(1);
	}

	if (point.y <= (1 / 3) * height) {
		newQuadrant.push(0);
	} else if (point.y > (2 / 3) * height) {
		newQuadrant.push(2);
	} else {
		newQuadrant.push(1);
	}

	return newQuadrant;
}

function markNewQuadrant(point) {
	let newQuadrant = findNewQuadrant(point);

	if (
		game.moves.find(
			(move) => move.row == newQuadrant[0] && move.column == newQuadrant[1]
		)
	) {
		return;
	}

	if(game.moves.length == 6) {
		game.moves.splice(0, 1);
	}

	socket.emit('played', new Mark(newQuadrant[0], newQuadrant[1], !!game.isX));
	game.isX = !game.isX;
}

function restartGame() {
	if(game.winner) {
		toggleWinnerAnnoucement();
	}
    
	loop();
}

function toggleWinnerAnnoucement() {
	if(winnerAnnouncement.classList.contains('hide')) {
		winnerText.innerText = `${winner[0]}`;
		winnerAnnouncement.classList.remove('hide');
		return;
	}

	winnerAnnouncement.classList.add('hide');
}

function drawWinner(input) {
	[winner, coords, number] = input;
	strokeWeight(10);
	if(coords === 'diag') {
		if(number == 1) {
			drawDiag1();
		} else {
			drawDiag2();
		}
	} else if (coords == 'row') {
		drawRow(number);
	} else {
		drawColumn(number);
	}
}

function drawDiag1() {
	line(12.5, 12.5, width - 12.5, height -12.5);  
}

function drawDiag2() {
	line(width - 12.5, 12.5, 12.5, height - 12.5);
}

function drawRow(rowNumber) {
	push();
	translate(0, (rowNumber/3)*height + 1/6*height);
	line(12.5, 0, width - 12.5, 0);
	pop();
}

function drawColumn(columnNumber) {
	push();
	translate((columnNumber/3)*width, 0);
	line(width/6, 12.5, width/6, height - 12.5);
	pop();
}