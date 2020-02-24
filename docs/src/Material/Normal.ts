import { Material } from "./Material";
import { Ray } from "../Math/Ray";
import { HitInfo } from "../Shape/HitInfo";
import { Color } from "../Math/Color";

export class Normal implements Material {
    scatter(ray: Ray, hitInfo: HitInfo): Color {
        return Color.Pool.create().set(hitInfo.normal.x, hitInfo.normal.y, hitInfo.normal.z);
    }
}