const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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

function resetGame() {
	game = {
		started: false,
		turn: undefined,
		moves: [],
	}
}

function startNewGame() {
	game = {	
		started: true,
		turn: "x",
		moves: [],
	}
}

let game = {
	started: false,
	turn: undefined,
};

app.use(express.static("public"));

io.on("connection", (socket) => {
	console.log(`${socket.id} connected`);

	socket.on("newGameButtonClicked", () => {
		startNewGame();
		io.emit(game);
	});

	socket.on("played", (data) => {
		//gets the move from the client
		//data should have the new move
		//if(!game.started) {
		//	return;
		//}
		if(game.moves == undefined) {
			game.moves = [];
		}
		
		game.moves.push(data);
		checkWinner(game.moves);
	

		//emits the new board to clients
		io.emit("game", game);
	});

	socket.on("disconnect", () => {
		console.log(`${socket.id} disconnected.`);
		
		if(game.started) {
			// Do this in a way that we don't lose any
			// connected players
			resetGame();
		}
		delete game[socket.id];
	});
});

server.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});