export declare class Die {
    sides: number;
    constructor(sides: number);
    roll(modifier?: number): number;
}
export declare const Dice: {
    d4: Die;
    d6: Die;
    d8: Die;
    d10: Die;
    d12: Die;
    d20: Die;
    d100: Die;
};
