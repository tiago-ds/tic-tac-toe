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

function checkWinner(moves) {
    // Initialize the board
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Fill the board based on the moves
    moves.forEach(({ row, column, isX }) => {
        board[row][column] = isX ? 'X' : 'O';
    });

    // Helper function to check if all elements in an array are the same
    const allSame = arr => arr[0] !== '' && arr.every(val => val === arr[0]);

    // Check rows for a winner
    for (let row = 0; row < 3; row++) {
        if (allSame(board[row])) {
            return [board[row][0],'column',row];
        }
    }

    // Check columns for a winner
    for (let col = 0; col < 3; col++) {
        const column = [board[0][col], board[1][col], board[2][col]];
        if (allSame(column)) {
            return [column[0],'row',col];
        }
    }

    // Check diagonals for a winner
    const diag1 = [board[0][0], board[1][1], board[2][2]];
    const diag2 = [board[0][2], board[1][1], board[2][0]];

    if (allSame(diag1)) {
        return [diag1[0],'diag', 1];
    }

    if (allSame(diag2)) {
        return [diag2[0],'diag', 2];
    }

    // No winner found
    return false;
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

    if(moves.length == 6) {
        moves.splice(0, 1);
    }

	moves.push(new Mark(newQuadrant[0], newQuadrant[1], isX));
	isX = !isX;
}

function restartGame() {
    moves = [];
    isX = true;
    winner = false;
    loop();
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
    line(25, 25, width - 25, height -25);  
}

function drawDiag2() {
    line(width - 25, 25, 25, height - 25);
}

function drawRow(rowNumber) {
    push();
        translate(0, (rowNumber/3)*height + 1/6*height);
        line(25, 0, width - 25, 0);
    pop();
}

function drawColumn(columnNumber) {
    push();
        translate((columnNumber/3)*width, 0);
        line(width/6, 12.5, width/6, height - 12.5);
    pop();
}