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
    ;
    add(...effects) {
        arrayinput_1.ArrayInput.makeArray(effects).forEach((effect) => {
            if (this.effects.has(effect.id)) {
                this.effects.get(effect.id).addOne();
            }
            else {
                const managedEffect = new ManagedEffect(effect);
                if (this.defaultCountUpdateEvent) {
                    managedEffect.on("countUpdate", this.defaultCountUpdateEvent);
                }
                if (this.defaultDepletedEvent) {
                    managedEffect.on("depleted", this.defaultDepletedEvent);
                }
                this.effects.set(effect.id, managedEffect);
                this.emit('add', managedEffect);
            }
        });
        return this;
    }
    ;
    addMult(effects) {
        effects.forEach(effect => this.add(effect));
        return this;
    }
    ;
    get(effectid) {
        return this.effects.get(effectid);
    }
    ;
    remove(effectid) {
        effectid = effectid instanceof ManagedEffect ? effectid.effect.id : typeof effectid === 'string' ? effectid : effectid.id;
        if (!this.effects.has(effectid)) {
            throw new util_1.ValueError(`EffectManagerValueError: "${effectid}" is not a valid effect id in this effect manager's managed effects.`);
        }
        let toDelete = this.effects.get(effectid);
        this.effects.delete(effectid);
        this.emit('remove', toDelete);
        return this;
    }
    ;
    replace(effect) {
        let tr = effect instanceof ManagedEffect ? effect : new ManagedEffect(effect);
        if (!this.effects.has(tr.effect.id)) {
            return this.add(tr.effect);
        }
        this.remove(tr);
        this.add(tr.effect);
        return this;
    }
    ;
    getEffects() {
        let nm = new Map();
        Array.from(this.effects.keys()).forEach(e => nm.set(e, this.effects.get(e)));
        return structuredClone(this.effects);
    }
    ;
    setDefaultCountUpdateEvent(eventHandler) {
        this.defaultCountUpdateEvent = eventHandler;
        return this;
    }
    ;
    setDefaultDepletedEvent(eventHandler) {
        this.defaultDepletedEvent = eventHandler;
        return this;
    }
    ;
    get staticEffects() {
        return this.getEffects();
    }
    ;
}
exports.EffectManager = EffectManager;
class ManagedEffect extends tsee_1.EventEmitter {
    constructor(effect, count) {
        super();
        this._count = 1;
        this._depleted = false;
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
    removeOne() {
        this.count -= 1;
        return this;
    }
    ;
    removeAll() {
        this.count = 0;
        return this;
    }
    ;
    deplete() { return this.removeAll(); }
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
            if (!this._depleted) {
                this._depleted = true;
                this.emit('depleted', this);
            }
        }
    }
    get depleted() {
        return this._depleted;
    }
}
exports.ManagedEffect = ManagedEffect;
