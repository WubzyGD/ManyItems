import {Effect} from "./effect";
import {ConstructorError, ValueError} from "../../util/errors/util";
import {PlayerEffect} from "./player/playereffect";

export class EffectManager<EffectInstance extends Effect> {

    all: Map<string, EffectInstance> = new Map();
    effects: Map<string, ManagedEffect<EffectInstance> | ModifiableManagedEffect<EffectInstance>> = new Map();

    private _onUpdate: (effect: EffectInstance, manager: EffectManager<EffectInstance>) => any = () => {};
    private _onEffectUpdate: (effect: ManagedEffect<EffectInstance> | ModifiableManagedEffect<EffectInstance>, manager: EffectManager<EffectInstance>) => any = () => {};


    constructor(effects?: EffectInstance[]) {
        if (effects) {effects.forEach(effect => this.add(effect));}
    }



    public add(effect: EffectInstance, asModifiable?: boolean): EffectManager<EffectInstance> {
        if (asModifiable === true) {this.effects.set(effect.name, new ModifiableManagedEffect(effect, [effect.name]));}
        else {this.effects.set(effect.name, new ManagedEffect(effect));}
        this.all.set(effect.name, effect);
        this._onUpdate(effect, this);
        return this;
    }

    public addMult(effects: EffectInstance[], asModifiable?: boolean): EffectManager<EffectInstance> {
        effects.forEach(effect => this.add(effect, asModifiable));
        return this;
    }

    public setUpdateEvent(updateEvent: (effect: EffectInstance, manager: EffectManager<EffectInstance>) => any): EffectManager<EffectInstance> {
        this._onUpdate = updateEvent;
        return this;
    }

    public setEffectUpdateEvent(updateEvent: (effect: ManagedEffect<EffectInstance> | ModifiableManagedEffect<EffectInstance>, manager: EffectManager<EffectInstance>) => any): EffectManager<EffectInstance> {
        this._onEffectUpdate = updateEvent;
        return this;
    }


    public static Player(effects?: PlayerEffect[]): EffectManager<PlayerEffect> {return new EffectManager<PlayerEffect>(effects);}

}

export class ModifiableEffectManager<EffectInstance extends Effect> extends EffectManager<EffectInstance> {
    effects: Map<string, ModifiableManagedEffect<EffectInstance>>;
    constructor(effects?: EffectInstance[]) {
        super(effects);
    }
    public add(effect: EffectInstance, asModifiable?: boolean): ModifiableEffectManager<EffectInstance> {
        asModifiable = true;
        super.add(effect, asModifiable);
        return this;
    }
    public addMult(effects: EffectInstance[], asModifiable?: boolean): ModifiableEffectManager<EffectInstance> {
        asModifiable = true;
        super.addMult(effects, asModifiable);
        return this;
    }
    public static Player(effects?: PlayerEffect[]): ModifiableEffectManager<PlayerEffect> {return new ModifiableEffectManager<PlayerEffect>(effects);}
}

export class UnmodifiableEffectManager<EffectInstance extends Effect> extends EffectManager<EffectInstance> {
    effects: Map<string, ManagedEffect<EffectInstance>>;
    constructor(effects?: EffectInstance[]) {
        super(effects);
    }
    public add(effect: EffectInstance, asModifiable?: boolean): UnmodifiableEffectManager<EffectInstance> {
        asModifiable = false;
        super.add(effect, asModifiable);
        return this;
    }
    public addMult(effects: EffectInstance[], asModifiable?: boolean): UnmodifiableEffectManager<EffectInstance> {
        asModifiable = false;
        super.addMult(effects, asModifiable);
        return this;
    }
    public static Player(effects?: PlayerEffect[]): UnmodifiableEffectManager<PlayerEffect> {return new UnmodifiableEffectManager<PlayerEffect>(effects);}
}

export class ManagedEffect<EffectInstance extends Effect> {

    effect: EffectInstance;
    count: number;

    private _onCountUpdate: (effect: EffectInstance, count: number) => any = () => {};


    constructor(effect: EffectInstance, count?: number) {
        this.effect = effect;
        this.count = typeof count === 'number' ? count : 1;
    }



    public setCount(count: number): ManagedEffect<EffectInstance> {
        this.count = count;
        this._onCountUpdate(this.effect, count);
        return this;
    }

    public addOne(): ManagedEffect<EffectInstance> {
        this.setCount(this.count + 1);
        return this;
    }

    public removeOne(): ManagedEffect<EffectInstance> {
        this.setCount(this.count - 1);
        return this;
    }

    public makeModifiable(names?: string[]): ModifiableManagedEffect<EffectInstance> {
        return new ModifiableManagedEffect(this.effect, names, this.count);
    }

    public setUpdateEvent(updateEvent: (effect: EffectInstance, count: number) => any): ManagedEffect<EffectInstance> {
        this._onCountUpdate = updateEvent;
        return this;
    }

}

export class ModifiableManagedEffect<EffectInstance extends Effect> {

    custom: Map<string, EffectInstance> = new Map();
    effect: EffectInstance;
    count: number;
    silentRetrievalError: boolean = false;
    
    private _onCountUpdate: (effect: EffectInstance, count: number) => any = () => {};


    constructor(effect: EffectInstance, names: string[], count?: number) {
        this.effect = effect;
        this.count = typeof count === 'number' ? count : 1;
        if (names.length < this.count) {throw new ConstructorError(`ModifiableManagedEffect: class was not instantiated with enough identifier names to match property 'count'. (${names.length} != ${count})`);}
        let altEffect = Object.assign(Object.create(Object.getPrototypeOf(effect)), effect);
        let name; for (name of names) {
            this.custom.set(name, altEffect);
        }
    }



    public addOne(name: string): ModifiableManagedEffect<EffectInstance> {
        this.custom.set(name, this.effect);
        this.count++;
        return this;
    }

    public addMult(names: string[]): ModifiableManagedEffect<EffectInstance> {
        names.forEach(name => {
            this.custom.set(name, this.effect);
            this.count++
        });
        return this;
    }

    public removeOne(name?: string): ModifiableManagedEffect<EffectInstance> {
        let effect = name || this.custom.get(Array.from(this.custom.keys())[0]).name;
        if (!this.custom.get(effect) && !this.silentRetrievalError) {throw new ValueError(`This ModifiableManagedEffect instance has no custom Effects that match the sub-name ${effect}`);}
        this.custom.delete(effect);
        this.count--;
        return this;
    }

    public removeMult(names: string[]): ModifiableManagedEffect<EffectInstance> {
        names.forEach(effect => {
            if (!this.custom.get(effect) && !this.silentRetrievalError) {throw new ValueError(`This ModifiableManagedEffect instance has no custom Effects that match the sub-name ${effect}`);}
            this.custom.delete(effect);
            this.count--;
        });
        return this;
    }

    public modify(toModify: string, newEffect: EffectInstance): ModifiableManagedEffect<EffectInstance> {
        if (newEffect !instanceof Effect) {return this;}
        this.custom.set(toModify, newEffect);
        return this;
    }

    public rename(old: string, renamed: string): ModifiableManagedEffect<EffectInstance> {
        let effect = this.custom.get(old);
        if (!effect && !this.silentRetrievalError) {throw new ValueError(`This ModifiableManagedEffect instance has no custom Effects that match the sub-name ${old}`);}
        effect.name = renamed;
        this.custom.delete(old);
        this.custom.set(renamed, effect);
        this.effect.name = old;
        return this;
    }

    public silence(): ModifiableManagedEffect<EffectInstance> {
        this.silentRetrievalError = true;
        return this;
    }

}