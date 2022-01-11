"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedEffect = exports.EffectManager = void 0;
const tsee_1 = require("tsee");
const arrayinput_1 = require("../../util/dev/arrayinput");
const util_1 = require("../../util/dev/errors/util");
const structuredClone = require('realistic-structured-clone');
class EffectManager extends tsee_1.EventEmitter {
    constructor(effects) {
        super();
        this.effects = new Map();
        if (effects) {
            effects.forEach(effect => this.add(effect));
        }
    }
    add(...effects) {
        arrayinput_1.ArrayInput.makeArray(effects).forEach((effect) => {
            const managedEffect = new ManagedEffect(effect);
            if (this.defaultCountUpdateEvent) {
                managedEffect.on("countUpdate", this.defaultCountUpdateEvent);
            }
            this.effects.set(effect.name, managedEffect);
            this.emit('add', managedEffect);
        });
        return this;
    }
    addMult(effects) {
        effects.forEach(effect => this.add(effect));
        return this;
    }
    get(effectName) {
        return this.effects.get(effectName);
    }
    remove(effectName) {
        if (!this.effects.has(effectName)) {
            throw new util_1.ValueError(`EffectManagerValueError: "${effectName}" is not a valid effect name in this effect manager's managed effects.`);
        }
        let toDelete = this.effects.get(effectName);
        this.effects.delete(effectName);
        this.emit('remove', toDelete);
        return this;
    }
    getEffects() {
        let nm = new Map();
        Array.from(this.effects.keys()).forEach(e => nm.set(e, this.effects.get(e)));
        return structuredClone(this.effects);
    }
    setDefaultCountUpdateEvent(eventHandler) {
        this.defaultCountUpdateEvent = eventHandler;
        return this;
    }
    get staticEffects() {
        return this.getEffects();
    }
}
exports.EffectManager = EffectManager;
class ManagedEffect extends tsee_1.EventEmitter {
    constructor(effect, count) {
        super();
        this._count = 1;
        this.effect = effect;
        this._count = count || this._count;
    }
    ;
    setCount(count) {
        this.count = count;
        return this;
    }
    ;
    add(count) {
        this.count += count;
        return this;
    }
    ;
    addOne() {
        this.count += 1;
        return this;
    }
    ;
    remove(count) {
        this.count -= count;
        return this;
    }
    ;
    removeOne(count) {
        this.count -= 1;
        return this;
    }
    ;
    removeAll(count) {
        this.count = 0;
        return this;
    }
    ;
    get count() {
        return this._count;
    }
    ;
    set count(count) {
        this._count = count;
        this.emit('countUpdate', this);
        if (this._count <= 0) {
            this._count = 0;
            this.emit('depleted', this);
        }
    }
}
exports.ManagedEffect = ManagedEffect;
