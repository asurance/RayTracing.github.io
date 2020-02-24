import { Vector3 } from '../Math/Vector3';
import { Ray } from '../Math/Ray';
import { Shape } from './Shape';
import { HitInfo } from './HitInfo';

export class Sphere implements Shape {
    center: Vector3
    radius: number
    constructor(center: Vector3, radius: number) {
        this.center = center;
        this.radius = radius;
    }
    hitTest(ray: Ray, min: number, max: number, hitInfo: HitInfo): boolean {
        const oc = Vector3.Pool.tidy(() => ray.origin.add(this.center.multiScale(-1)));
        const a = ray.direction.sqauredLength();
        const b = oc.dot(ray.direction);
        const c = oc.sqauredLength() - this.radius * this.radius;
        Vector3.Pool.reUse(oc);
        const discriminant = b * b - a * c;
        if (discriminant) {
            const sqrt = Math.sqrt(b * b - a * c);
            let temp = (-b - sqrt) / a;
            if (temp < max && temp > min) {
                hitInfo.t = temp;
                hitInfo.position = ray.getPointAtT(temp, hitInfo.position);
                hitInfo.normal = Vector3.Pool.tidy(() => hitInfo.position.add(this.center.multiScale(-1)).multiScale(1 / this.radius), hitInfo.normal);
                return true;
            }
            temp = (-b + sqrt) / a;
            if (temp < max && temp > min) {
                hitInfo.t = temp;
                hitInfo.position = ray.getPointAtT(temp, hitInfo.position);
                hitInfo.normal = Vector3.Pool.tidy(() => hitInfo.position.add(this.center.multiScale(-1)).multiScale(1 / this.radius), hitInfo.normal);
                return true;
            }
        }
        return false;
    }
}