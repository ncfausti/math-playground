var renderer, scene, camera, controls, shapes;
let COUNT = 15;
let PURPLE = 0x6622ff;
let WHITE = 0xffffff;
let COLOR_3 = 0x6600ff;

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcc4433);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.rotation.y = 50;
    camera.rotation.x = 0;
    camera.rotation.z = 0;

    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68];
    controls.addEventListener('change', render);

    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let C = .05;
    let bigC = .2;
    var geometry = new THREE.BoxGeometry(C, C, C);
    var bigGeometry = new THREE.BoxGeometry(C + bigC, C + bigC, C + bigC);

    var material = new THREE.MeshBasicMaterial({ color: WHITE });
    var material2 = new THREE.MeshBasicMaterial({ color: PURPLE });

    shapes = [];

    for (var y = 0; y < COUNT; y++) {
        shapes.push([]);
        for (var z = 0; z < COUNT; z++) {
            shapes[y].push([]);
        }
    }

    for (var i = 0; i < COUNT; i++) {
        for (var y = 0; y < COUNT; y++) {
            for (var z = 0; z < COUNT; z++) {
                var cube = new THREE.Mesh(geometry, material);
                var line = new THREE.LineSegments(edges,
                    new THREE.LineBasicMaterial({ color: PURPLE }));
                var bigLine = new THREE.LineSegments(edges2,
                    new THREE.LineBasicMaterial({ color: WHITE }));
                var bigCube = new THREE.Mesh(bigGeometry, material2);

                var edges = new THREE.EdgesGeometry(geometry);
                var edges2 = new THREE.EdgesGeometry(bigGeometry);

                // var rand = Math.random() < .5 ? .3 : .1
                var rand = .3;
                // cube.position.x += i * rand;
                cube.position.y += y * rand;
                cube.position.z += z * rand;

                // line.position.x += i * rand;
                line.position.y += y * rand;
                line.position.z += z * rand;

                // bigLine.position.x += i * 0.5;
                bigLine.position.y += y * 0.5;
                bigLine.position.z += z * 0.5;

                scene.add(line);
                scene.add(cube);
                scene.add(bigLine);

                shapes[y][z].push([line, bigLine, cube]);
            }
        }
    }
}

init();
animate();

function rotateMesh(mesh, rotateX, rotateY) {
    mesh.rotation.x += rotateX;
    mesh.rotation.y += rotateY;
}

function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    let rot = .0001
    let multiply = 0.001;

    // for (var j = 0; j < COUNT; j++) {
    // 	for (var k = 0; k < COUNT; k++) {
    // 		for (var z = 0; z < COUNT; z++) {
    // 			for ( shape in shapes[j][k][z])
    // 				rotateMesh( shapes[j][k][z][shape], rot + j*k*z*multiply, rot + j*k*z*multiply );
    // 		}
    // 	}
    // }

    render();
}

document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    console.log('keypress event\n\n' + 'key: ' + keyName);
    handleKeyPress(keyName);
});



function handleKeyPress(key) {
    if ((key) === "w")
        camera.position.z -= .10;

    if ((key) === "s")
        camera.position.z += .10;

    if ((key) === "a")
        camera.position.x -= .10;

    if ((key) === "d")
        camera.position.x += .10;

    if ((key) === "q")
        camera.rotation.y += .05;

    if ((key) === "e")
        camera.rotation.y -= .05;

    if ((key) === "r")
        camera.position.y += .10;

    if ((key) === "f")
        camera.position.y -= .10;
}

function render() {
    renderer.render(scene, camera);
}
