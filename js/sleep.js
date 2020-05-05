// window.THREE = THREE; // Used by APP Scripts.
// window.VRButton = VRButton; // Used by APP Scripts.

function setup(){
  console.log('lit')
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



window.addEventListener('load', setup);
