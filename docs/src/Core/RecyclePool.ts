export type RecyclableConstrutor<T> = new () => RecyclableObj<T>;

export interface RecyclableObj<T> {
    reset(): ThisType<RecyclableObj<T>>;
    copy(another: T): ThisType<RecyclableObj<T>>;
}

export class RecyclablePool<T extends RecyclableObj<T>> {
    private pool: T[] = [];
    private template: new () => T;
    private tidyPool: T[] = [];
    private isTidy = false;
    private count = 0;
    private logCount = '';
    constructor(template: new () => T, logCount = '') {
        this.template = template;
        this.logCount = logCount;
    }
    create(): T {
        let obj = this.pool.pop();
        if (obj) {
            obj.reset();
        } else {
            obj = new this.template();
            if (this.logCount) {
                this.count++;
                console.log(`${this.logCount}:${this.count}`);
            }
        }
        this.isTidy && this.tidyPool.push(obj);
        return obj;
    }
    reUse(obj: T): void {
        this.pool.push(obj);
    }
    tidy(func: () => T, out = this.create()): T {
        this.isTidy = true;
        const result = func();
        this.isTidy = false;
        out.copy(result);
        this.pool.push(...this.tidyPool);
        this.tidyPool.length = 0;
        return out;
    }
}
