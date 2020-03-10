import type { Material } from './Material'
import type { Ray } from '../Math/Ray'
import type { HitInfo } from '../Shape/HitInfo'
import type { Vector3 } from '../Math/Vector3'

export class Normal implements Material {
    scatter(ray: Ray, hitInfo: HitInfo): Vector3 {
        return hitInfo.normal.clone()
    }
}