const utils = require('./utils');

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let game = {};

function clearGame() {
	const x = game.x;
	const o = game.o;

	game = {
		x,
		o,
		winner: false,
		moves: []
	};

	io.emit("game", game);
}

function startNewGame() {
	console.log("Game starting...");
	console.log(`X is ${game.x}`);
	console.log(`O is ${game.o}`);
	
	game.started = true;	
	game.isX = true;
	game.moves = [];
	game.winner = false;
	game.finished = false;
	io.emit("game", game);
}

app.use(express.static("public"));

io.on("connection", (socket) => {
	console.log(`${socket.id} connected`);
	
	if(!game.started) {
		if(!game.x) {
			game['x'] = socket.id;
		} else if(!game.o) {
			game['o'] = socket.id;
		}
	}

	if(game.x && game.o && !game.started) {
		startNewGame();
	}


	socket.on("newGameButtonClicked", () => {
		startNewGame();
	});

	socket.on("played", (data) => {
		//gets the move from the client
		//data should have the new move
		//if(!game.started) {
		//	return;
		//}

		console.log(data);

		game.moves.push(data);
		if(game.moves.length == 7) {
			game.moves.splice(0, 1);
		}
		game.isX = !game.isX;
		
		game.winner = utils.checkWinner(game.moves);
		//emits the new board to clients
		io.emit("game", game);
	});

	socket.on("disconnect", () => {
		console.log(`${socket.id} disconnected.`);
		
		utils.removeDisconnectedSocket(game, socket.id);

		clearGame();
	});
});

server.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});