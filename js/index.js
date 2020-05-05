let canvas, c, fontSize, bin, binArray, width, height;
let redShift = 0; // how far color channel will be shifted
let greenShift = 1; // how far color channel will be shifted
let direction = 1; // direction of shift
let factor = 6; // speed of shift
let started = false;
let counter = 0;
let terminalText = document.querySelector('#terminal-text');
let newScreenEntered = false;
let flashCounter = 0;

function caretToggle() {
  if(!newScreenEntered){
    var caret = document.getElementsByClassName("term-caret")[0];
    if (caret.classList.contains('blink')) {
      caret.classList.remove('blink');
    } else {
      caret.classList.add('blink');
    }
  }
}

function terminal(){
  setInterval(caretToggle, 500);
  document.addEventListener('keydown', logKey);
}
function sayError(){
  let result = terminalText.childNodes[0];
  result.nodeValue = "> ROOT$ ";
}
function list(){
  let p = document.createElement('p');
  let caret = document.getElementsByClassName("term-caret")[0];
  p.setAttribute("class", "terminal-text");
  p.textContent= "START DRINK SLEEP";
  document.body.appendChild(p);
  terminalText.removeChild(caret);
  let newP = document.createElement('p');
  newP.setAttribute("id", "terminal-text");
  terminalText = newP;
  newP.textContent = "> ROOT$ "
  let span = document.createElement('span');
  span.setAttribute("class", "term-caret");
  span.innerHTML = "&#x2588;"
  document.body.appendChild(newP);
  newP.appendChild(span);

}
function logKey(e) {
  if(newScreenEntered){
    return //dont do anything anymore when we go to new screen;
  }
  let character = `${String.fromCharCode(e.keyCode)}`
  let result = terminalText.childNodes[0];
  if(e.keyCode == 13){//enter pressed
    let command = result.nodeValue.substring(8,result.nodeValue.length);
    command = command.replace(/\s/g, ''); //remove spaces
    console.log(command)
    if(command == "START"){
      startMain();
    }
    else if(command == "DRINK"){
      startDrink();
    }
    else if(command == "SLEEP"){
      startSleep();
    }
    else if(command == "LS"){
      list();
    }
    else{//error
      sayError();
    }

  }
  else if(e.keyCode == 8){//delete pressed
    if(result.nodeValue.length > 8){//dont delte if no characters inputted
      result.nodeValue = result.nodeValue.substring(0, result.nodeValue.length-1);
    }
  }
  else{ //key pressed
    result.nodeValue = result.nodeValue + character;
  }
}

function removeElements(){
  let terminalTextsClass = document.getElementsByClassName('terminal-text');
  for(let i=0; i< terminalTextsClass.length; i++){
    terminalTextsClass[i].style.display = "none";
  }
  terminalTxtId = document.getElementById('terminal-text');
  while(terminalTxtId){
    terminalTxtId.remove();
    terminalTxtId = document.getElementById('terminal-text');
  }
}
function startMain(){
  newScreenEntered = true;
  removeElements();
  let music = document.getElementById("music");
  music.play();
  // terminalText.style.display = "none";
  div = document.createElement('div');
  div.setAttribute("id", "container");
  document.body.appendChild(div);
  animate();
}

function startDrink(){
  newScreenEntered = true;
  removeElements();
  canvasInit();
  let music = document.getElementById("music2");
  music.play();
}
function startSleep(){
  console.log('lit')
  newScreenEntered = true;
  removeElements();
  let music = document.getElementById("music3");
  music.play();
  var loader = new THREE.FileLoader();
  loader.load( 'app.json', function ( text ) {

    var player = new APP.Player();
    player.load( JSON.parse( text ) );
    player.setSize( window.innerWidth, window.innerHeight );
    player.play();

    document.body.appendChild( player.dom );

    window.addEventListener( 'resize', function () {

      player.setSize( window.innerWidth, window.innerHeight );

    } );

  } )
}

function canvasInit(){
  canvas = document.getElementById("canvas");
  console.log(canvas)
  canvas.style.display = "block"
  c = canvas.getContext("2d");
  setSize();

  bin = ["0", "1"];
  fontSize = 22;
  cols = canvas.width/fontSize;
  binArray = [];

  for(let i=0; i < cols; i++){
    binArray[i] = 1;
  }
  setInterval(draw, 110);
}

function draw(){
  c.fillStyle = "rgba(0,0,0,0.05)";
  c.fillRect(0,0, canvas.width, canvas.height);
  if(started){
    c.fillStyle = "red";
  }
  else{
    c.fillStyle = "green";
  }
  c.font = fontSize+ "px arial";
  for(let i=0; i < binArray.length; i++){
    let textContent = bin[Math.floor(Math.random()*bin.length)];
    c.fillText(textContent, i * fontSize, binArray[i] * fontSize);
    if(binArray[i] * fontSize >  canvas.height && Math.random() > 0.98){
      flashCounter++;
      console.log(flashCounter);
      if(flashCounter > 73){
        started = true;
      }
      binArray[i] = 0;
    }
    binArray[i] += 1;
  }
  let imgComp = document.getElementById("comp");
  let imgArt = document.getElementById("art");
  let imgCompDimension = 650;
  let imgArtDimensionX = 150;
  let imgArtDimensionY = 200;
  let displacementY = 155;
  let displacementX = 20;
  c.drawImage(imgComp, (width/2)-(imgCompDimension/2), (height/2)-(imgCompDimension/2), imgCompDimension, imgCompDimension);
  c.drawImage(imgArt, (width/2)-(imgArtDimensionX/2)+displacementX, (height/2)-(imgArtDimensionY/2)-displacementY, imgArtDimensionX, imgArtDimensionY);


  let startPosX = (width/2)-(imgArtDimensionX/2)+displacementX-128;
  let endPosX = (width/2)-(imgArtDimensionX/2)-235;
  let startPosY = (height/2)-(imgArtDimensionY/2)-displacementY-50;
  let endPosY = (height/2)-(imgArtDimensionY/2)-displacementY+imgArtDimensionY-105;
  let imageData = c.getImageData(startPosX, startPosY, endPosX, endPosY);
  let data = imageData.data;
  redShift += direction * factor;
  greenShift += direction * factor;
  // locate and shift pixels
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let index = (x + y * imageData.width) * 4;
        let topIndex = (x + (y-10) * imageData.width) * 4;
        data[index + 0] = data[topIndex+0  - redShift];
        data[index + 1] = data[topIndex+1  - greenShift];
      }
    }
    c.putImageData(imageData, startPosX, (height/2)-(imgArtDimensionY/2)-displacementY-25);
    if (redShift > 50 || redShift < -50) {
      direction *= -1;
    }
}

function setSize(){
  canvas.height=window.innerHeight ;
  canvas.width=window.innerWidth ;
  height = canvas.height;
  width = canvas.width;
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
