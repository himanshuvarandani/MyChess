var express = require("express");
var app = express();
var socket = require('socket.io');

app.set('view engine', 'html');

app.set('views', __dirname + '/views');
app.use(express.static("static"));

app.get('/', function(req, res) {
    res.send("Welcome to my chess");
});

app.get('/chess', function(req, res) {
    res.sendFile("/himanshu/Chess/views/chess.html");
});

var server = app.listen(3000, function() {
    console.log("Chess Server is started!!!");
});

var io = socket(server);
var clients = [];
var random = Math.round(Math.random());
var id = "";

io.on('connection', function(socket) {
    clients.push(socket.id);
    length = clients.length;
    
    if (length === 1) {
        if (random === 0) {
            id = clients[0];
        }
    } else if (length === 2) {
        if (random === 0) {
            id = clients[0];
        } else {
            id = clients[1];
        }
    }

    io.sockets.to(socket.id).emit('reset', {id: id});

    socket.on('details', function(data) {
        if (clients[0] === socket.id) {
            data.id = clients[1]
        } else if (clients[1] === socket.id) {
            data.id = clients[0]
        }
        
        socket.broadcast.emit('details', data);
    });
});