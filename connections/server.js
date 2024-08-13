const express = require("express");
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const game = { turn: "x" };

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('buttonClicked', (data) => {
    console.log(data)
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});


server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

const frameRate = 30;
setInterval(() => {
  io.emit("game", game);
}, 1000 / frameRate);