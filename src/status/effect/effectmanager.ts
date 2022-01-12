import {EventEmitter} from 'tsee';
import {ArrayInput} from "../../util/dev/arrayinput";
import {Effect} from "./effect";
import {ValueError} from "../../util/dev/errors/util";

const structuredClone = require('realistic-structured-clone');


export class EffectManager<EffectType extends Effect> extends EventEmitter<EffectManagerEvents<EffectType>> {

    defaultCountUpdateEvent: (effect: ManagedEffect<EffectType>) => void;
    defaultDepletedEvent: (effect: ManagedEffect<EffectType>) => void;

    private effects: Map<string, ManagedEffect<EffectType>> = new Map();


    constructor(effects?: EffectType[]) {
        super();
        if (effects) {effects.forEach(effect => this.add(effect));}
    };



    public add(...effects: EffectType[]): EffectManager<EffectType> {
        ArrayInput.makeArray<EffectType>(effects).forEach((effect: EffectType) => {
            if (this.effects.has(effect.id)) {
                this.effects.get(effect.id).addOne();
            } else {
                const managedEffect = new ManagedEffect<EffectType>(effect);
                if (this.defaultCountUpdateEvent) {managedEffect.on("countUpdate", this.defaultCountUpdateEvent);}
                if (this.defaultDepletedEvent) {managedEffect.on("depleted", this.defaultDepletedEvent);}
                this.effects.set(effect.id, managedEffect);
                this.emit('add', managedEffect);
            }
        });
        return this;
    };

    public addMult(effects: EffectType[]): EffectManager<EffectType> {
        effects.forEach(effect => this.add(effect));
        return this;
    };

    public get(effectid: string): ManagedEffect<EffectType> {
        return this.effects.get(effectid);
    };

    public remove(effectid: string | ManagedEffect<EffectType> | EffectType): EffectManager<EffectType> {
        effectid = effectid instanceof ManagedEffect ? effectid.effect.id : typeof effectid === 'string' ? effectid : effectid.id;
        if (!this.effects.has(effectid)) {throw new ValueError(`EffectManagerValueError: "${effectid}" is not a valid effect id in this effect manager's managed effects.`);}
        let toDelete = this.effects.get(effectid);
        this.effects.delete(effectid);
        this.emit('remove', toDelete);
        return this;
    };

    public replace(effect: ManagedEffect<EffectType> | EffectType): EffectManager<EffectType> {
        let tr = effect instanceof ManagedEffect ? effect : new ManagedEffect<EffectType>(effect);
        if (!this.effects.has(tr.effect.id)) {return this.add(tr.effect);}
        this.remove(tr);
        this.add(tr.effect);
        return this;
    };

    public getEffects(): Map<string, ManagedEffect<EffectType>> {
        let nm = new Map();
        Array.from(this.effects.keys()).forEach(e => nm.set(e, this.effects.get(e)));
        return structuredClone(this.effects);
    };

    public setDefaultCountUpdateEvent(eventHandler: (effect: ManagedEffect<EffectType>) => void): EffectManager<EffectType> {
        this.defaultCountUpdateEvent = eventHandler;
        return this;
    };

    public setDefaultDepletedEvent (eventHandler: (effect: ManagedEffect<EffectType>) => void): EffectManager<EffectType> {
        this.defaultDepletedEvent = eventHandler;
        return this;
    };


    get staticEffects(): Map<string, ManagedEffect<EffectType>> {
        return this.getEffects();
    };

}


export class ManagedEffect<EffectType extends Effect> extends EventEmitter<ManagedEffectEvents<EffectType>> {

    effect: EffectType;

    private _count: number = 1;
    private _depleted: boolean = false;


    constructor(effect: EffectType, count?: number) {
        super();
        this.effect = effect;
        this._count = count || this._count;
    };



    public setCount(count: number): ManagedEffect<EffectType> {
        this.count = count;
        return this;
    };

    public add(count: number): ManagedEffect<EffectType> {
        this.count += count;
        return this;
    };

    public addOne(): ManagedEffect<EffectType> {
        this.count += 1;
        return this;
    };

    public remove(count: number): ManagedEffect<EffectType> {
        this.count -= count;
        return this;
    };

    public removeOne(): ManagedEffect<EffectType> {
        this.count -= 1;
        return this;
    };

    public removeAll(): ManagedEffect<EffectType> {
        this.count = 0;
        return this;
    };

    public deplete(): ManagedEffect<EffectType> {return this.removeAll();};


    get count(): number {
        return this._count;
    };

    set count(count: number) {
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

    get depleted(): boolean {
        return this._depleted;
    }

}



export type EffectManagerEvents<EffectType extends Effect> = {
    'add': (effect: ManagedEffect<EffectType>) => void,
    'remove': (effect: ManagedEffect<EffectType>) => void
}

export type ManagedEffectEvents<EffectType extends Effect> = {
    'countUpdate': (effect: ManagedEffect<EffectType>) => void,
    'depleted': (effect: ManagedEffect<EffectType>) => void
}