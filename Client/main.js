var ctx = document.getElementById("ctx").getContext("2d"),

		socket = io();

socket.on('newPositions',function(data){
	ctx.clearRect(0,0,500,500);
	for(var i = 0 ; i < data.length; i++)
	ctx.fillRect(data[i].x-5,data[i].y-5,10,10);		
});
