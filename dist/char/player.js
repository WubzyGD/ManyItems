"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const char_1 = require("./char");
const healthmanager_1 = require("./health/healthmanager");
class Player extends char_1.Char {
    constructor(name, hp, options) {
        super(name);
        this.hp = hp instanceof healthmanager_1.HealthManager ? hp : new healthmanager_1.HealthManager(hp);
    }
    takeDamage(damage) {
        this.hp.health -= damage;
        return this;
    }
    heal(health) {
        this.hp.health += health;
        return this;
    }
    setHealth(health) {
        if (health instanceof healthmanager_1.HealthManager) {
            this.hp = health;
        }
        else {
            this.hp.health = health;
        }
        return this;
    }
    set health(health) {
        if (health instanceof healthmanager_1.HealthManager) {
            this.hp = health;
        }
        else {
            this.hp.health = health;
        }
    }
}
exports.Player = Player;
