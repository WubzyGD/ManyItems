"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifiableManagedEffect = exports.ManagedEffect = exports.UnmodifiableEffectManager = exports.ModifiableEffectManager = exports.EffectManager = void 0;
const effect_1 = require("./effect");
const util_1 = require("../../util/errors/util");
class EffectManager {
    constructor(effects) {
        this.all = new Map();
        this.effects = new Map();
        if (effects) {
            effects.forEach(effect => this.add(effect));
        }
    }
    add(effect, asModifiable) {
        if (asModifiable === true) {
            this.effects.set(effect.name, new ModifiableManagedEffect(effect, [effect.name]));
        }
        else {
            this.effects.set(effect.name, new ManagedEffect(effect));
        }
        this.all.set(effect.name, effect);
        return this;
    }
    addMult(effects, asModifiable) {
        effects.forEach(effect => this.add(effect, asModifiable));
        return this;
    }
    static Player(effects) { return new EffectManager(effects); }
}
exports.EffectManager = EffectManager;
class ModifiableEffectManager extends EffectManager {
    constructor(effects) {
        super(effects);
    }
    add(effect, asModifiable) {
        asModifiable = true;
        super.add(effect, asModifiable);
        return this;
    }
    addMult(effects, asModifiable) {
        asModifiable = true;
        super.addMult(effects, asModifiable);
        return this;
    }
    static Player(effects) { return new ModifiableEffectManager(effects); }
}
exports.ModifiableEffectManager = ModifiableEffectManager;
class UnmodifiableEffectManager extends EffectManager {
    constructor(effects) {
        super(effects);
    }
    add(effect, asModifiable) {
        asModifiable = false;
        super.add(effect, asModifiable);
        return this;
    }
    addMult(effects, asModifiable) {
        asModifiable = false;
        super.addMult(effects, asModifiable);
        return this;
    }
    static Player(effects) { return new UnmodifiableEffectManager(effects); }
}
exports.UnmodifiableEffectManager = UnmodifiableEffectManager;
class ManagedEffect {
    constructor(effect, count) {
        this.effect = effect;
        this.count = typeof count === 'number' ? count : 1;
    }
    setCount(count) {
        this.count = count;
        return this;
    }
    addOne() {
        this.count++;
        return this;
    }
    removeOne() {
        this.count--;
        return this;
    }
    makeModifiable(names) {
        return new ModifiableManagedEffect(this.effect, names, this.count);
    }
}
exports.ManagedEffect = ManagedEffect;
class ModifiableManagedEffect {
    constructor(effect, names, count) {
        this.custom = new Map();
        this.silentRetrievalError = false;
        this.effect = effect;
        this.count = typeof count === 'number' ? count : 1;
        if (names.length < this.count) {
            throw new util_1.ConstructorError(`ModifiableManagedEffect: class was not instantiated with enough identifier names to match property 'count'. (${names.length} != ${count})`);
        }
        let altEffect = Object.assign(Object.create(Object.getPrototypeOf(effect)), effect);
        let name;
        for (name of names) {
            this.custom.set(name, altEffect);
        }
    }
    addOne(name) {
        this.custom.set(name, this.effect);
        this.count++;
        return this;
    }
    addMult(names) {
        names.forEach(name => {
            this.custom.set(name, this.effect);
            this.count++;
        });
        return this;
    }
    removeOne(name) {
        let effect = name || this.custom.get(Array.from(this.custom.keys())[0]).name;
        if (!this.custom.get(effect) && !this.silentRetrievalError) {
            throw new util_1.ValueError(`This ModifiableManagedEffect instance has no custom Effects that match the sub-name ${effect}`);
        }
        this.custom.delete(effect);
        this.count--;
        return this;
    }
    removeMult(names) {
        names.forEach(effect => {
            if (!this.custom.get(effect) && !this.silentRetrievalError) {
                throw new util_1.ValueError(`This ModifiableManagedEffect instance has no custom Effects that match the sub-name ${effect}`);
            }
            this.custom.delete(effect);
            this.count--;
        });
        return this;
    }
    modify(toModify, newEffect) {
        if (newEffect instanceof effect_1.Effect) {
            return this;
        }
        this.custom.set(toModify, newEffect);
        return this;
    }
    rename(old, renamed) {
        let effect = this.custom.get(old);
        if (!effect && !this.silentRetrievalError) {
            throw new util_1.ValueError(`This ModifiableManagedEffect instance has no custom Effects that match the sub-name ${old}`);
        }
        effect.name = renamed;
        this.custom.delete(old);
        this.custom.set(renamed, effect);
        this.effect.name = old;
        return this;
    }
    silence() {
        this.silentRetrievalError = true;
        return this;
    }
}
exports.ModifiableManagedEffect = ModifiableManagedEffect;
