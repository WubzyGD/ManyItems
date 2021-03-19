import {Random} from "../../index";

export class HealthHandler {

    baseHealing: number | Random;



    constructor (baseHealing: number | Random) {
        this.baseHealing = baseHealing;
    };

}