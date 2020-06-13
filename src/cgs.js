function main() {

    var canvas = document.getElementById('game-window');
    var renderer = new THREE.WebGLRenderer({ canvas: canvas });
    var scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(50));

    var camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 1000);

    camera.add(new THREE.AmbientLight());

    var controls = new THREE.OrbitControls(camera, canvas);

    camera.position.set(0, 0, -50);
    camera.lookAt(0, 0, 0);
    controls.update();

    renderer.setClearColor(0xffffff);

    const box = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 10, 32, 1, true), new THREE.MeshBasicMaterial({color: 0x550000}));
    //scene.add(box);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(8, 32, 32), new THREE.MeshBasicMaterial({color: 0x005500}));
    sphere.position.set(0, 8, 0);
    //scene.add(sphere);

    const sBSP = new ThreeBSP(sphere);
    const bBSP = new ThreeBSP(box);
   
    const sub = bBSP.subtract(sBSP);
    const newMesh = sub.toMesh();
    newMesh.material = new THREE.MeshBasicMaterial({ color: 0xdddddd });

    scene.add(newMesh);
   

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

main();
