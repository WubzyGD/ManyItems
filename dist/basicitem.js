"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicItem = void 0;
class BasicItem {
    constructor(name, id) {
        this._features = [];
        this.name = name;
        this._id = id;
    }
    addFeature(feature) {
        feature.applyTo(this);
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    get id() { return this._id; }
    get features() { return this._features; }
}
exports.BasicItem = BasicItem;
