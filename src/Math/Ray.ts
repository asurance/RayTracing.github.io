import { Vector3 } from './Vector3';

export class Ray {
    origin: Vector3;
    direction: Vector3;
    depth = 0;
    constructor(origin: Vector3, direction: Vector3, depth = 0) {
        this.origin = origin;
        this.direction = direction;
        this.depth = depth;
    }
    getPointAtT(t: number, out = Vector3.Pool.create()): Vector3 {
        return Vector3.Pool.tidy(() => this.origin.add(this.direction.multiScale(t)), out);
    }
}