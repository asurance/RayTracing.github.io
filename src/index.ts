import { global } from './global';
import { Camera } from './Core/Camera';
import { Sphere } from './Shape/Sphere';
import { Vector3 } from './Math/Vector3';
import { World } from './Object/World';
import { HitInfo } from './Shape/HitInfo';
import { RTObject } from './Object/RTObject';
import { Normal } from './Material/Normal';

const canvas = document.createElement('canvas');
canvas.width = global.WIDTH;
canvas.height = global.HEIGHT;
document.body.appendChild(canvas);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ctx = canvas.getContext('2d')!;
const normal = new Normal();
const world = new World([
    new RTObject(new Sphere(Vector3.Pool.create().set(0, 0, -1), 0.5), normal)
]);
const camera = new Camera(Vector3.Pool.create().set(0, 0, 0), Vector3.Pool.create().set(0, 0, -1), Vector3.Pool.create().set(0, 1, 0),
    90, global.WIDTH, global.HEIGHT);
const hitInfo: HitInfo = {
    t: 0,
    position: Vector3.Pool.create(),
    normal: Vector3.Pool.create(),
};
camera.render((ray) => {
    return world.hitTest(ray, hitInfo);
});
ctx.putImageData(camera.imageData, 0, 0);
