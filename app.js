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
var positions = {"white-rook": ["11", "18"],
                "white-knight": ["12", "17"],
                "white-bishop": ["13", "16"],
                "white-queen": ["15"],
                "white-king": ["14"],
                "white-pawn": ["21", "22", "23", "24", "25", "26", "27", "28"],
                "black-rook": ["81", "88"],
                "black-knight": ["82", "87"],
                "black-bishop": ["83", "86"],
                "black-queen": ["85"],
                "black-king": ["84"],
                "black-pawn": ["71", "72", "73", "74", "75", "76", "77", "78"],
                "white-remove": ["", ""],
                "black-remove": ["", ""],
                "shifted": [],
                "checked": []
                };
var data = {id: id,
            positions: positions,
            turn: "white",
            checked: false,
            scout_moved: [],
            scout_moved_from: [],
            scout_moved_to: [],
            scout_removed: []
        };

io.on('connection', function(socket) {
    console.log(socket.id)
    clients.push(socket.id);
    length = clients.length;
    
    if (length === 1) {
        if (random === 0) {
            id = clients[0];
        }
        
        data.id = id;
        io.sockets.to(socket.id).emit('reset', data);
    } else {
        if (length === 2) {
            if (random === 0) {
                id = clients[0];
            } else {
                id = clients[1];
            }
        }
        
        data.id = socket.id;
        io.sockets.to(clients[0]).emit('current positions', data);
    }

    socket.on('current positions', function(data) {
        id1 = data.id;
        data.id = id;
        io.sockets.to(id1).emit('reset', data);
    });

    socket.on('details', function(data) {
        if (clients[0] === socket.id) {
            data.id = clients[1]
        } else if (clients[1] === socket.id) {
            data.id = clients[0]
        }
        
        socket.broadcast.emit('details', data);
    });

    socket.on('takeback', function (data) {
        if (clients[0] === socket.id) {
            data.id1 = clients[1];
        } else if (clients[1] === socket.id) {
            data.id1 = clients[0];
        }
        
        io.sockets.to(data.id1).emit('takeback', data);
    });

    socket.on('takeback reply', function (data) {
        io.sockets.emit('takeback reply', data);
    });
});