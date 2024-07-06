import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import { Sky } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader();

// Floortexture
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg");
const floorColorTexture = textureLoader.load(
  "./floor/textures/coast_sand_rocks_02_diff_1k.jpg"
);
const floorARMTexture = textureLoader.load(
  "./floor/textures/coast_sand_rocks_02_arm_1k.jpg"
);
const floorNormalTexture = textureLoader.load(
  "./floor/textures/coast_sand_rocks_02_nor_gl_1k.jpg"
);
const floorDisplacementTexture = textureLoader.load(
  "./floor/textures/coast_sand_rocks_02_disp_1k.jpg"
);
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;
// walltexture
const wallColorTexture = textureLoader.load(
  "./wall/textures/brick_wall_02_diff_1k.jpg"
);
const wallARMTexture = textureLoader.load(
  "./wall/textures/brick_wall_02_arm_1k.jpg"
);
const wallNormalTexture = textureLoader.load(
  "./wall/textures/brick_wall_02_nor_gl_1k.jpg"
);
wallColorTexture.colorSpace = THREE.SRGBColorSpace;
// rooftexture
const roofColorTexture = textureLoader.load(
  "./roof/textures/roof_07_diff_1k.jpg"
);
const roofARMTexture = textureLoader.load("./roof/textures/roof_07_arm_1k.jpg");
const roofNormalTexture = textureLoader.load(
  "./roof/textures/roof_07_nor_gl_1k.jpg"
);
roofColorTexture.colorSpace = THREE.SRGBColorSpace;
roofColorTexture.repeat.set(3, 1);
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.repeat.set(3, 1);
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.repeat.set(3, 1);
roofNormalTexture.wrapS = THREE.RepeatWrapping;

// bushtexture
const bushColorTexture = textureLoader.load(
  "./bush/textures/forest_leaves_02_diffuse_1k.jpg"
);
const bushARMTexture = textureLoader.load(
  "./bush/textures/forest_leaves_02_arm_1k.jpg"
);
const bushNormalTexture = textureLoader.load(
  "./bush/textures/forest_leaves_02_nor_gl_1k.jpg"
);
bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.repeat.set(2, 1);
bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.repeat.set(2, 1);
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.repeat.set(2, 1);
bushNormalTexture.wrapS = THREE.RepeatWrapping;

// gravetexture
const graveColorTexture = textureLoader.load(
  "./grave/textures/rock_boulder_cracked_diff_1k.jpg"
);
const graveARMTexture = textureLoader.load(
  "./grave/textures/rock_boulder_cracked_arm_1k.jpg"
);
const graveNormalTexture = textureLoader.load(
  "./grave/textures/rock_boulder_cracked_nor_gl_1k.jpg"
);
graveColorTexture.colorSpace = THREE.SRGBColorSpace;
graveColorTexture.repeat.set(2, 1);
graveColorTexture.wrapS = THREE.RepeatWrapping;
graveARMTexture.repeat.set(2, 1);
graveARMTexture.wrapS = THREE.RepeatWrapping;
graveNormalTexture.repeat.set(2, 1);
graveNormalTexture.wrapS = THREE.RepeatWrapping;

// doortexture
const doorColorTexture = textureLoader.load("./door/color.jpg");
const doorAlphaTexture = textureLoader.load("./door/alpha.jpg");
const doorambientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./door/height.jpg");
const doorMetalnessTexture = textureLoader.load("./door/metalness.jpg");
const doorNormalTexture = textureLoader.load("./door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("./door/roughness.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
/**
 * House
 */
const houseMeasurements = {
  width: 4,
  height: 2.5,
  depth: 4,
  roof: {
    radius: 4,
    height: 2,
    radialSegments: 4,
  },
  door: {
    width: 1.8,
    height: 2,
    widthSegments: 100,
    heightSegments: 100,
  },
  bush: {
    radius: 1,
    widthSegments: 16,
    heightSegments: 16,
  },
};

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30, 20, 20),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// gui
//   .add(floor.material, "displacementScale")
//   .min(0)
//   .max(1)
//   .step(0.001)
//   .name("floorDisplacementScale");
// gui
//   .add(floor.material, "displacementBias")
//   .min(-1)
//   .max(1)
//   .step(0.001)
//   .name("floorDisplacementBias");

// Group - house container
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(
    houseMeasurements.width,
    houseMeasurements.height,
    houseMeasurements.depth
  ),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
);
walls.position.y = houseMeasurements.height / 2;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(
    houseMeasurements.roof.radius,
    houseMeasurements.roof.height,
    houseMeasurements.roof.radialSegments
  ),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
);

roof.rotation.y = Math.PI / 4;
roof.position.y = houseMeasurements.roof.height / 2 + houseMeasurements.height;
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(
    houseMeasurements.door.width,
    houseMeasurements.door.height,
    houseMeasurements.door.widthSegments,
    houseMeasurements.door.heightSegments
  ),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorambientOcclusionTexture,
    displacementMap: doorHeightTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture,
    normalMap: doorNormalTexture,
    displacementScale: 0.2,
  })
);
door.position.y = houseMeasurements.door.height / 2 - 0.1;
door.position.z = houseMeasurements.width / 2 - 0.04;

house.add(door);

// bushes
const bushGeometry = new THREE.SphereGeometry(
  houseMeasurements.bush.radius,
  houseMeasurements.bush.widthSegments,
  houseMeasurements.bush.heightSegments
);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
});
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(3, houseMeasurements.bush.radius - 1, 3);
bush1.rotation.x = -0.75;
// bush1.position.x = 3;bush1.position.y = 0.5;bush1.position.z = 3;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.5, 0.5, 0.5);
bush2.position.set(-2, houseMeasurements.bush.radius - 1, -5);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.8, 0.8, 0.8);
bush3.position.set(-1.5, houseMeasurements.bush.radius - 1, -5);
bush3.rotation.x = -0.75;

house.add(bush1, bush2, bush3);

// Grave
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});
const graves = new THREE.Group();
for (let i = 0; i < 31; i++) {
  const angle = Math.random() * Math.PI * 2;
  let graveRadius = 4 + Math.random(0.2, 0.3) * 10;
  const graveX = Math.sin(angle) * graveRadius;
  const graveY = Math.random() * 0.4;
  const graveZ = Math.cos(angle) * graveRadius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(graveX, graveY, graveZ);
  grave.rotation.x = Math.random() - 0.5;
  grave.rotation.y = Math.random() - 0.5;

  graves.add(grave);
}
scene.add(graves);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.2);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door Light
const doorLight = new THREE.PointLight("#ff7dcc", 5);
doorLight.position.set(0, 2.4, 2.5);
house.add(doorLight);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#88ccff", 6);
const ghost3 = new THREE.PointLight("#00eeff", 6);
scene.add(ghost1, ghost2, ghost3);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 15;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
/**
 * Shadow
 */
// Renderer

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.castShadow = true;

for (const grave of graves.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}

// Mapping
directionalLight.shadow.mapSize.set(256, 256);
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.set(256, 256);
ghost1.shadow.camera.far = 10;
ghost2.shadow.mapSize.set(256, 256);
ghost2.shadow.camera.far = 10;
ghost3.shadow.mapSize.set(256, 256);
ghost3.shadow.camera.far = 10;

/**
 * Sky
 */
const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);
/**
 * Fog
 */
scene.fog = new THREE.FogExp2("#02343f", 0.05);
/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();
  // Ghost
  const ghost1Angle = elapsedTime * 0.2;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y =
    Math.sin(ghost1Angle * 1.23) * Math.tan(ghost1Angle * 2.22);
  const ghost2Angle = -elapsedTime;
  ghost2.position.x = Math.cos(ghost2Angle) * 6;
  ghost2.position.z = Math.sin(ghost2Angle) * 8;
  ghost2.position.y =
    Math.sin(ghost2Angle * 1.35) * Math.sin(ghost2Angle * 2.65);

  const ghost3Angle = elapsedTime * 0.6;
  ghost3.position.x = Math.cos(ghost3Angle) * 6.2;
  ghost3.position.z = Math.sin(ghost3Angle) * 5.1;
  ghost3.position.y =
    Math.sin(ghost3Angle * 3.24) * Math.cos(ghost3Angle * 2.65);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
