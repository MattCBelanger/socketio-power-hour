//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

var redis = require('socket.io-redis');

io.adapter(redis({ host: 'localhost', port: 6379 }));


app.use(express.static(__dirname + './../app/'));

io.on('connection', function(socket){
	console.log('a user connected');
	
	socket.on('chat message', function(msg){

		if(msg.socket ==='all'){
			io.emit('chat message', msg.msg);
		} else {
			console.log(msg);
			console.log('message recieved');
			console.log(socket.id);
			io.to('/#'+msg.socket).emit('chat message',msg.msg)
			//io.to(msg.socket).emit('chat message',msg.msg)
		}
	});
	//io.to(socketid).emit('message', 'for your eyes only');
	
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

server.listen(8082,function(){
		console.log('Listening on http://127.0.0.1:%s',"8082");
		console.log('Stop Server With CTRL + C');
	});


