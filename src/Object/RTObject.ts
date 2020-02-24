import { Shape } from "../Shape/Shape";
import { Material } from "../Material/Material";

export class RTObject {
    shape: Shape
    mat: Material
    constructor(shape: Shape, mat: Material) {
        this.shape = shape;
        this.mat = mat;
    }
}