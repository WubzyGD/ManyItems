import { EventEmitter } from 'tsee';
import { Effect } from "./effect";
export declare class EffectManager<EffectType extends Effect> extends EventEmitter<EffectManagerEvents<EffectType>> {
    defaultCountUpdateEvent: (effect: ManagedEffect<EffectType>) => void;
    private effects;
    constructor(effects?: EffectType[]);
    add(...effects: EffectType[]): EffectManager<EffectType>;
    addMult(effects: EffectType[]): EffectManager<EffectType>;
    get(effectName: string): ManagedEffect<EffectType>;
    remove(effectName: string): EffectManager<EffectType>;
    getEffects(): Map<string, ManagedEffect<EffectType>>;
    setDefaultCountUpdateEvent(eventHandler: (effect: ManagedEffect<EffectType>) => void): EffectManager<EffectType>;
    get staticEffects(): Map<string, ManagedEffect<EffectType>>;
}
export declare class ManagedEffect<EffectType extends Effect> extends EventEmitter<ManagedEffectEvents<EffectType>> {
    effect: EffectType;
    private _count;
    constructor(effect: EffectType, count?: number);
    setCount(count: number): ManagedEffect<EffectType>;
    add(count: number): ManagedEffect<EffectType>;
    addOne(): ManagedEffect<EffectType>;
    remove(count: number): ManagedEffect<EffectType>;
    removeOne(count: number): ManagedEffect<EffectType>;
    removeAll(count: number): ManagedEffect<EffectType>;
    get count(): number;
    set count(count: number);
}
export declare type EffectManagerEvents<EffectType extends Effect> = {
    'add': (effect: ManagedEffect<EffectType>) => void;
    'remove': (effect: ManagedEffect<EffectType>) => void;
};
export declare type ManagedEffectEvents<EffectType extends Effect> = {
    'countUpdate': (effect: ManagedEffect<EffectType>) => void;
    'depleted': (effect: ManagedEffect<EffectType>) => void;
};
