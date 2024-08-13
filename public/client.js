document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
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
        console.log(data);
    })
});