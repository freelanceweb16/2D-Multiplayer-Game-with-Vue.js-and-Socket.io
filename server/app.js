const Express = require('express')();
const Http = require('http').Server(Express); 
const Socketio = require('socket.io')(Http,{
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
    }
});


let position = {
    x:200,
    y:200
};

Socketio.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('position', position);

    socket.on('move', data => {
        switch(data){
            case 'up':
                position.y -= 10;
                Socketio.emit('position', position);
                break;
            case 'down':
                position.y += 10;
                Socketio.emit('position', position);
                break;
            case 'left':
                position.x -= 10;
                Socketio.emit('position', position);
                break;
            case 'right':
                position.x += 10;
                Socketio.emit('position', position);
                break;
        }
    }
    );

});

Express.get('/', (req, res) => {
    res.send('App Backend with socket.io - V1.0');
});

Http.listen(3000, () => {
    console.log('listening on *:3000');

});