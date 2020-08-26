var express = require("express");
var app = express();

app.set('view engine', 'html');

app.set('views', __dirname + '/views');
app.use(express.static("static"));

app.get('/chess', function(req, res) {
    res.sendFile("/himanshu/Chess/views/chess.html");
});

app.listen(3000, function() {
    console.log("Chess Server is started!!!");
});