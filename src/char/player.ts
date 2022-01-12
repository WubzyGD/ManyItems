import {Char} from "./char";
import {HealthManager} from "./health/healthmanager";
import {Race} from "./modifiers/race";
import {PlayerEffect} from "../status/effect/player/playereffect";
import {HealthEffect} from "../status/effect/player/healtheffect";
import {Status, PlayerStatus} from "../status/status";
import {EffectManager} from "..";

export class Player extends Char {

    hp: HealthManager;
    race: Race;
    statuses: Map<string, PlayerStatus>;
    effects: EffectManager<PlayerEffect> = new EffectManager<PlayerEffect>();

    private _HPMods: Map<string, HealthEffect> = new Map();


    constructor(name: string, hp: number | HealthManager, options?: PlayerOptions) {
        super(name);
        this.hp = hp instanceof HealthManager ? hp : new HealthManager(hp);
    }



    public takeDamage(damage: number): Player {
        this.hp.health -= damage;
        return this;
    }

    public heal(health: number): Player {
        this.hp.health += health;
        return this;
    }

    public setHealth(health: number | HealthManager): Player {
        if (health instanceof HealthManager) {this.hp = health;}
        else {this.hp.health = health;}
        return this;
    }

    public addEffect(effect: PlayerEffect): Player {
        this.effects.add(effect);
        return this;
    }

    public removeEffect(effect: PlayerEffect | string): Player {
        this.effects.remove(effect);
        return this;
    }

    public addStatus(status: PlayerStatus): Player {
        super.addStatus(status);
        return this;
    }

    public removeStatus(status: PlayerStatus): Player {
        super.removeStatus(status);
        return this;
    }


    set health(health: number | HealthManager) {
        if (health instanceof HealthManager) {this.hp = health;}
        else {this.hp.health = health;}
    }

}

interface PlayerOptions {
    race?: Race
}