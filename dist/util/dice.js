"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dice = exports.Die = void 0;
const random_1 = require("./random");
class Die {
    constructor(sides) { this.sides = sides; }
    roll(modifier) { return (random_1.Random.calc_int(this.sides) + (modifier ? modifier : 0)); }
}
exports.Die = Die;
exports.Dice = {
    d4: new Die(4),
    d6: new Die(6),
    d8: new Die(8),
    d10: new Die(10),
    d12: new Die(12),
    d20: new Die(20),
    d100: new Die(100)
};
