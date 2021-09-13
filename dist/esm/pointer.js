// pointer address of var
export class Pointer {
    constructor() {
        this.valueContainer = [];
    }
    static of(value) {
        const pointer = new Pointer();
        pointer.valueContainer[0] = value;
        return pointer;
    }
    static empty() {
        return new Pointer();
    }
    get() {
        return this.valueContainer[0];
    }
    assign(value) {
        this.valueContainer[0] = value;
    }
}
