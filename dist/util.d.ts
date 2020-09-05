import { Random } from "./random";
export declare enum RarityValkyrie {
    R1 = "Scrap",
    R2 = "Common",
    R3 = "Uncommon",
    R4 = "Rare",
    R5 = "Legendary",
    R6 = "Exotic",
    R7 = "Exalted"
}
export declare const dice: {
    d4: Random;
    d6: Random;
    d8: Random;
    d10: Random;
    d12: Random;
    d20: Random;
    d100: Random;
};
