"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const char_1 = require("./char");
const healthmanager_1 = require("./health/healthmanager");
const playereffect_1 = require("../status/effect/player/playereffect");
const effectmanager_1 = require("../status/effect/effectmanager");
class Player extends char_1.Char {
    constructor(name, hp, options) {
        super(name);
        this.effects = new effectmanager_1.ModifiableEffectManager();
        this._HPMods = new Map();
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
    addEffect(effect) {
        this.effects.add(effect);
        return this;
    }
    removeEffect(effect) {
        this.effects.effects.delete(effect instanceof playereffect_1.PlayerEffect ? effect.name : effect);
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
