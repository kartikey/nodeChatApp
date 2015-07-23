var express  = require('express');
var app      = express();
var port = 9000;
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) { 
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    console.log(socket.id+" has connected");
    
    socket.on('chat_message', function(msg){
        console.log("message : "+msg); 
    });
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(port, function() {
    console.log("Listening at port: " +port);
});
