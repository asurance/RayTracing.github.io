import { Vector3 } from '../Math/Vector3';
import { Ray } from '../Math/Ray';
import { render2Image } from '../Util';
import { World } from '../Object/World';
import { HitInfo } from '../Shape/HitInfo';


function log(obj: Vector3 | Ray): void {
    if (obj instanceof Ray) {
        console.log(`origin:${obj.origin},direction:${obj.direction}`)
    } else {
        console.log(obj.toString())
    }
}
export class Camera {
    origin: Vector3;
    width: number;
    height: number;
    imageData: ImageData;
    lowerLeftCorner: Vector3;
    horizontal: Vector3;
    vertical: Vector3;
    constructor(from: Vector3, to: Vector3, up: Vector3, fov: number, width: number, height: number) {
        this.origin = from;
        this.width = width;
        this.height = height;
        this.imageData = new ImageData(width, height);
        const theta = fov * Math.PI / 180;
        const halfHeight = Math.tan(theta / 2);
        const halfWidth = width / height * halfHeight;
        const w = Vector3.Pool.tidy(() => from.add(to.multiScale(-1)).normalize());
        const u = Vector3.Pool.tidy(() => up.cross(w).normalize());
        const v = w.cross(u);
        this.lowerLeftCorner = Vector3.Pool.tidy(() => this.origin.add(u.multiScale(halfWidth).add(v.multiScale(halfHeight)).add(w).multiScale(-1)));
        this.horizontal = u.multiScale(2 * halfWidth);
        this.vertical = v.multiScale(2 * halfHeight);
    }
    render(world: World): void {
        const hitInfo: HitInfo = {
            t: 0,
            position: Vector3.Pool.create(),
            normal: Vector3.Pool.create(),
        }
        const ray = new Ray(this.origin, Vector3.Pool.create());
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                const flag = i === 83 && j === 49
                Vector3.Pool.reUse(ray.direction);
                ray.direction = Vector3.Pool.tidy(() =>
                    this.lowerLeftCorner.add(this.horizontal.multiScale(i / (this.width - 1)).add(this.vertical.multiScale(1 - j / (this.height - 1)))));
                ray.depth = 0;
                let result = world.hitTest(ray, hitInfo);
                flag && log(result)
                while (result instanceof Ray) {
                    if (result.depth > 10) {
                        result = Vector3.Pool.create().set(0, 0, 0);
                        break;
                    }
                    result = world.hitTest(result, hitInfo);
                    if (result instanceof Vector3 && (result.x !== 0 || result.y !== 0 || result.z !== 0)) {
                        console.log(`${i},${j}`)
                    }
                    flag && log(result)
                }
                render2Image(this.imageData, i, j, result);
                Vector3.Pool.reUse(result);
            }
        }
        Vector3.Pool.reUse(ray.direction);
    }
}