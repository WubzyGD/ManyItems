"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = void 0;
class Feature {
    constructor(name, keyName) {
        this.hook = () => { };
        this.name = name;
        this.keyName = keyName;
    }
    applyTo(toApply) {
        toApply[this.keyName] = this;
        this.hook(this, toApply);
        return this;
    }
    async asyncApplyTo(toApply) {
        await this.hook(this, toApply);
        return this;
    }
    setHook(hook) {
        this.hook = hook;
        return this;
    }
}
exports.Feature = Feature;
