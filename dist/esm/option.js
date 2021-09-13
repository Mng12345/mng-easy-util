export class Option {
    constructor(value) {
        this.value = value;
    }
    hasValue() {
        return this.value !== undefined && this.value !== null;
    }
}
