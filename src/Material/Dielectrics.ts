import type { Material } from './Material'
import { Vector3 } from '../Math/Vector3'
import { Ray } from '../Math/Ray'
import type { HitInfo } from '../Shape/HitInfo'

export class Dielectrics implements Material {
    constructor(private n: number) { }
    scatter(ray: Ray, hitinfo: HitInfo): Vector3 | Ray {
        let normal = Vector3.Pool.create()
        let n = this.n
        if (ray.direction.dot(hitinfo.normal) > 0) {
            normal = hitinfo.normal.multiScale(-1, normal)
        } else {
            normal = hitinfo.normal.clone(normal)
            n = 1 / n
        }
        const refract = ray.direction.refract(normal, n)
        Vector3.Pool.reUse(normal)
        if (refract) {
            const refracted = Ray.Pool.create()
            refracted.set(hitinfo.position.clone(refracted.origin), refract.clone(refracted.direction), ray.depth + 1)
            Vector3.Pool.reUse(refract)
            return refracted
        } else {
            const reflected = Ray.Pool.create()
            reflected.set(hitinfo.position.clone(reflected.origin), Vector3.Pool.tidy(() => {
                return ray.direction.reflect(hitinfo.normal)
            }, reflected.direction), ray.depth + 1)
            return reflected
        }
    }
}