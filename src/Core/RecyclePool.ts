export type RecyclableConstrutor<T> = new () => RecyclableObj<T>;

export interface RecyclableObj<T> {
    reset(): ThisType<RecyclableObj<T>>;
    clone(another: T): T;
}

export class RecyclablePool<T extends RecyclableObj<T>> {
    private pool: T[] = [];
    private template: new () => T;
    private tidyPool: T[] = [];
    private tidyLayer: number[] = [];
    private count = 0;
    private logCount = '';
    constructor(template: new () => T, logCount = '') {
        this.template = template
        this.logCount = logCount
    }
    create(): T {
        let obj = this.pool.pop()
        if (obj) {
            obj.reset()
        } else {
            obj = new this.template()
            if (this.logCount) {
                this.count++
                console.log(`${this.logCount}:${this.count}`)
            }
        }
        this.tidyLayer.length > 0 && this.tidyPool.push(obj)
        return obj
    }
    reUse(obj: T): void {
        this.pool.push(obj)
    }
    tidy(func: () => T, out = this.create()): T {
        this.tidyLayer.push(this.tidyPool.length)
        const result = func()
        out = result.clone(out)
        const length = this.tidyLayer.pop()!
        this.pool.push(...this.tidyPool.splice(length))
        this.tidyPool.length = 0
        return out
    }
}
