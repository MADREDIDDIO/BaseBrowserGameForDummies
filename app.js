var express = require('express');
var app = express();
var serv = require('http').Server(app);
var ID = 0;

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);

var io = require('socket.io')(serv,{});

console.log("Server started.");

var SOCKET_LIST = {};
var PLAYER_LIST = {};

//Constructor for Player_Entity_Type
function Player(id,x,y){

	this.x  = x || 250;
	this.y  = y || 250;
	this.id = id;
	this.spd= 10;
	
};

io.sockets.on('connection', function(socket){
  
  socket.id = ++ID;
	SOCKET_LIST[socket.id] = socket;

	var player = new Player(socket.id);
	PLAYER_LIST[socket.id] = player;

	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
	});

	socket.on('updatePos',function(data){
		
	});

});

setInterval(function(){
	var pack = [];
	for(var i in PLAYER_LIST){
		var player = PLAYER_LIST[i];
		player.updatePosition();
		pack.push({
			x:player.x,
			y:player.y,
			number:player.number
		});
	}
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('newPositions',pack);
	}




},1000/25);
