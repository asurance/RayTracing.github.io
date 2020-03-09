import { Camera } from './Core/Camera'
import { Sphere } from './Shape/Sphere'
import { Vector3 } from './Math/Vector3'
import { World } from './Object/World'
import { RTObject } from './Object/RTObject'
// import { Normal } from './Material/Normal';
// import { Pure } from './Material/Pure';
import { Reflect } from './Material/Reflect'
import { WIDTH, HEIGHT } from './global'

const canvas = document.createElement('canvas')
canvas.width = WIDTH
canvas.height = HEIGHT
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')!
const R = Math.cos(Math.PI / 4)
const world = new World([
    new RTObject(new Sphere(Vector3.Pool.create().set(R, 0, -1), R), new Reflect()),
    new RTObject(new Sphere(Vector3.Pool.create().set(-R, 0, -1), R), new Reflect()),
])
const camera = new Camera(Vector3.Pool.create().set(0, 0, 0), Vector3.Pool.create().set(0, 0, -1), Vector3.Pool.create().set(0, 1, 0),
    90, WIDTH, HEIGHT)
console.log('first render')
camera.render(world)
// console.log('second render');
// camera.render(world);
// console.log('third render');
// camera.render(world);
ctx.putImageData(camera.imageData, 0, 0)
