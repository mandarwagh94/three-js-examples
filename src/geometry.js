function createPlaneGeometry() {

    return new THREE.PlaneGeometry(30, 30);

}

function createSimpleMesh(scene) {

    const geometry = createPlaneGeometry();
    geometry.computeFaceNormals();

    const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
        color: 0X498505,
        side: THREE.FrontSide
    }));
    scene.add(mesh);

    scene.add(new FaceNormalsHelper(mesh, 2, 0xff0000));

    const edgeGeometry = new THREE.EdgesGeometry(mesh.geometry);
    const edgeMesh = new THREE.LineSegments(edgeGeometry, new THREE.LineBasicMaterial({ color: 0x000000, depthTest: false }));
    scene.add(edgeMesh);


}

function createPointMesh(scene) {

    const geometry = createOvalGeometry();
    geometry.computeFaceNormals();

    //const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const point = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x00ff00 }));
    scene.add(point);

}

function init() {

    var canvas = document.getElementById('game-window');
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    var scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(50));

    var camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);

    const light = new THREE.AmbientLight();
    scene.add(light);

    var controls = new THREE.OrbitControls(camera, canvas);
    controls.update();

    renderer.setClearColor(0xffffff);

    createSimpleMesh(scene);
    //createPointMesh(scene);


    var elapsedTime = 0;
    var frameCount = 0;
    var lastTime = new Date().getTime();
    var now = 0;

    var animate = function () {

        now = new Date().getTime();

        frameCount++;
        elapsedTime += (now - lastTime);

        lastTime = now;

        if (elapsedTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            elapsedTime -= 1000;

            document.getElementById('test').innerHTML = fps;
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    };

    animate();

}

init();