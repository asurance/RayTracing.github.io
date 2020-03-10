import type { Ray } from '../Math/Ray'
import type { HitInfo } from '../Shape/HitInfo'
import type { Vector3 } from '../Math/Vector3'

export interface Material {
    scatter(ray: Ray, hitInfo: HitInfo): Vector3 | Ray;
}