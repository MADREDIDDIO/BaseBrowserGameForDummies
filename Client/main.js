//Impongo dei parametri di controllo più rigidi sulla sintassi del linguaggio
"use strict";
    //Acquisisco il contesto
var ctx = document.getElementById("ctx").getContext("2d"),
    //instauro un canele di comunicazione con il server
    socket = io(),
    //Vettore di oggetti di tipo Player in gioco
    playerInGame = [];
//Quando viene inviato l'aggiornamento dei giocatori in gioco dal server..
socket.on('uploadPlayers',function(data){
  //.. i dati vengono processati..
    
  //.. e viene aggiornato il vettore contenente gli oggetti di tipo Player
  playersInGame = data;
});
//Quando la finestra del browser è carica inizia il loop di gioco
window.onload(function mainLoop(){
  ctx.clearRect(0,0,500,500);
  for(var i = 0 ; i < playerInGame.length; i++)
  ctx.fillRect(playerInGame[i].x-5,playerInGame[i].y-5,10,10);
  requestAnimationFrame(mainLoop); 
});
