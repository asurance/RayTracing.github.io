import { RecyclablePool, RecyclableObj } from '../Core/RecyclePool';

export class Color implements RecyclableObj<Color> {
    static Pool = new RecyclablePool(Color, 'Color');
    r: number;
    g: number;
    b: number;
    constructor(r = 0, g = 0, b = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    reset(): this { this.r = this.g = this.b = 0; return this; }
    copy(another: Color): this {
        this.r = another.r;
        this.g = another.g;
        this.b = another.b;
        return this;
    }
    set(r: number, g: number, b: number): this {
        this.r = r;
        this.g = g;
        this.b = b;
        return this;
    }
    render(data: ImageData, u: number, v: number): void {
        const index = (v * data.width + u) << 2;
        data.data[index] = Math.floor(this.r * 255.99);
        data.data[index + 1] = Math.floor(this.g * 255.99);
        data.data[index + 2] = Math.floor(this.b * 255.99);
        data.data[index + 3] = 255;
    }
}