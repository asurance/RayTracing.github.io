import { Vector3 } from '../Math/Vector3'

export interface HitInfo {
    t: number;
    position: Vector3;
    normal: Vector3;
}