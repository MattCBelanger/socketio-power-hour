//Dependencies
var express = require('express');
var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

// var redis = require('socket.io-redis');
// io.adapter(redis({ host: 'localhost', port: 6379 }));
var store = {};

app.use(express.static(__dirname + './../app/'));

io.on('connection', function(socket) {
	console.log('a user connected at socket ' + socket);
	
	//socket.emit('get users', store);
	// An event happened in the client side.
	socket.on('message', function(msg, callback) {

		if(msg.socket === 'all') {

			// Sending an event from the server to the client.
			io.emit('message', msg.msg);

		// emit vs broadcast.emit
		// emit           -> Sends an event to everyone.
		// broadcast.emit -> Sends an event to everyone but whoever trigger the client event.
		callback('emitted message to all');
		socket.emit('msg recieved','hey from server go yo msg dawg');

		} else {
			io.to(store[msg.socket]).emit('message',msg.msg);


		callback('emitted message to '+msg.socket);

		}
	});
	
	socket.on('create user', function(userName, callback) {

		store[userName] = socket.id;
		
		console.log(store);

		callback(userName);

		socket.broadcast.emit('user online', userName);

	});


	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

});



server.listen(8081,function(){
		console.log('Listening on http://127.0.0.1:%s',"8081");
		console.log('Stop Server With CTRL + C');
	});


