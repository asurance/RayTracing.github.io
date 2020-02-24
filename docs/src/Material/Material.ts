import { Ray } from "../Math/Ray";
import { HitInfo } from "../Shape/HitInfo";
import { Color } from "../Math/Color";

export interface Material {
    scatter(ray: Ray, hitInfo: HitInfo): Color;
}