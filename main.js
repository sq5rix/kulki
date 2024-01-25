import * as THREE from 'three';

const gridsize = 5;

function aziz_light(x,y,z){
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(x, y, z);
    light.castShadow = true;
    light.intensity = 1;
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
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        metalness: 0.9,
        roughness: 0.1
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);
}

function draw(){
    for (let x = 0; x < gridsize; x++) {
        for (let y = 0; y < gridsize; y++) {
            for (let z = 0; z < gridsize; z++) {

                draw_sphere(x,y,z,1);

            }
        }
    }

}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

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

const renderer = rend();
camera.position.z = 8;

ambientLight(0.1);
aziz_light(10,10,0);
aziz_light(-10,10,0);
aziz_light(-10,-10,-10);
//draw();
draw_sphere(0,0,0,2);
animate();
