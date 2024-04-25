import {BasicItem} from "../basicitem";
import {ErrorBuilder} from "../errors";
import {Feature} from "./feature";

export class XP extends Feature {

    runGainHookOnLevelUp: boolean = true;
    
    levelCheck: LevelCheckFunction = () => false;
    gainHook: GainHookFunction = () => {};
    levelHook: LevelHookFunction = (tl, xp) => {xp.forceXP(0);};
    levelAlgorithm: LevelAlgorithmFunction = x => Math.ceil((x * 11) + (x ** 1.05));
    
    private _xp: number = 0;
    private _level: number = 1;

    static basicLevelHook: LevelHookFunction = (tl, xp) => {xp.runGainHookOnLevelUp ? xp.xp -= xp.currentLevelMax : xp.forceXP(xp.xp - xp.currentLevelMax);};



    constructor(startLevel?: number, startXP?: number) {
        super("XP", 'xp');
        this._level = startLevel || this.level;
        this.xp = startXP || this.xp;
    }



    public applyTo(toApply: BasicItem): XP {super.applyTo(toApply); return this;}
    public async asyncApplyTo(toApply: BasicItem): Promise<XP> {await super.asyncApplyTo(toApply); return this;}
    public setHook(hook: (feature?: Feature, item?: BasicItem) => void): XP {super.setHook(hook); return this;} //TODO better way to do this?

    public forceXP(xp: number, levelCheck: boolean = true): XP { //set XP with NO HOOK.
        this._xp = xp;
        if (levelCheck) {this.levelCheck(this);}
        return this;
    } 

    public forceLevel(level: number): XP { //set level with NO HOOK. DOES NOT RESET XP.
        this._level = level;
        return this;
    } 

    public levelUp(): XP {
        this.level++;
        return this;
    }

    public setLevelCheck(newFunc: LevelCheckFunction): XP {this.levelCheck = newFunc; return this;}
    public setGainHook(newFunc: GainHookFunction): XP {this.gainHook = newFunc; return this;}
    public setLevelAlgorithm(newFunc: LevelAlgorithmFunction): XP {this.levelAlgorithm = newFunc; return this;}

    public setLevelHook(newFunc: LevelHookFunction, wrap: boolean=true): XP { //to run on level up. "wrap" will set XP to 0.
        //! DISABLE WRAP if you have functionality in your hook that might block a levelup. the wrapper will still run.
        this.levelHook = wrap
            ? (tl, xp) => {XP.basicLevelHook(tl, this); return newFunc(tl, xp);}
            : newFunc;
        return this;
    }

    
    get xp(): number {return this._xp;}
    get level(): number {return this._level;}

    get currentLevelMax(): number {return this.levelAlgorithm(this.level);}

    set xp(xp: number) {//set XP. gain hook can return false to abort gain, a fixed number to force set, or true to set to param number
        const res = this.gainHook(xp, this);
        if (res === false) {return;}
        if (typeof res === "number") {
            if (xp < 0) {throw new XPAssignmentError("Received less than 0 value from gainHook() that could not be applied to XP#xp.");}
            this._xp = res;
        }
        else {this._xp = xp;}
        if (this.levelCheck(this)) {this.levelUp();}
        return;
    }

    set level(level: number) {
        const res = this.levelHook(level, this);
        if (res === false) {return;}
        if (typeof res === "number") {
            if (level < 0) {throw new XPAssignmentError("Received less than 0 value from levelHook() that could not be applied to XP#level.");}
            this._level = res;
            return;
        }
        this._level = level;
        return;
    }

}



export const XPAssignmentError = ErrorBuilder('XPAssignmentError');
export const LevelAssignmentError = ErrorBuilder('LevelAssignmentError');

export type LevelCheckFunction = (xpInstance: XP) => boolean;
export type GainHookFunction = (xpToGain: number, xpInstance: XP) => number | boolean | void;
export type LevelHookFunction = (toLevel: number, xpInstance: XP) => number | boolean | void;
export type LevelAlgorithmFunction = (x: number, xpInstance?: XP) => number;