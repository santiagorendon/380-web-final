function init(){
  canvas = document.getElementById("canvas");
  canvas.style.display = "block";
  c = canvas.getContext("2d");
  setSize();

  bin = ["0", "1"];
  fontSize = 22;
  cols = canvas.width/fontSize;
  binArray = [];

  for(let i=0; i < cols; i++){
    binArray[i] = 1;
  }
  // var img = document.getElementById("drip");
  // c.drawImage(img, 10, 10);
  setInterval(draw, 110);
}


window.addEventListener('load', ()=>{
  init();
})
