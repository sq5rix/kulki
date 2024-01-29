import * as THREE from 'three';

const gridsize = 5;
const R = 1.0;
const D = 3.5;
const maxBalls = 40;
const randomSpeed = 13;
const rotationSpeed = 0.01;
const sphereGroup = new THREE.Group();

let rotationAngle = 0;

let filoQueue = [];

function addToQueue(element) {
    filoQueue.push(element);
}

function removeFromQueue() {
    if (filoQueue.length === 0) {
        console.log("Queue is empty!");
        return null;
    }
    return filoQueue.shift();
}

function sizeOfQueue() {
    console.log(filoQueue);
    return filoQueue.length;
}

function peekQueue() {
    if (filoQueue.length === 0) {
        console.log("Queue is empty!");
        return null;
    }
    return filoQueue[filoQueue.length - 1];
}


function rend(){
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    document.body.appendChild( renderer.domElement );
    return renderer;
}

function cam(x,y,z){
    const camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
}

function aziz_light(x,y,z,intensity){
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(x, y, z);
    light.castShadow = true;
    light.intensity = intensity;
    light.distance = 100;
    scene.add(light);
}

function ambientLight(strength){
    const light = new THREE.AmbientLight(0xffffff, strength);
    scene.add(light);
}

function draw_sphere(x,y,z,r){
    const geometry = new THREE.SphereGeometry(r, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        //color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        color: new THREE.Color(0.8,0.1,0.1),
        metalness: 0.9,
        roughness: 0.1
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphereGroup.add(sphere);
}

function ofs(x){
   return x * D - gridsize * D / 2 + D / 2 ;
}


function draw(){
    for (let x = 0; x < gridsize; x++) {
        for (let y = 0; y < gridsize; y++) {
            for (let z = 0; z < gridsize; z++) {

                draw_sphere(ofs(x),ofs(y),ofs(z),R);

            }
        }
    }
    scene.add(sphereGroup);
}

function change_random_sphere(how_many, how_often){
    let time = Date.now() % 100;
    if (time < randomSpeed){
        let num = Math.floor(Math.random()*gridsize*gridsize*gridsize)
        let sph = sphereGroup.children[num];
        sph.material.color.setRGB(Math.random(), Math.random(), Math.random());
        addToQueue(num);
        if(sizeOfQueue()>maxBalls){
            let old = removeFromQueue();
            if (sphereGroup.children[old]){
                sphereGroup.children[old].material.color.setRGB(0.8,0.1,0.1);
            }
        }
    }
}

function animate() {
    const speed = 1.0;
    requestAnimationFrame(animate);
    sphereGroup.rotation.y += rotationSpeed;
    rotationAngle += rotationSpeed;
    renderer.render(scene, camera);
    change_random_sphere(3,1.0);
}

const scene = new THREE.Scene();
const camera = cam(0,20,20);
const renderer = rend();

ambientLight(0.5);
aziz_light(10,10,0,1000);
aziz_light(-10,10,0,800);
aziz_light(-10,-10,-10,600);
draw();
animate();
