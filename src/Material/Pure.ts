import type { Material } from './Material'
import type { Vector3 } from '../Math/Vector3'

export class Pure implements Material {
    private color: Vector3;
    constructor(color: Vector3) {
        this.color = color.clone()
    }

    scatter(): Vector3 {
        return this.color.clone()
    }
}