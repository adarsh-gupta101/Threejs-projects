import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
import fragment from './shaders/fragment.glsl?raw'
import vertex from './shaders/vertex.glsl?raw'
import t1 from '../elon.jpg'
import t2 from '../star.jpg'
import { Raycaster } from 'three'

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.PlaneBufferGeometry(1000,1000,10,10)
const geometry = new THREE.BufferGeometry()

let number = 512 * 512
const textures = [
  new THREE.TextureLoader().load(t1),
  new THREE.TextureLoader().load(t2),
]


let mask=new THREE.TextureLoader().load(t2)




window.addEventListener("mousewheel",(e)=>{
  console.log(e.wheelDeltaY);
  move+=e.wheelDeltaY*0.0001
})

// Materials

const positions = new THREE.BufferAttribute(new Float32Array(number * 3), 3)
let coordinates = new THREE.BufferAttribute(new Float32Array(number * 3), 3)
let speeds = new THREE.BufferAttribute(new Float32Array(number ), 1)
let offsets = new THREE.BufferAttribute(new Float32Array(number ), 1)
// const material = new THREE.MeshNormalMaterial({doubleSided: true});
const material = new THREE.ShaderMaterial({
  fragmentShader: fragment,
  vertexShader: vertex,
  uniforms: {
    progress: { type: 'f',value: 0.0 },
    t1: { type: 't', value: textures[0] },
    t2: { type: 't', value: textures[1] },
    mask:{type:'t',value: mask},
    move:{type:'f',value: 0.0},
    time: { type: 'f', value: 0.0 },
  },
  side: THREE.DoubleSide,
})

material.transparent = true
material.depthTest = false
material.depthWrite = false
// material.wireframe = true
// // console.log(positions)
function rand(a,b){
  return a+Math.random()*(b-a)
}
let index = 0
let time=0,move=0;
for (let i = 0; i < 512; i++) {
  let posX = i - 256
  for (let j = 0; j < 512; j++) {
    positions.setXYZ(index , 2*posX, (j-256) * 2, 0)
    coordinates.setXYZ(index, i, j, 0)
offsets.setX(index,rand(-1000,1000))
    speeds.setX(index,rand(0.04,0.1))
    index++
  }
}
console.log(positions)

geometry.setAttribute('position', positions)
geometry.setAttribute('aCoordinates', coordinates)
geometry.setAttribute('aSpeed', speeds)
geometry.setAttribute('aOffset', offsets)
// //material.color = new THREE.Color(0xffff00);

// // Mesh
const sphere = new THREE.Points(geometry, material)
scene.add(sphere)

// Create a cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
)
cube.position.set(5, 0, 0)
// scene.add(cube)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.9)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  camera.position.z = 2

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  3000,
)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1000
scene.add(camera)

// // gui add camera position
// gui.add(camera.position, 'x').min(-300).max(300).step(10)
// gui.add(camera.position, 'y').min(-300).max(300).step(10)
// gui.add(camera.position, 'z').min(-3000).max(3000).step(100)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  // sphere.rotation.y = 0.5 * elapsedTime;
  // sphere.rotation.x = 0.5 * elapsedTime;
  // sphere.rotation.z = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()
  material.uniforms.time.value = elapsedTime
  material.uniforms.move.value = move
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
