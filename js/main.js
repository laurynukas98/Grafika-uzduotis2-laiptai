const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var stats = initStats();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xEEEEEE, 1.0);
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

//base plane
var planeGeometry = new THREE.PlaneGeometry(73,73);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);

plane.receiveShadow  = true;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

camera.position.z = 5;

//add spotlight for the shadows
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 0, 30 );
spotLight.castShadow = true;
scene.add( spotLight );

let controls = new THREE.TrackballControls( camera, renderer.domElement );  

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();
    stats.update();
}
animate();

//-------------------------------------------
// GUI
//-------------------------------------------

var obj = {
	steps: 20,
	degree: 160,
	ratius: 5,
	height: 20
};

var gui = new dat.gui.GUI();

gui.add(obj, 'steps').min(2).max(80).step(1).onChange(function (value){
	drawAll(obj.degree,obj.ratius,obj.steps,obj.height);
});
gui.add(obj, 'degree').min(0).max(360).step(1).onChange(function (value){
	drawAll(obj.degree,obj.ratius,obj.steps,obj.height);
});
gui.add(obj, 'ratius').min(-15).max(15).step(0.5).onChange(function (value){
	drawAll(obj.degree,obj.ratius,obj.steps,obj.height);
});
gui.add(obj, 'height').min(5).max(25).step(0.5).onChange(function (value){
	drawAll(obj.degree,obj.ratius,obj.steps,obj.height);
});

function initStats(){

  var stats = new Stats();
  stats.setMode(0); //0: fps, 1: ms

  //Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.getElementById("statz").append(stats.domElement);

  return stats;
}

//init first
drawAll(obj.degree,obj.ratius,obj.steps,obj.height);