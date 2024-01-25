import * as THREE from 'three';

function aziz_light(x,y,z){
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(x, y, z);
    scene.add(light);
}

function draw_sphere(x,y,z,r){
    const geometry = new THREE.SphereGeometry(r, 32, 32);
    //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        metalness: 0.3,
        roughness: 0.5
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    scene.add(sphere);
}

function draw(x,y,z){
    const geometry = new THREE.BoxGeometry( x, y, z );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

aziz_light(10,10,20);
draw_sphere(1,1,1,1);
animate();
