import { Ray } from '../Math/Ray';
import { HitInfo } from '../Shape/HitInfo';
import { RTObject } from './RTObject';
import { Color } from '../Math/Color';

export class World {
    private objs: RTObject[];
    constructor(objs: RTObject[]) {
        this.objs = objs;
    }
    hitTest(ray: Ray, hitInfo: HitInfo): Color {
        let hitIndex: number | null = null;
        let nearT = Infinity;
        this.objs.forEach((obj, i) => {
            if (obj.shape.hitTest(ray, 0, nearT, hitInfo)) {
                hitIndex = i;
                nearT = hitInfo.t;
            }
        });
        if (hitIndex !== null) {
            const hitObj = this.objs[hitIndex];
            return hitObj.mat.scatter(ray, hitInfo);
        } else {
            return Color.Pool.create().set(0, 0, 0);
        }
    }
}