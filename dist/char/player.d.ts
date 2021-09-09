import { Char } from "./char";
import { HealthManager } from "./health/healthmanager";
import { Race } from "./modifiers/race";
import { PlayerEffect } from "../status/effect/player/playereffect";
import { ModifiableEffectManager } from "../status/effect/effectmanager";
export declare class Player extends Char {
    hp: HealthManager;
    race: Race;
    effects: ModifiableEffectManager<PlayerEffect>;
    private _HPMods;
    constructor(name: string, hp: number | HealthManager, options?: PlayerOptions);
    takeDamage(damage: number): Player;
    heal(health: number): Player;
    setHealth(health: number | HealthManager): Player;
    addEffect(effect: PlayerEffect): Player;
    removeEffect(effect: PlayerEffect | string): Player;
    set health(health: number | HealthManager);
}
interface PlayerOptions {
    race?: Race;
}
export {};
