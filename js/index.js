if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}
var camera, controls, scene, renderer, stats;

init();
animate();

const v3 = THREE.Vector3;

// function draw3D(v3)

function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 10;
    camera.position.y = 10;
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
    // world
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xcccccc);
    // scene.background = new THREE.Color(0xcc4433);


    // scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
    var geometry = new THREE.CylinderBufferGeometry(0, 10, 90, 4, 1);
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
    // for (var i = 0; i < 10; i++) {
    //     for (var j = 0; j < 10; j++) {
    //         for (var k = 0; k < 10; k++) {
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.x = ( Math.random() - 0.5 ) * 1000;
    // mesh.position.y = ( Math.random() - 0.5 ) * 1000;
    // mesh.position.z = ( Math.random() - 0.5 ) * 1000;
    // mesh.position.x = (1) * 50;
    // mesh.position.y = (1) * 50;
    // mesh.position.z = (1) * 50;
    // mesh.updateMatrix();
    // mesh.matrixAutoUpdate = false;
    // scene.add(mesh);
    scene.add(new THREE.GridHelper());
    //         }
    //     }
    // }
    // lights
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    var light = new THREE.DirectionalLight(0x002288);
    light.position.set(- 1, - 1, - 1);
    scene.add(light);
    var light = new THREE.AmbientLight(0x222222);
    scene.add(light);

    const dir = new THREE.Vector3(1, 0, 0);
    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    const origin = new THREE.Vector3(0, 0, 0);
    const length = 1;
    const hex = 0xffff00;
    const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
    scene.add(arrowHelper);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    stats = new Stats();
    document.body.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);

    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}

document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    console.log('keypress event\n\n' + 'key: ' + keyName);
    handleKeyPress(keyName);
});



function handleKeyPress(key) {
    if ((key) === "w")
        camera.position.z -= 10;

    if ((key) === "s")
        camera.position.z += 10;

    if ((key) === "a")
        camera.position.x -= 10;

    if ((key) === "d")
        camera.position.x += 10;

    if ((key) === "q")
        camera.rotation.y += 05;

    if ((key) === "e")
        camera.rotation.y -= 05;

    if ((key) === "r")
        camera.position.y += 10;

    if ((key) === "f")
        camera.position.y -= 10;
}