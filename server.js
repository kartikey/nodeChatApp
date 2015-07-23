var express  = require('express');
var app      = express();
var port = 9000;
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) { 
    res.sendFile(__dirname + '/public/index.html');
});

var userlist = [];

io.on('connection', function(socket) {
	userlist.push({"id":socket.id, "name": undefined});
	
	io.emit('user_connected', userlist);
    
    console.log(socket.id+" has connected.");
  
    socket.on('chat_message', function(msg) {
    	var nameToSend = undefined;
    	
    	_.forEach(userlist, function(n) {
    		if(n['id'] == socket.id)
    			nameToSend = n['name'] || n['id'];
    	});
        io.emit('chat_message', {"id":nameToSend, "message":msg});
    });
    
    socket.on('name_change', function(name) {
    	_.forEach(userlist, function(n) {
    		if(n['id'] == socket.id) {
    			n['name'] = name;
    			//io.emit("name_change",{"id":n['id'], "name": n['name']});
    			io.emit("name_change",userlist);
    		}
    	});
    });

    socket.on('disconnect', function(){
        console.log(socket.id + " has disconnected.");

       	_.remove(userlist, function (n){
       		return n['id'] == socket.id;
       	});

       	io.emit('user_disconnected', {"id":socket.id}); 	
    });
});

http.listen(port, function() {
    console.log("Listening at port: " +port);
});
