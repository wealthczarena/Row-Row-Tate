"use strict";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

// Setting up a scene
const scene = new THREE.Scene();

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Settng up a camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000
);
// Giving the camera a position
camera.position.z = 5;

// Setting up a renderer
const canvas = document.querySelector("#app");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Creating meshes
const meshAGeo = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
const meshAMat = new THREE.MeshNormalMaterial({ wireframe: true });
const meshA = new THREE.Mesh(meshAGeo, meshAMat);

const meshBGeo = new THREE.SphereGeometry(0.7, 30, 22);
const meshBMat = new THREE.MeshNormalMaterial({ wireframe: true });
const meshB = new THREE.Mesh(meshBGeo, meshBMat);

// Setting the position of where I want meshA to rotate around on meshB
meshB.position.set(0, 0, 0);

// Establishing a parent-child relationship
meshB.add(meshA);

// Adding meshB to the scene
scene.add(meshB);

// Adding Lights
const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(50, 50, 50);
scene.add(light);

// Setting Orbit Controls
const controls = new OrbitControls(camera, canvas);

// Resizing the canvas
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const radius = 2; // Setting radius for orbit distance
const orbitSpeed = 0.0005; // Setting orbit speed

// Setting animation
function animate() {
  requestAnimationFrame(animate);

  const angle = Date.now() * orbitSpeed;
  meshA.position.x = Math.cos(angle) * radius;
  meshA.position.z = Math.sin(angle) * radius;

  renderer.render(scene, camera);
}
animate();

// Animating the h1
const tl = gsap.timeline({ defaults: { duration: 2 } });
tl.fromTo("h1", { y: "-100%" }, { y: "0%" });
