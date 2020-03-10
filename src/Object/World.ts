import type { Ray } from '../Math/Ray'
import type { HitInfo } from '../Shape/HitInfo'
import type { RTObject } from './RTObject'
import { Vector3 } from '../Math/Vector3'

export class World {
    private objs: RTObject[];
    constructor(objs: RTObject[]) {
        this.objs = objs
    }
    hitTest(ray: Ray, hitInfo: HitInfo): Vector3 | Ray {
        let hitIndex: number | null = null
        let nearT = Infinity
        this.objs.forEach((obj, i) => {
            if (obj.shape.hitTest(ray, 1e-10, nearT, hitInfo)) {
                hitIndex = i
                nearT = hitInfo.t
            }
        })
        if (hitIndex !== null) {
            const hitObj = this.objs[hitIndex]
            return hitObj.mat.scatter(ray, hitInfo)
        } else {
            return Vector3.Pool.create().set((ray.direction.y + 2) / 3, (ray.direction.y + 1) / 2, (ray.direction.y + 3) / 4)
        }
    }
}