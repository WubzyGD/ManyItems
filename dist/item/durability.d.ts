import { DurabilityStateEvents } from "./durabilitystateevents";
export declare class Durability {
    maxDurability: number;
    canBreak: boolean;
    canBecomeIrreparable: boolean;
    shatterOnBreak: boolean;
    margins: durabilityMargins;
    private _brokenState;
    private _durability;
    private _stateEvents;
    constructor(maxDurability: number, options?: durabilityOptions);
    break(noDurabilityChange?: boolean, forceDurability?: number): Durability;
    heal(noDurabilityChange?: boolean, forceDurability?: number): Durability;
    shatter(noDurabilityChange?: boolean, forceDurability?: number): Durability;
    weaken(noDurabilityChange?: boolean, forceDurability?: number): Durability;
    setDurability(durability: number): Durability;
    private checkState;
    private checkDurability;
    set state(state: durabilityState);
    set durability(durability: number);
    get durability(): number;
    get state(): durabilityState;
    get isBroken(): boolean;
    get isHealthy(): boolean;
    get isIrreparable(): boolean;
    get isShattered(): boolean;
    get canShatter(): boolean;
    get rawStateEvents(): DurabilityStateEvents;
}
declare type durabilityState = "healthy" | "weakened" | "broken" | "irreparable";
interface durabilityMargins {
    healthy?: number;
    weakened?: number;
    broken?: number;
}
interface durabilityOptions {
    canBreak?: boolean;
    canBecomeIrreparable?: boolean;
    margins?: durabilityMargins;
    currentDurability?: number;
    currentState?: durabilityState;
    shatterOnBreak?: boolean;
    durabilityStateEvents?: DurabilityStateEvents;
}
export {};
