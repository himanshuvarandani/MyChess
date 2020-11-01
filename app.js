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
var positions = {"wr": ["11", "18"],
                "wn": ["12", "17"],
                "wb": ["13", "16"],
                "wq": ["15"],
                "wk": ["14"],
                "wp": ["21", "22", "23", "24", "25", "26", "27", "28"],
                "br": ["81", "88"],
                "bn": ["82", "87"],
                "bb": ["83", "86"],
                "bq": ["85"],
                "bk": ["84"],
                "bp": ["71", "72", "73", "74", "75", "76", "77", "78"],
                "wremove": ["", ""],
                "bremove": ["", ""],
                "shifted": [],
                "checked": []
                };
var data = {id: id,
            positions: positions,
            turn: "w",
            checked: false,
            moves: []
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