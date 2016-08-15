var socket = io();

var userName = prompt(`What's your name?`);

setTimeout(function(){ 
    console.log(socket.id);
}, 1000);

socket.emit('create user', userName, function(user){
    console.log('User ' + user + ' logged on');
});


$('form').submit(function(e) {
    e.preventDefault();
    var msg = {
        msg:$('#m').val(),
        socket:$('#s').val()
    }

    socket.emit('message', msg, function(serverMsg){
        console.log(serverMsg);
    });

    $('#m').val('');
});


socket.on('message', function(msg){
    $('#messages').append($('<li>').text(msg));
});

socket.on('msg recieved', function(msg){
    console.log(msg)
});


