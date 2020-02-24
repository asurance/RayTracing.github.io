import { Material } from "./Material";
import { Color } from "../Math/Color";

export class Pure implements Material {
    private color: Color;
    constructor(color: Color) {
        this.color = color.clone();
    }

    scatter(): Color {
        return this.color.clone();
    }
}