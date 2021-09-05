import { Char } from "./char";
import { HealthManager } from "./health/healthmanager";
import { Race } from "./modifiers/race";
export declare class Player extends Char {
    hp: HealthManager;
    race: Race;
    constructor(name: string, hp: number | HealthManager, options?: PlayerOptions);
    takeDamage(damage: number): Player;
    heal(health: number): Player;
    setHealth(health: number | HealthManager): Player;
    set health(health: number | HealthManager);
}
interface PlayerOptions {
    race?: Race;
}
export {};
