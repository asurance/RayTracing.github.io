import { Vector3 } from './Math/Vector3'

export function render2Image(data: ImageData, u: number, v: number, color: Vector3): void {
    const index = (v * data.width + u) << 2
    data.data[index] = Math.floor(color.x * 255.99)
    data.data[index + 1] = Math.floor(color.y * 255.99)
    data.data[index + 2] = Math.floor(color.z * 255.99)
    data.data[index + 3] = 255
}