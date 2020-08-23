"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attack = void 0;
class Attack {
    constructor(name, baseInfo, mods, castText) {
        this.name = name;
        this.baseInfo = baseInfo;
        if (!Array.isArray(mods)) {
            mods = [mods];
        }
        this.mods = mods;
        this.castText = castText;
    }
    get attack() {
        let results = {};
        let damage = 0;
        damage += this.baseInfo.baseDamage;
        return results;
    }
}
exports.Attack = Attack;
