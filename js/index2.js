let camera, scene, renderer, controls, mesh, light;

function init() {
  scene = new THREE.Scene();

  let width = window.innerWidth;
  let height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width/height, 1, 25000);
  camera.position.set(0, 0, 2000);
  scene.add(camera);

  light = new THREE.DirectionalLight(0xfffffff, 1); // color, intensity
  light.position.set(1, 1, 1); // location x, y, z
  scene.add(light);

  renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
  renderer.setSize(width, height);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
}

function vertices(){
  // let material = new THREE.MeshLambertMaterial( {wireframe: true, color: 0xffffff, side: THREE.DoubleSide});
  let material = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide});
  //width, height, segments
  let geometry = new THREE.PlaneGeometry(800, 800, 20, 20);
  mesh = new THREE.Mesh(geometry, material);

  //tell

  console.log(mesh.geometry.vertices.length);//441 vertices not 400 (20*20)
  //generate random heights for each vertex

  for(let i=0; i < mesh.geometry.vertices.length; i++){
    mesh.geometry.vertices[i].z = Math.floor(Math.random() * 1000);
  }

  // mesh.rotation.x = -Math.PI /2;
  mesh.translate.z = -8192;
  // mesh.rotation.z = 1090;
    geometry.computeVertexNormals();
  scene.add(mesh);
}

// function animate(){
//   renderer.render(scene, camera);
//   controls.update();
//   requestAnimationFrame(animate);
//   let date = new Date();
//   let timer = date.getTime() * 0.002; //get time string, changing speed
//   camera.position. = 800 * Math.cos(timer); //multiplier changes X coordinate
//   //camera.position.z = 800 * Math.sin(timer); //multiplier changes Z coordinate
//
//
//   requestAnimationFrame(animate);
// }

window.addEventListener('load', ()=>{
  init();
  vertices();
  //animate();
})
