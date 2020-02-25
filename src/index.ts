import { global } from './global';
import { Camera } from './Core/Camera';
import { Sphere } from './Shape/Sphere';
import { Vector3 } from './Math/Vector3';
import { World } from './Object/World';
import { RTObject } from './Object/RTObject';
import { Normal } from './Material/Normal';
// import { Pure } from './Material/Pure';
import { Reflect } from './Material/Reflect';

const canvas = document.createElement('canvas');
canvas.width = global.WIDTH;
canvas.height = global.HEIGHT;
document.body.appendChild(canvas);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ctx = canvas.getContext('2d')!;
const R = Math.cos(Math.PI / 4);
const world = new World([
    new RTObject(new Sphere(Vector3.Pool.create().set(R, 0, -1), R), new Normal()),
    // new RTObject(new Sphere(Vector3.Pool.create().set(R, 0, -1), R), new Pure(Vector3.Pool.create().set(1, 1, 1))),
    new RTObject(new Sphere(Vector3.Pool.create().set(-R, 0, -1), R), new Reflect()),
]);
const camera = new Camera(Vector3.Pool.create().set(0, 0, 0), Vector3.Pool.create().set(0, 0, -1), Vector3.Pool.create().set(0, 1, 0),
    90, global.WIDTH, global.HEIGHT);
camera.render(world);
ctx.putImageData(camera.imageData, 0, 0);
