var ctx = document.getElementById("ctx").getContext("2d"),

    socket = io(),
    
    playerInGame = null;

socket.on('uploadPlayers',function(data){
  playersInGame = data;
});

window.onload(function mainLoop(){
  ctx.clearRect(0,0,500,500);
  for(var i = 0 ; i < playerInGame.length; i++)
  ctx.fillRect(playerInGame[i].x-5,playerInGame[i].y-5,10,10);
  requestAnimationFrame(mainLoop); 
});
