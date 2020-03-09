import { Vector3 } from './Vector3'
import { RecyclableObj, RecyclablePool } from '../Core/RecyclePool'

export class Ray implements RecyclableObj<Ray> {
    static Pool = new RecyclablePool<Ray>(Ray, 'Ray');
    origin: Vector3;
    direction: Vector3;
    depth = 0;
    constructor(origin = Vector3.Pool.create(), direction = Vector3.Pool.create(), depth = 0) {
        this.origin = origin
        this.direction = direction
        this.depth = depth
    }
    set(origin: Vector3, direction: Vector3, depth = 0): this {
        this.origin = origin
        this.direction = direction
        this.depth = depth
        return this
    }
    reset(): this {
        this.origin.reset()
        this.direction.reset()
        return this
    }
    clone(out: Ray = Ray.Pool.create()): Ray {
        out.origin = this.origin.clone(out.origin)
        out.direction = this.direction.clone(out.direction)
        return out
    }
    getPointAtT(t: number, out = Vector3.Pool.create()): Vector3 {
        return Vector3.Pool.tidy(() => this.origin.add(this.direction.multiScale(t)), out)
    }
}