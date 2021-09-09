import { Effect } from "./effect";
import { PlayerEffect } from "./player/playereffect";
export declare class EffectManager<EffectInstance extends Effect> {
    all: Map<string, EffectInstance>;
    effects: Map<string, ManagedEffect<EffectInstance> | ModifiableManagedEffect<EffectInstance>>;
    private _onUpdate;
    private _onEffectUpdate;
    constructor(effects?: EffectInstance[]);
    add(effect: EffectInstance, asModifiable?: boolean): EffectManager<EffectInstance>;
    addMult(effects: EffectInstance[], asModifiable?: boolean): EffectManager<EffectInstance>;
    setUpdateEvent(updateEvent: (effect: EffectInstance, manager: EffectManager<EffectInstance>) => any): EffectManager<EffectInstance>;
    setEffectUpdateEvent(updateEvent: (effect: ManagedEffect<EffectInstance> | ModifiableManagedEffect<EffectInstance>, manager: EffectManager<EffectInstance>) => any): EffectManager<EffectInstance>;
    static Player(effects?: PlayerEffect[]): EffectManager<PlayerEffect>;
}
export declare class ModifiableEffectManager<EffectInstance extends Effect> extends EffectManager<EffectInstance> {
    effects: Map<string, ModifiableManagedEffect<EffectInstance>>;
    constructor(effects?: EffectInstance[]);
    add(effect: EffectInstance, asModifiable?: boolean): ModifiableEffectManager<EffectInstance>;
    addMult(effects: EffectInstance[], asModifiable?: boolean): ModifiableEffectManager<EffectInstance>;
    static Player(effects?: PlayerEffect[]): ModifiableEffectManager<PlayerEffect>;
}
export declare class UnmodifiableEffectManager<EffectInstance extends Effect> extends EffectManager<EffectInstance> {
    effects: Map<string, ManagedEffect<EffectInstance>>;
    constructor(effects?: EffectInstance[]);
    add(effect: EffectInstance, asModifiable?: boolean): UnmodifiableEffectManager<EffectInstance>;
    addMult(effects: EffectInstance[], asModifiable?: boolean): UnmodifiableEffectManager<EffectInstance>;
    static Player(effects?: PlayerEffect[]): UnmodifiableEffectManager<PlayerEffect>;
}
export declare class ManagedEffect<EffectInstance extends Effect> {
    effect: EffectInstance;
    count: number;
    private _onCountUpdate;
    constructor(effect: EffectInstance, count?: number);
    setCount(count: number): ManagedEffect<EffectInstance>;
    addOne(): ManagedEffect<EffectInstance>;
    removeOne(): ManagedEffect<EffectInstance>;
    makeModifiable(names?: string[]): ModifiableManagedEffect<EffectInstance>;
    setUpdateEvent(updateEvent: (effect: EffectInstance, count: number) => any): ManagedEffect<EffectInstance>;
}
export declare class ModifiableManagedEffect<EffectInstance extends Effect> {
    custom: Map<string, EffectInstance>;
    effect: EffectInstance;
    count: number;
    silentRetrievalError: boolean;
    private _onCountUpdate;
    constructor(effect: EffectInstance, names: string[], count?: number);
    addOne(name: string): ModifiableManagedEffect<EffectInstance>;
    addMult(names: string[]): ModifiableManagedEffect<EffectInstance>;
    removeOne(name?: string): ModifiableManagedEffect<EffectInstance>;
    removeMult(names: string[]): ModifiableManagedEffect<EffectInstance>;
    modify(toModify: string, newEffect: EffectInstance): ModifiableManagedEffect<EffectInstance>;
    rename(old: string, renamed: string): ModifiableManagedEffect<EffectInstance>;
    silence(): ModifiableManagedEffect<EffectInstance>;
}
