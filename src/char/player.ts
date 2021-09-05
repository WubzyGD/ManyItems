import {Char} from "./char";
import {HealthManager} from "./health/healthmanager";
import {Race} from "./modifiers/race";

export class Player extends Char {

    hp: HealthManager;
    race: Race;


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


    set health(health: number | HealthManager) {
        if (health instanceof HealthManager) {this.hp = health;}
        else {this.hp.health = health;}
    }

}

interface PlayerOptions {
    race?: Race
}