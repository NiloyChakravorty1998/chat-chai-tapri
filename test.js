const io = require('socket.io-client');

const socket = io('http://localhost:3002');

socket.on('connect', () => {
    console.log('Connected to the server');

    // Simulate sending a message to the server
    socket.emit('chat message', 'Hello, server!');

    // Listen for messages from the server
    socket.on('chat message', (msg) => {
        console.log('Message from server:', msg);
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});
