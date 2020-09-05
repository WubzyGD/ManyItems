"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dice = exports.RarityValkyrie = void 0;
const random_1 = require("./random");
var RarityValkyrie;
(function (RarityValkyrie) {
    RarityValkyrie["R1"] = "Scrap";
    RarityValkyrie["R2"] = "Common";
    RarityValkyrie["R3"] = "Uncommon";
    RarityValkyrie["R4"] = "Rare";
    RarityValkyrie["R5"] = "Legendary";
    RarityValkyrie["R6"] = "Exotic";
    RarityValkyrie["R7"] = "Exalted";
})(RarityValkyrie = exports.RarityValkyrie || (exports.RarityValkyrie = {}));
exports.dice = {
    d4: new random_1.Random("bubble", null, { min: 1, max: 4 }, null),
    d6: new random_1.Random("bubble", null, { min: 1, max: 6 }, null),
    d8: new random_1.Random("bubble", null, { min: 1, max: 8 }, null),
    d10: new random_1.Random("bubble", null, { min: 1, max: 10 }, null),
    d12: new random_1.Random("bubble", null, { min: 1, max: 12 }, null),
    d20: new random_1.Random("bubble", null, { min: 1, max: 20 }, null),
    d100: new random_1.Random("bubble", null, { min: 1, max: 100 }, null)
};
