var express = require('express');
var app = express();
var serv = require('http').Server(app);
var ID = 0;


app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log("Server started.");

var SOCKET_LIST = {};
var PLAYER_LIST = {};

/*var Player = function(id){
	var self = {
		x:250,
		y:250,
		id:id,
		number:"" + Math.floor(10 * Math.random()),
		pressingRight:false,
		pressingLeft:false,
		pressingUp:false,
		pressingDown:false,
		maxSpd:10,
	}
	self.updatePosition = function(){
		if(self.pressingRight)
			self.x += self.maxSpd;
		if(self.pressingLeft)
			self.x -= self.maxSpd;
		if(self.pressingUp)
			self.y -= self.maxSpd;
		if(self.pressingDown)
			self.y += self.maxSpd;
	}
	return self;
}*/

//Constructor for Player_Entity_Type
function Player(id){

	this.x  = 250;
	this.y  = 250;
	this.id = id;
	this.num= "" + Math.floor(10 * Math.random());//stringa con numero da 0 a 9
	
};

var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){
  
  socket.id = ++ID;//Math.random();due id potrebbero essere uguali, inoltre è un valore float, molto meglio lavorare con int dove possibile. In questi casi consigliano o contatore o Symbol()
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
