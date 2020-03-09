import { Material } from './Material'
import { Ray } from '../Math/Ray'
import { HitInfo } from '../Shape/HitInfo'
import { Vector3 } from '../Math/Vector3'

export class Normal implements Material {
    scatter(ray: Ray, hitInfo: HitInfo): Vector3 {
        return hitInfo.normal.clone()
    }
}