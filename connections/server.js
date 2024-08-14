const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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

const game = {
	started: false,
	turn: undefined,
};

app.use(express.static("public"));

io.on("connection", (socket) => {
	console.log(`${socket.id} connected`);

	socket.on("buttonClicked", (data) => {
		// debug
		console.log(game);
	});

	socket.on("movePlayed", (data) => {
		//gets the move from the client
		//data should have the new move

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