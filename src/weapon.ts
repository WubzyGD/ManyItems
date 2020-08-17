export class Weapon {
    name: string;

    author: string;
    rarity: string;
    material: string;
    description: string;

    customDamage: object;

    constructor (name: string, metaInfo?: MetaInfo | null, customDamage?: CustomDamage) {
        this.name = name;
        if (Weapon.checkParam(customDamage)) {this.customDamage = Weapon.verifyCustomDamage(customDamage);}
        if (Weapon.checkParam(metaInfo)) {Weapon.verifyMetaInfo(metaInfo, this);}
    };

    public addCustomDamage(damage: number, statuses: Effects): Weapon {
        this.customDamage = {damage: damage, statuses: statuses};
        return this;
    };

    public addMetaInfo(description: string, rarity: string, material: string, author: string): Weapon {
        this.author = author;
        this.description = description;
        this.rarity = rarity;
        this.material = material;

        return this;
    };

    public setAuthor(authorName: string): Weapon {
        this.author = authorName;
        return this;
    };

    public setDescription(weaponDescription: string): Weapon {
        this.description = weaponDescription;
        return this;
    };

    private static verifyCustomDamage(cd: object): CustomDamage {
        function checkObj(obj: object): obj is CustomDamage {
            return "damage" in obj;
        }

        if (checkObj(cd)) {return cd;}
        else {throw new SyntaxError("Invalid Custom Damage passed into constructor for Weapon.");}
    };

    private static verifyMetaInfo(mi: object, weapon: Weapon): MetaInfo {
        function checkObj(obj: object): obj is MetaInfo {
            return "author" in obj;
        }

        if (checkObj(mi)) {
            weapon.author = mi.author;
            weapon.description = mi.description;
            weapon.rarity = mi.rarity;
            weapon.material = mi.material;

            return mi;
        } else {throw new SyntaxError("Invalid Meta Info passed into constructor for Weapon.");}
    };

    private static checkParam(param: object | null) {return typeof param != "undefined" && param};
}

type Effects = string | Array<string> | null;

interface CustomDamage {
    damage: number,
    statuses: Effects
}

interface MetaInfo {
    description: string,
    rarity: string,
    material: string,
    author: string
}

//interface Lore {};



////////////////////



let sword = new Weapon("Sword");
sword.setAuthor("WubzyGD");
sword.setDescription("A really cool sword.");
sword.addMetaInfo(sword.description, "Rare", "Iron", sword.author);
sword.addCustomDamage(10, "Slicing");