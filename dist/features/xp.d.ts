import { BasicItem } from "../basicitem";
import { Feature } from "./feature";
export declare class XP extends Feature {
    runGainHookOnLevelUp: boolean;
    levelCheck: LevelCheckFunction;
    gainHook: GainHookFunction;
    levelHook: LevelHookFunction;
    levelAlgorithm: LevelAlgorithmFunction;
    private _xp;
    private _level;
    static basicLevelHook: LevelHookFunction;
    constructor(startLevel?: number, startXP?: number);
    applyTo(toApply: BasicItem): XP;
    asyncApplyTo(toApply: BasicItem): Promise<XP>;
    setHook(hook: (feature?: Feature, item?: BasicItem) => void): XP;
    forceXP(xp: number, levelCheck?: boolean): XP;
    forceLevel(level: number): XP;
    levelUp(): XP;
    setLevelCheck(newFunc: LevelCheckFunction): XP;
    setGainHook(newFunc: GainHookFunction): XP;
    setLevelAlgorithm(newFunc: LevelAlgorithmFunction): XP;
    setLevelHook(newFunc: LevelHookFunction, wrap?: boolean): XP;
    get xp(): number;
    get level(): number;
    get currentLevelMax(): number;
    set xp(xp: number);
    set level(level: number);
}
export declare const XPAssignmentError: {
    new (message?: string): {
        name: string;
        message: string;
        stack?: string;
    };
};
export declare const LevelAssignmentError: {
    new (message?: string): {
        name: string;
        message: string;
        stack?: string;
    };
};
export type LevelCheckFunction = (xpInstance: XP) => boolean;
export type GainHookFunction = (xpToGain: number, xpInstance: XP) => number | boolean | void;
export type LevelHookFunction = (toLevel: number, xpInstance: XP) => number | boolean | void;
export type LevelAlgorithmFunction = (x: number, xpInstance?: XP) => number;
