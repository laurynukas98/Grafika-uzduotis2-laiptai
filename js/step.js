var step = new THREE.Shape();

function drawShape() {
    // create a basic shape
    var shape = new THREE.Shape();

    // startpoint
    shape.moveTo(1, 1);

    // straight line upwards
    shape.lineTo(1, 2);
    shape.lineTo(1.2, 2);

    // the top of the figure, curve to the right
    shape.bezierCurveTo(1.2, 2, 2, 2, 3, 1.5);
    shape.beverSize = 1;
    shape.bevelEnabled = true;
    shape.amount = 2;
    shape.lineTo(3,1);
    shape.lineTo(1,1);

    // return the shape
    return shape;
}

/*
function generatePoints(points, segments, radius, radiusSegments, closed) {
    // add n random spheres


    spGroup = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: false});
    points.forEach(function (point) {

        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position = point;
        spGroup.add(spMesh);
    });
    // add the points as a group to the scene
    scene.add(spGroup);

    // use the same points to create a convexgeometry
    var tubeGeometry = new THREE.TubeGeometry(new THREE.SplineCurve3(points), segments, radius, radiusSegments, closed);
    tubeMesh = createMesh(tubeGeometry);
    scene.add(tubeMesh);
}*/

function createMesh(geom) {

    geom.applyMatrix(new THREE.Matrix4().makeTranslation(-20, 0, 0));

    // assign two materials
    var meshMaterial = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.7});

    //  meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

    return mesh;
}