import { Char } from "./char";
import { HealthManager } from "./health/healthmanager";
import { Race } from "./modifiers/race";
import { PlayerEffect } from "../status/effect/player/playereffect";
export declare class Player extends Char {
    hp: HealthManager;
    race: Race;
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
