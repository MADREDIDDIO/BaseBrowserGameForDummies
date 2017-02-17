function parseImput(event){
  if(event.keyCode === 68) //d
    player.move("est");
  if(event.keyCode === 83) //s
    player.move("sud");
  if(event.keyCode === 65) //a
    player.move("owest");
  if(event.keyCode === 87) //w
    player.move("nord");
};

document.addEventListener("onkeydown",parseImput(event),false);
