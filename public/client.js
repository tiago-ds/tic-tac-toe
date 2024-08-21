
const socket = io();
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newGameButton').addEventListener('click', () => {
        socket.emit('newGameButtonClicked');
    });

    socket.on('connect', () => {
        console.log('Connected to the server');
        console.log(`I'm ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from the server');
    });

    socket.on("game", (eGame) => {
        if(!eGame) {
            return;
        }
        game = eGame;
    });

});