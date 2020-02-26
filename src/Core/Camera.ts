import { Vector3 } from '../Math/Vector3';
import { Ray } from '../Math/Ray';
import { render2Image } from '../Util';
import { World } from '../Object/World';
import { HitInfo } from '../Shape/HitInfo';

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
        const ray = Ray.Pool.create();
        ray.origin = this.origin.clone(ray.origin);
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                Vector3.Pool.reUse(ray.direction);
                ray.direction = Vector3.Pool.tidy(() =>
                    this.lowerLeftCorner.add(this.horizontal.multiScale(i / (this.width - 1)).add(this.vertical.multiScale(1 - j / (this.height - 1)))))
                ray.depth = 0;
                let result = world.hitTest(ray, hitInfo);
                while (result instanceof Ray) {
                    if (result.depth > 10) {
                        Ray.Pool.reUse(result);
                        result = Vector3.Pool.create().set(0, 0, 0);
                        break;
                    }
                    const next = world.hitTest(result, hitInfo);
                    Ray.Pool.reUse(result);
                    result = next;
                }
                render2Image(this.imageData, i, j, result);
                Vector3.Pool.reUse(result);
            }
        }
        Ray.Pool.reUse(ray);
        Vector3.Pool.reUse(hitInfo.position);
        Vector3.Pool.reUse(hitInfo.normal);
    }
}