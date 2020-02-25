import { Vector3 } from '../Math/Vector3';
import { Ray } from '../Math/Ray';
import { render2Image } from '../Util';

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
    render(rayFunc: (ray: Ray) => Vector3): void {
        const ray = new Ray(this.origin, Vector3.Pool.create());
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                Vector3.Pool.reUse(ray.direction);
                ray.direction = Vector3.Pool.tidy(() =>
                    this.lowerLeftCorner.add(this.horizontal.multiScale(i / (this.width - 1)).add(this.vertical.multiScale(1 - j / (this.height - 1)))));
                ray.u = i;
                ray.v = j;
                const color = rayFunc(ray);
                render2Image(this.imageData, i, j, color);
                Vector3.Pool.reUse(color);
            }
        }
        Vector3.Pool.reUse(ray.direction);
    }
}