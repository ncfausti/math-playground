if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}
var camera, controls, scene, renderer, stats;
const red = 0xff0000;
const green = 0x00ff00;
const blue = 0x0000ff;
const pink = 0xff00ff;
const yellow = 0xffff00;
const cyan = 0x00ffff;
const magenta = 0xff00ff;
const white = 0xffffff;

init();
animate();

function v3(x, y, z) { return new THREE.Vector3(x, y, z) }

function arrow3d(dir, origin, length, color, headLength, headWidth) {
    const _origin = origin || v3(0, 0, 0);
    const _color = color || 0xffffff;
    return new THREE.ArrowHelper(dir, _origin, length, color, headLength, headWidth);
}

function toFrom(to, from) {
    const _from = from || v3(0, 0, 0);
    const dirX = to.x - _from.x;
    const dirY = to.y - _from.y;
    const dirZ = to.z - _from.z;

    const dir = v3(dirX, dirY, dirZ).normalize();

    // var max = dirX >= dirY ? dirX : dirY;
    // max = max >= dirZ ? max : dirZ;
    // const hyp1 = Math.sqrt(dirX ** 2 + dirZ ** 2);
    // const hyp2 = Math.sqrt(hyp1 ** 2 + dirY ** 2);
    // const distance = Math.sqrt(<hyp1 + hyp2)

    // const hyp3 = Math.max(hyp1, hyp2);
    const distance = Math.sqrt(dirZ ** 2 + dirX ** 2 + dirY ** 2);
    console.log('dist:', distance);
    return arrow3d(dir, _from, distance)
}


function init() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 7;
    camera.position.y = 7;
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

    // mimic draw3D from Orland book
    const draw3d = (...objs) => objs.forEach(obj => scene.add(obj));

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

    draw3d(new THREE.GridHelper());
    //         }
    //     }
    // }
    // lights
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    draw3d(light);
    var light = new THREE.DirectionalLight(0x002288);
    light.position.set(- 1, - 1, - 1);
    draw3d(light);
    var light = new THREE.AmbientLight(0x222222);
    draw3d(light);

    const dirX = new THREE.Vector3(2, 0, 0);
    const dirY = new THREE.Vector3(0, 2, 0);
    const dirZ = new THREE.Vector3(0, 0, 2);
    //normalize the direction vector (convert to vector of length 1)
    // dir.normalize();

    const origin = v3(0, 0, 0) // new THREE.Vector3(0, 0, 0);
    const length = 1;

    // const arrowHelper = new THREE.ArrowHelper(dir, origin, length, red);
    const axesHelper = new THREE.AxesHelper(5);
    // axesHelper.setColors(0xff0000, 0x0000ff, 0x00ff00);

    // const Arrow3d(dir) => {
    //     const dir = new THREE.Vector3(...tupDir);
    //     const origin = new THREE.Vector3(...tupOrigin);
    //     const arrowHelper = new THREE.ArrowHelper(dir, origin, length, color);
    //     scene.add(arrowHelper);
    // }

    const subVec = v3(...subLists(
        v3(4, 3, 0).toArray(),
        v3(1, 1, 0).toArray()));

    draw3d(
        // xyz axes
        arrow3d(dirX, origin, length, red), // x
        arrow3d(dirY, origin, length, green), // y
        arrow3d(dirZ, origin, length, blue), // z 

        arrow3d(v3(4, 3, 0).normalize(), v3(0, 0, 0), v3(4, 0, 3).length(), red),
        // opposite direction as red, with starting point at tip of pink
        arrow3d(v3(-1 * 4, -1 * 3, -1 * 0).normalize(), v3(3, 4, 0), v3(3, 4, 0).length(), red),

        arrow3d(v3(-1, 1, 0).normalize(), v3(0, 0, 0), v3(-1, 1, 0).length(), blue),
        arrow3d(v3(-1, 1, 0).normalize(), v3(4, 3, 0), v3(-1, 1, 0).length(), blue),

        // pink hypotenuse
        arrow3d(v3(3, 4, 0).normalize(), v3(0, 0, 0), v3(3, 4, 0).length(), pink),
        // opposite direction
        arrow3d(v3(-1 * 3, -1 * 4, -1 * 0).normalize(), v3(3, 4, 0), v3(4, 0, 3).length(), pink),

        // an arrow that goes from 3,3,3 to (-1,-1,-1)
        // arrow3d(v3(-1, -1, -1).normalize(), v3(3, 3, 3), v3(1, 1, 1).length() * 4, white),
        toFrom(v3(-1, 1, 0), v3(3, 3, 3)),
        toFrom(v3(0, 3, 3), v3(3, 3, 3)),

        arrow3d(v3(1, 0, 0).normalize(), v3(0, 0, 0), 3, white),
        arrow3d(v3(1, 0, 1).normalize(), v3(0, 0, 0), v3(3, 0, 3).length(), white),
        arrow3d(v3(0, 1, 0).normalize(), v3(3, 0, 3), v3(0, 0, 3).length(), cyan),






        // subtraction vector (x-z)
        // arrow3d(subVec.normalize(),
        //     subVec.length(), 0xff0000))
        // arrow3d(v3(0, 0, -1).normalize(), v3(1, 1, 1), v3(0, 0, -1).length(), 0xaaff00),
        // arrow3d(v3(0, 0, -1).normalize(), v3(1, 1, 1), v3(0, 0, -1).length(), 0xaaff00),
        // arrow3d(v3(0, 0, -1).normalize(), v3(1, 1, 1), v3(0, 0, -1).length(), 0xaaff00),
        // arrow3d(new THREE.Vector3(1, 1, 1), THREE.Vector3(0, 0, 0)),
        axesHelper
    );

    // vector addition (4,0,3) + (-1, 0, 1) = (3, 0, 4) 
    // how can I turn this into a compiler??, that accepts standard math notation
    // and outputs this draw3d code:
    // draw3d(
    //     arrow3d(v3(4, 0, 3), v3(0, 0, 0), v3(4, 0, 3).length(), 0x0000ff),
    //     arrow3d(v3(-1, 0, 1), v3(4, 0, 3), v3(-1, 0, 1).length(), 0xff0000),
    //     arrow3d(
    //         addVec3(
    //             v3(4, 0, 3),
    //             v3(-1, 0, 1)
    //         ),
    //         v3(0, 0, 0),
    //         addVec3(
    //             v3(4, 0, 3),
    //             v3(-1, 0, 1)
    //         ).length(),
    //         0xff00ff,
    //     )
    // )


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