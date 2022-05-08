if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}
var camera, controls, scene, renderer;
const red = 0xff0000;
const green = 0x00ff00;
const blue = 0x0000ff;
const pink = 0xff00ff;
const yellow = 0xffff00;
const cyan = 0x00ffff;
const magenta = 0xff00ff;
const white = 0xffffff;

var cam1 = true;

init();
animate();

function v3(x, y, z) { return new THREE.Vector3(x, y, z) }

// mimic draw3D from Orland book
function draw3d(...objs) { return objs.forEach(obj => scene.add(obj)) }

function arrow3d(dir, origin, length, color, headLength, headWidth) {
    const _origin = origin || v3(0, 0, 0);
    const _color = color || 0xffffff;
    return new THREE.ArrowHelper(dir, _origin, length, color, headLength, headWidth);
}

function toFrom(to, from, color) {
    const _from = from || v3(0, 0, 0);
    const _color = color || 0xffffff;

    // calculate differences
    const dirX = to.x - _from.x;
    const dirY = to.y - _from.y;
    const dirZ = to.z - _from.z;

    // use difference as normalized direction
    const dir = v3(dirX, dirY, dirZ).normalize();
    const distance = Math.sqrt(dirZ ** 2 + dirX ** 2 + dirY ** 2);
    return arrow3d(dir, _from, distance, _color);
}


function init() {
    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 3, 1000);
    // camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;


    // world
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    // scene.background = new THREE.Color(0xcc4433);



    // pink fog
    // scene.fog = new THREE.FogExp2(0xff00ff, 0.08);

    // var geometry = new THREE.CylinderBufferGeometry(0, 10, 90, 4, 1);
    // var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
    // for (var i = 0; i < 10; i++) {
    //     for (var j = 0; j < 10; j++) {
    //         for (var k = 0; k < 10; k++) {
    //             var mesh = new THREE.Mesh(geometry, material);
    //             mesh.position.x = (Math.random() - 0.5) * 1000;
    //             mesh.position.y = (Math.random() - 0.5) * 1000;
    //             mesh.position.z = (Math.random() - 0.5) * 1000;
    //             mesh.position.x = (i) * 50;
    //             mesh.position.y = (j) * 50;
    //             mesh.position.z = (k) * 50;
    //             mesh.updateMatrix();
    //             mesh.matrixAutoUpdate = false;
    //             scene.add(mesh);
    //         }
    //     }
    // }

    draw3d(new THREE.GridHelper());

    const light1 = new THREE.DirectionalLight(0xffffff);
    const light2 = new THREE.DirectionalLight(0x002288);
    const light3 = new THREE.AmbientLight(0x888888);

    light1.position.set(1, 1, 1);
    light2.position.set(- 1, - 1, - 1);

    draw3d(light1);
    draw3d(light2);
    draw3d(light3);

    const dirX = new THREE.Vector3(2, 0, 0);
    const dirY = new THREE.Vector3(0, 2, 0);
    const dirZ = new THREE.Vector3(0, 0, 2);

    const origin = v3(0, 0, 0) // new THREE.Vector3(0, 0, 0);
    const axesLength = 1;
    const axesHelper = new THREE.AxesHelper(5);

    const startingPoint = vec3(0, 0, 1);

    draw3d(
        // xyz axes
        arrow3d(dirX, origin, axesLength, red), // x
        arrow3d(dirY, origin, axesLength, green), // y
        arrow3d(dirZ, origin, axesLength, blue), // z 
        axesHelper
    );

    // better to use polar coordinates for rotations
    polarStart = to_polar(startingPoint.x, startingPoint.z)

    // rotate 1/4 around the origin
    nextPoint = to_cartesian(polarStart[0], polarStart[1] + 1);
    // draw3d(
    //     toFrom(v3(nextPoint[0], 0, nextPoint[1]), startingPoint)
    // )

    var pNewPoint = to_polar(nextPoint[0], nextPoint[1]);
    var cNewPoint = to_cartesian(pNewPoint[0], pNewPoint[1] + 1)
    draw3d(
        toFrom(v3(cNewPoint[0], 0, cNewPoint[1]), v3(nextPoint[0], 0, nextPoint[1]))
    )

    // Use polar convert between polar coordinates and cartesian
    // to simplify rotations
    for (var i = 0; i < 1000; i++) {
        var prevPoint = cNewPoint;
        var pNewPoint = to_polar(cNewPoint[0], cNewPoint[1]);
        var cNewPoint = to_cartesian(pNewPoint[0], pNewPoint[1] + 3)
        // draw3d(
        //     toFrom(
        //         v3(cNewPoint[0], .1 * i, cNewPoint[1]),
        //         v3(prevPoint[0], .1 * (i - 1), prevPoint[1]),
        //         red
        //     )
        // )
    }


    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // stats = new Stats();
    // document.body.appendChild(stats.dom);

    // controls
    // controls = new THREE.TrackballControls(camera);
    // controls.rotateSpeed = 10.0;
    // controls.zoomSpeed = .8;
    // controls.panSpeed = 0.8;
    // controls.noZoom = false;
    // controls.noPan = false;
    // controls.staticMoving = true;
    // controls.dynamicDampingFactor = 0.1;
    // controls.keys = [65, 83, 68];
    // controls.addEventListener('change', render);


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
    // controls.update();
    // stats.update();
}

function render() {
    renderer.render(scene, camera);
}

// document.addEventListener('keypress', (event) => {
//     const keyName = event.key;
//     console.log('keypress event\n\n' + 'key: ' + keyName);
//     handleKeyPress(keyName);
// });


// document.addEventListener('keydown', console.log);

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