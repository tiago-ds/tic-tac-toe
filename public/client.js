document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    // debug
    input = document.getElementById('input');
    document.getElementById('connectButton').addEventListener('click', () => {
        socket.emit('buttonClicked', { message: input.value});
    });

    socket.on('connect', () => {
        console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from the server');
    });

    socket.on("game", (data) => {
        // Get the "moves" property and draw it in the board
        console.log(data);
    })
});