const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var stats = initStats();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xEEEEEE, 1.0);
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

var planeGeometry = new THREE.PlaneGeometry(10,10);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow  = true;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometry, material );
cube.castShadow = true;
cube.position.z = 1; 
scene.add( cube );
scene.add( createMesh( new THREE.ShapeGeometry( drawShape())));
//scene.add( createMesh( new THREE.ShapeGeometry( generatePoints())));

camera.position.z = 5;


// add spotlight for the shadows
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 1, 1, 3 );
spotLight.castShadow = true;
scene.add( spotLight );


let controls = new THREE.TrackballControls( camera, renderer.domElement );  

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update(); 
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    stats.update();
}
animate();

//-------------------------------------------
// GUI
//-------------------------------------------

var obj = {
    message: 'Hello World',
    displayOutline: false,

    maxSize: 6.0,
    speed: 5,

    height: 10,
    noiseStrength: 10.2,
    growthSpeed: 0.2,

    type: 'three',

    explode: function () {
      alert('Bang!');
    },

    color0: "#ffae23", // CSS string
    color1: [ 0, 128, 255 ], // RGB array
    color2: [ 0, 128, 255, 0.3 ], // RGB with alpha
    color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
};

var gui = new dat.gui.GUI();

//gui.remember(obj);

gui.add(obj, 'message');
gui.add(obj, 'displayOutline');
gui.add(obj, 'explode');

gui.add(obj, 'maxSize').min(-10).max(10).step(0.25);
gui.add(obj, 'height').step(5); // Increment amount

// Choose from accepted values
gui.add(obj, 'type', [ 'one', 'two', 'three' ] );

// Choose from named values
gui.add(obj, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );

var f1 = gui.addFolder('Colors');
f1.addColor(obj, 'color0');
f1.addColor(obj, 'color1');
f1.addColor(obj, 'color2');
f1.addColor(obj, 'color3');

var f2 = gui.addFolder('Another Folder');
f2.add(obj, 'noiseStrength');

var f3 = f2.addFolder('Nested Folder');
f3.add(obj, 'growthSpeed');

function initStats(){

  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.getElementById("statz").append(stats.domElement);

  return stats;
}