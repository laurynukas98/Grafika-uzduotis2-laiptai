var stepz = new Array();
var railPoints = new Array();
var renderedL = new Array();

var lamberMaterial = new THREE.MeshLambertMaterial( { color: 0xba6816 } );
var phongMaterial = new THREE.MeshPhongMaterial( {color: 0x8d8d8d} );

//Initiate step w rail base *****************
//creating steps
const rstepO = drawStep();
rstepO.position.x = 0;
rstepO.position.y = 1;
rstepO.position.z = 0;
rstepO.scale.y = -1;
const lstepO = rstepO.clone();
lstepO.scale.x = -1;
lstepO.position.x = (2);
//adding rail base
var points = new Array();
points.push(new THREE.Vector3(2,0.5,3));
points.push(new THREE.Vector3(2.1,0.5,0));
points.push(new THREE.Vector3(1,0.5,0));
//SplineCurve3 has been deprecated. Instead:
const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.4);
const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
const partz1 = new THREE.Mesh( tubeGeometry, phongMaterial);
partz1.castShadow = true; partz1.receiveShadow = true;
rstepO.attach(partz1.clone());
lstepO.attach(partz1.clone());
const sphere = new THREE.SphereGeometry(0.11, 16, 16);//end
const end = new THREE.Mesh(sphere, phongMaterial);
end.castShadow = true; end.receiveShadow = true;
//*******************************************

function drawAll(degrees, r, steps, h){//redraw...
    clearR();
    var planeGeometryT = new THREE.PlaneGeometry(5,5);
    var planeMaterialT = new THREE.MeshLambertMaterial({color: 0x000000,opacity: 0.1, transparent: true});
    var planeTop = new THREE.Mesh(planeGeometryT,planeMaterialT);
    planeTop.position.x = 1;
    planeTop.position.y = -2.5;
    planeTop.position.z = h;
    scene.add(planeTop);
    renderedL.push(planeTop);
    h = h-0.2;
    steps -= 1;
    var eachRotation = degrees*Math.PI/180/steps*((r<0)?-1:1);
    var rstep = rstepO.clone();
    var lstep = lstepO.clone();
    //Attach base
    var cilinderB = drawCylinder(0.1,0.1,h/steps+0.2,20);
    cilinderB.position.x = 1;
    cilinderB.position.y = 0.5;
    cilinderB.position.z = -h/steps/2-0.1;
    rstep.attach(cilinderB.clone());
    lstep.attach(cilinderB.clone());
    //start
    rstep.position.z = h; lstep.position.z = h;
    var axle = new THREE.Group();// w axle
    railPoints = new Array();
    axle.position.x -= r;
    stepz = new Array(); var t, t1, arr;
    var stepT = rstep.clone();// 1 step is always right
    scene.add(stepT);
    renderedL.push(stepT);
    stepz.push(stepT);
    t = stepT.children[1].getWorldPosition();//5365
    t.z += h/steps/2+3.05; t.x += Math.cos(eachRotation*0); t.y += Math.sin(eachRotation*0);
    railPoints.push(t);
    //etc. down
    for (var i = 1; i <= steps; i++){//from up cuz top should not move
        //steps
        rstep.position.z -= h/steps; lstep.position.z -= h/steps;
        stepT = i%2==1?lstep.clone():rstep.clone();
        axle.add(stepT);
        stepT.position.sub(axle.position);
        axle.rotateZ(eachRotation);
        scene.attach(stepT);
        scene.add(stepT);
        renderedL.push(stepT);
        stepz.push(stepT);
        //rails
        t = stepT.children[1].getWorldPosition();//5365
        t.z += h/steps/2+3.05; t.x += Math.cos(eachRotation*i); t.y += Math.sin(eachRotation*i);
        railPoints.push(t.clone());
        //base connect
        t1 = stepz[i-1].children[1].getWorldPosition();//5365
        t = stepT.children[1].getWorldPosition();//5365
        t1.z -= h/steps/2; t.z += h/steps/2-0.05;
        arr = new Array();
        arr.push(t1); arr.push(t);
        var tc = new THREE.CatmullRomCurve3(arr, false, "catmullrom", 0);
        var tgg = new THREE.TubeGeometry(tc, 2, 0.1, 4, false);
        var tgr = new THREE.Mesh( tgg, phongMaterial);
        tgr.castShadow = true; tgr.receiveShadow = true;
        scene.add(tgr);
        renderedL.push(tgr);
    }
    //rail
    var railC = new THREE.CatmullRomCurve3(railPoints);
    var railG = new THREE.TubeGeometry(railC, 100, 0.1, 8, false);
    var rail = new THREE.Mesh( railG, phongMaterial);
    rail.castShadow = true; rail.receiveShadow = true;
    scene.add(rail);
    renderedL.push(rail);
    //ends
    t = end.clone();
    t.position.z = railPoints[0].z; t.position.x = railPoints[0].x; t.position.y = railPoints[0].y;
    t1 = t.clone();
    scene.add(t1);
    renderedL.push(t1);
    t.position.z = railPoints[railPoints.length-1].z; t.position.x = railPoints[railPoints.length-1].x; t.position.y = railPoints[railPoints.length-1].y;
    t1 = t.clone();
    scene.add(t1);
    renderedL.push(t1);
    planeGeometryT.dispose();//disposing...
    planeMaterialT.dispose();
    disposeElem(rstep);disposeElem(lstep);
    disposeElem(cilinderB);disposeElem(stepT);
    stepz = undefined;
    railPoints = undefined;
}

function clearR(){//clear rendered elements
    renderedL.forEach(element => {
        scene.remove(element);
        element.geometry.dispose();
        element.material.dispose();
        element = undefined;
    });
}

function disposeElem(element){//dispose element
    element.geometry.dispose();
    element.material.dispose();
    element = undefined;
}

function drawStep(){
    var shape = new THREE.Shape();
    // startpoint
    shape.moveTo(0, 0.75);
    //straight line upwards n etc.
    shape.lineTo(0, 1);
    shape.lineTo(2, 1);
    shape.lineTo(2, 0);
    shape.lineTo(1.8, 0);
    shape.bezierCurveTo(1.8, 0, 0, 0, 0, 0.75);
    const extrudeSettings = {
        steps: 1,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 7,
    };
    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    var mesh = new THREE.Mesh( geometry, lamberMaterial ) ;
    mesh.castShadow = true; mesh.receiveShadow  = true;
    return mesh;
}

function makeBox(x, y, z){
    var geometry = new THREE.BoxGeometry( x, y, z );
    var material = new THREE.MeshPhongMaterial( {color: 0x8d8d8d} );
    var cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true; cube.receiveShadow  = true;
    return cube;
}

function drawCylinder(x,y,z,d){
    var geometry = new THREE.CylinderGeometry( x, y, z, d);
    var material = new THREE.MeshPhongMaterial( {color: 0x8d8d8d} );
    var cylinder = new THREE.Mesh( geometry, material );
    cylinder.translateZ(z/2);
    cylinder.rotateX(90*Math.PI/180);
    cylinder.castShadow = true;
    cylinder.receiveShadow  = true;
    return cylinder;
}