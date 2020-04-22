
// function main(){
//   let container = document.getElementById('container');
//   for(let i=0; i < 10; i++){
//     console.log(container)
//     let img = document.createElement('img');
//     img.setAttribute("class", "figure");
//     img.src = "media/figure.gif";
//     container.appendChild(img);
//   }
// }
let counter = 0;
let direction = 1;
let terminalText = document.querySelector('#terminal-text');
let newScreenEntered = false;

function caretToggle() {
  var caret = document.getElementsByClassName("term-caret")[0];
  if (caret.classList.contains('blink')) {
    caret.classList.remove('blink');
  } else {
    caret.classList.add('blink');
  }
}

function terminal(){
  setInterval(caretToggle, 500);
  document.addEventListener('keydown', logKey);
}
function sayError(){
  let result = terminalText.childNodes[0];
  result.nodeValue = "> TYPE START TO BEGIN...";
}

function logKey(e) {
  if(newScreenEntered){
    return //dont do anything anymore when we go to new screen;
  }
  let character = `${String.fromCharCode(e.keyCode)}`
  let result = terminalText.childNodes[0];
  if(e.keyCode == 13){//enter pressed
    let command = result.nodeValue.substring(24,result.nodeValue.length);
    command = command.replace(/\s/g, ''); //remove spaces
    console.log(command)
    if(command == "START"){
      main();
    }
    else{//error
      sayError();
    }

  }
  else if(e.keyCode == 8){//delete pressed
    if(result.nodeValue.length > 24){//dont delte if no charavters inputted
      result.nodeValue = result.nodeValue.substring(0, result.nodeValue.length-1);
    }
  }
  else{ //key pressed
    result.nodeValue = result.nodeValue + character;
  }
}


function main(){
  let music = document.getElementById("music");
  music.play();
  console.log('wtf');
  terminalText.style.display = "none";
  newScreenEntered = true;
  div = document.createElement('div');
  div.setAttribute("id", "container");
  document.body.appendChild(div);
  animate();
}

function animate(){
  if(direction ==1 && counter%8==0){//use counter %8 to slowdown
    let container = document.getElementById('container');
    let img = document.createElement('img');
    img.setAttribute("class", "figure");
    img.src = "media/figure.gif";
    container.appendChild(img);
  }
  else if(counter %8==0){
    let imgArray = document.getElementsByClassName('figure');
    let img = imgArray[imgArray.length-1];
    container.removeChild(img);
  }
  if(counter > 218){
    direction = -1;
  }
  if(counter == 1){
    direction = 1;
  }
  counter += direction;
  requestAnimationFrame(animate);
}

window.addEventListener('load', terminal);
