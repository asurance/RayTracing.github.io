import type { Ray } from '../Math/Ray'
import type { HitInfo } from './HitInfo'

export interface Shape {
    hitTest(ray: Ray, min: number, max: number, info: HitInfo): boolean;
}