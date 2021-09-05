export class PlayerEffect {

    name: string;
    ignoreRaces: string[];
    healthEffect;


    constructor(name: string, ignoreRaces?: string[]) {
        this.name = name;
        this.ignoreRaces = ignoreRaces || [];
    }





}