"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mod = void 0;
const random_1 = require("./random");
const char_1 = require("./char");
class Mod {
    constructor(name, activateOn, mainEffects, onBS, bonusAgainst, bonusEffects, slugAgainst, slugEffects) {
        this.name = name;
        this.activateOn = activateOn;
        this.mainEffects = mainEffects;
        this.onBS = onBS;
        if ((bonusAgainst !== null && bonusAgainst !== undefined) && (bonusEffects == null)) {
            throw new SyntaxError("Error in Mod class construction: 'bonusAgainst' is given, but no 'bonusEffects' are specified.");
        }
        else {
            if (bonusAgainst !== undefined) {
                this.bonusAgainst = bonusAgainst;
                this.bonusEffects = bonusEffects;
            }
        }
        if ((slugAgainst !== null && slugAgainst !== undefined) && (slugEffects == null)) {
            throw new SyntaxError("Error in Mod class construction: 'slugAgainst' is given, but no 'slugEffects' are specified.");
        }
        else {
            if (slugAgainst !== undefined) {
                this.slugAgainst = slugAgainst;
                this.slugEffects = slugEffects;
            }
        }
        if (!Object.keys(this.activateOn).includes("mode")) {
            this.activateOn.mode = "merge";
        }
    }
    ;
    cleanActivateOn() {
        return this.activateOn;
    }
    ;
    heartbeat(victim) {
        if (this.activateOn.always === true) {
            return { hit: true, slugHit: false, bonusHit: false };
        }
        if (!victim || this.activateOn.mode == "prioritize_base") {
            if (typeof (this.activateOn.chance) == "number") {
                return { hit: Math.ceil(Math.random() * 100) <= this.activateOn.chance, slugHit: false, bonusHit: false };
            }
        }
        else {
            var mainChance;
            var bonusChance;
            var slugChance;
            if (typeof (this.activateOn.chance) == "number") {
                mainChance = Math.ceil(Math.random() * 100);
            }
            if (typeof (this.activateOn.bonusChance) == "number") {
                bonusChance = Math.ceil(Math.random() * 100);
            }
            else {
                bonusChance = 100;
            }
            if (typeof (this.activateOn.slugChance) == "number") {
                slugChance = Math.ceil(Math.random() * 100);
            }
            else {
                bonusChance = 100;
            }
            if (mainChance > this.activateOn.chance && (this.activateOn.mode !== "prioritize_bs" && this.activateOn.mode !== "reroll" && this.activateOn.mode !== "reroll_merge")) {
                return { hit: false, bonusHit: false, slugHit: false };
            }
            let bonusHit = false;
            let slugHit = false;
            if (victim instanceof char_1.Character) {
                bonusHit = this.bonusAgainst.includes(victim.name.toLowerCase());
            }
            else if (typeof victim == "string") {
                bonusHit = this.bonusAgainst.includes(victim.toLowerCase());
            }
            else {
                throw new SyntaxError("Error in Mod heartbeat: Param 'victim' was not either a string or Character");
            }
            if (victim instanceof char_1.Character) {
                slugHit = this.slugAgainst.includes(victim.name.toLowerCase());
            }
            else if (typeof victim == "string") {
                slugHit = this.slugAgainst.includes(victim.toLowerCase());
            }
            else {
                throw new SyntaxError("Error in Mod heartbeat: Param 'victim' was not either a string or Character");
            }
            if (bonusHit) {
                if (this.activateOn.bonus === false) {
                    bonusHit = false;
                }
                else if (typeof this.activateOn.bonusChance == "number") {
                    if (bonusChance > this.activateOn.bonusChance) {
                        bonusHit = false;
                    }
                }
            }
            if (slugHit) {
                if (this.activateOn.slug === false) {
                    slugHit = false;
                }
                if (typeof this.activateOn.slugChance == "number") {
                    if (slugChance > this.activateOn.slugChance) {
                        slugHit = false;
                    }
                }
            }
            function specialHit(type, mod) {
                function sv(type) {
                    let t = { hit: true, slugHit: false, bonusHit: false };
                    t[`${type}Hit`] = true;
                    return t;
                }
                if (mod.activateOn.mode == "merge") {
                    if (Math.ceil(Math.random() * 100) <= mod.activateOn.chance + mod.activateOn[`${type}Chance`]) {
                        return sv(type);
                    }
                }
                else if (mod.activateOn.mode == "prioritize_bs") {
                    if (Math.ceil(Math.random() * 100) <= mod.activateOn[`${type}Chance`]) {
                        return sv(type);
                    }
                }
                else if (mod.activateOn.mode == "reroll") {
                    var sc;
                    if (type == "slug") {
                        sc = slugChance;
                    }
                    else {
                        sc = bonusChance;
                    }
                    if (mainChance <= mod.activateOn.chance) {
                        return sv(type);
                    }
                    else if (sc <= mod.activateOn[`${type}Chance`]) {
                        return sv(type);
                    }
                    else {
                        return { hit: false, slugHit: false, bonusHit: false };
                    }
                }
                else if (mod.activateOn.mode == "reroll_merge") {
                    if (Math.ceil(Math.random() * 100) <= mod.activateOn.chance + mod.activateOn[`${type}Chance`]) {
                        return sv(type);
                    }
                    else if (Math.ceil(Math.random() * 100) <= mod.activateOn.chance + mod.activateOn[`${type}Chance`]) {
                        return sv(type);
                    }
                    else {
                        return { hit: false, slugHit: false, bonusHit: false };
                    }
                }
                else if (mod.activateOn.mode == "pass_both") {
                    if (Math.ceil(Math.random() * 100) <= mod.activateOn[`${type}Chance`] && mainChance <= mod.activateOn.chance) {
                        return sv(type);
                    }
                    else {
                        return { hit: false, slugHit: false, bonusHit: false };
                    }
                }
            }
            if (bonusHit) {
                return specialHit("bonus", this);
            }
            else if (slugHit) {
                return specialHit("slug", this);
            }
            else {
                return { hit: true, slugHit: false, bonusHit: false };
            }
        }
    }
    ;
    wakeup(target, force) {
        if (force) {
            return true;
        }
        if (target) {
            return this.heartbeat(target).hit;
        }
        return this.heartbeat().hit;
    }
    ;
    pulse(victim, calculate) {
        let results = { mod: this, awake: false, alt: null };
        if (victim) {
            var woke = this.heartbeat(victim);
        }
        else {
            var woke = this.heartbeat();
        }
        if (woke.hit) {
            var bonusDt;
            var slugDt;
            results.awake = true;
            function calc(t, mod) {
                var res = { damageAdd: 0, statusesGranted: false, statuses: [], multiplied: false, multiply: 1 };
                if (mod[`${t}Effects`].damageAdd instanceof random_1.Random) {
                    res.damageAdd = mod[`${t}Effects`].damageAdd.calc();
                }
                else if (typeof mod[`${t}Effects`].damageAdd == "number") {
                    res.multiply = mod[`${t}Effects`].damageAdd;
                }
                else {
                    res.damageAdd = random_1.Random.from(mod[`${t}Effects`].damageAdd).calc();
                }
                if (mod[`${t}Effects`].multiplier) {
                    if (mod[`${t}Effects`].multiplier instanceof random_1.Random) {
                        res.multiply = mod[`${t}Effects`].multiplier.calc();
                    }
                    else if (typeof mod[`${t}Effects`].multiplier == "number") {
                        res.multiply = mod[`${t}Effects`].multiplier;
                    }
                    else {
                        res.multiply = random_1.Random.from(mod[`${t}Effects`].multiplier).calc();
                    }
                }
                if (mod[`${t}Effects`].multiplierAC) {
                    res.multiplied = Math.ceil(Math.random() * 100) <= mod[`${t}Effects`].multiplierAC;
                }
                else {
                    res.multiplied = true;
                }
                res.statuses = mod[`${t}Effects`].statuses;
                if (mod[`${t}Effects`].statuses) {
                    res.statusesGranted = Math.ceil(Math.random() * 100) <= mod[`${t}Effects`].statusGrantChance;
                }
                else {
                    res.statusesGranted = false;
                }
                return res;
            }
            let mainDt = calc('main', this);
            if (woke.bonusHit === true) {
                bonusDt = calc('bonus', this);
            }
            else {
                bonusDt = null;
                if (woke.slugHit === true) {
                    slugDt = calc('slug', this);
                }
                else {
                    slugDt = null;
                }
            }
            results.alt = {
                main: mainDt,
                bonus: bonusDt,
                slug: slugDt,
                fullCalculate: function () {
                    return results.mod.fullCalculate(results.alt);
                },
                sweepStatuses: function () {
                    return results.mod.sweepStatuses(results.alt);
                }
            };
            if (calculate === true) {
                results.alt.calculated = {
                    statuses: results.mod.sweepStatuses(results.alt),
                    damage: results.mod.fullCalculate(results.alt)
                };
            }
        }
        else {
            results.awake = false;
        }
        return results;
    }
    ;
    fullCalculate(alt) {
        let total = 0;
        if (this.onBS == "default") {
            total += alt.main.damageAdd;
        }
        if (alt.bonus) {
            total += alt.bonus.damageAdd;
            if (alt.bonus.multiplied) {
                total *= alt.main.multiply;
            }
        }
        else if (alt.slug) {
            total += alt.slug.damageAdd;
            if (alt.slug.multiplied) {
                total *= alt.slug.multiply;
            }
        }
        if (this.onBS == "default") {
            if (alt.main.multiplied) {
                total *= alt.main.multiply;
            }
        }
        return total;
    }
    ;
    sweepStatuses(alt) {
        let stats = [];
        if (alt.main.statusesGranted && this.onBS == "default") {
            if (Array.isArray(alt.main.statuses)) {
                for (let s of alt.main.statuses) {
                    stats.push(s);
                }
            }
            else if (typeof alt.main.statuses == "string") {
                stats.push(alt.main.statuses);
            }
        }
        if (alt.bonus.statusesGranted) {
            if (Array.isArray(alt.bonus.statuses)) {
                for (let s of alt.bonus.statuses) {
                    stats.push(s);
                }
            }
            else if (typeof alt.bonus.statuses == "string") {
                stats.push(alt.bonus.statuses);
            }
        }
        else if (alt.slug.statusesGranted) {
            if (Array.isArray(alt.slug.statuses)) {
                for (let s of alt.slug.statuses) {
                    stats.push(s);
                }
            }
            else if (typeof alt.slug.statuses == "string") {
                stats.push(alt.slug.statuses);
            }
        }
        let temps = [];
        for (let stat of stats) {
            if (!temps.includes(stat)) {
                temps.push(stat);
            }
        }
        stats = temps;
        return stats;
    }
    static sweepStatuses(statuses) {
        let stats;
        if (!statuses) {
            return [];
        }
        let temps = [];
        for (let stat of stats) {
            if (!temps.includes(stat)) {
                temps.push(stat);
            }
        }
        stats = temps;
        return stats;
    }
}
exports.Mod = Mod;
