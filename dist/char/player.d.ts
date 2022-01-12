import { Char } from "./char";
import { HealthManager } from "./health/healthmanager";
import { Race } from "./modifiers/race";
import { PlayerEffect } from "../status/effect/player/playereffect";
import { PlayerStatus } from "../status/status";
import { EffectManager } from "..";
export declare class Player extends Char {
    hp: HealthManager;
    race: Race;
    statuses: Map<string, PlayerStatus>;
    effects: EffectManager<PlayerEffect>;
    private _HPMods;
    constructor(name: string, hp: number | HealthManager, options?: PlayerOptions);
    takeDamage(damage: number): Player;
    heal(health: number): Player;
    setHealth(health: number | HealthManager): Player;
    addEffect(effect: PlayerEffect): Player;
    removeEffect(effect: PlayerEffect | string): Player;
    addStatus(status: PlayerStatus): Player;
    removeStatus(status: PlayerStatus): Player;
    set health(health: number | HealthManager);
}
interface PlayerOptions {
    race?: Race;
}
export {};
