import { Material } from "./Material";
import { Ray } from "../Math/Ray";
import { HitInfo } from "../Shape/HitInfo";
import { Vector3 } from "../Math/Vector3";

export class Reflect implements Material {
    scatter(ray: Ray, hitInfo: HitInfo): Ray | Vector3 {
        if (ray.direction.dot(hitInfo.normal) >= 0) {
            return Vector3.Pool.create().set(0, 0, 0);
        } else {
            const reflected = Ray.Pool.create();
            reflected.set(hitInfo.position.clone(reflected.origin), Vector3.Pool.tidy(() => {
                return ray.direction.normalize().reflect(hitInfo.normal);
            }, reflected.direction), ray.depth + 1)
            return reflected;
        }
    }
}