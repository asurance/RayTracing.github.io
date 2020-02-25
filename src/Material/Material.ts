import { Ray } from "../Math/Ray";
import { HitInfo } from "../Shape/HitInfo";
import { Vector3 } from "../Math/Vector3";

export interface Material {
    scatter(ray: Ray, hitInfo: HitInfo): Vector3 | Ray;
}