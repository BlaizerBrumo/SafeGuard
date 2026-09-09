import { world } from "@minecraft/server";
import { logDebug } from "../assets/util";
import * as config from "../config";



class SafeGuardModule {
    Modules = {
        antiGmc: { name: "Anti GMC", description: "Stops non-admins from switching to creative mode" },
        autoMod: { name: "Auto Mod", description: "Automatically bans players who keep getting flagged" },
        deathCoords: { name: "Death Coords", description: "Tells players their coordinates when they die" },
        deathEffect: { name: "Death Effect", description: "Plays a visual effect when a player dies" },
        endLock: { name: "End Lock", description: "Stops players from entering the End" },
        netherLock: { name: "Nether Lock", description: "Stops players from entering the Nether" },
        welcomer: { name: "Welcomer", description: "Sends a message when someone joins and what device they're on" },
        cpsCheck: { name: "High CPS Check", description: "Flags players clicking faster than humanly possible" },
        killauraCheck: { name: "Killaura Check", description: "Flags players with killaura behavior" },
        fovCheck: { name: "FOV Check", description: "Flags players hitting or placing blocks without looking at them" },
        nukerCheck: { name: "Anti Block Nuker", description: "Flags players breaking many blocks at once" },
        spammerProtection: { name: "Anti Spammer", description: "Stops players from spamming chat" },
        scaffoldCheck: { name: "Anti Scaffold", description: "Flags players placing blocks with suspicious head positions" },
        airPlaceCheck: { name: "Anti Air Place", description: "Flags players placing blocks with nothing supporting them" },
        antiCombatlog: { name: "Anti Combatlog", description: "Punishes players who leave the game while in combat" },
        antiNamespoof: { name: "Anti Namespoof", description: "Bans players with invalid usernames" },
        invalidDurabilityCheck: { name: "Anti Invalid Durability", description: "Fixes items which are unbreakable or have invalid durability" },
        invalidEquipmentCheck: { name: "Anti Invalid Equipment", description: "Bans players wearing impossible items in armor slots" },
        autoTotemCheck: { name: "Auto Totem Check", description: "Flags players retoteming faster than humanly possible" },
        antiFastUse: { name: "Anti Fast Use", description: "Flags players throwing potions/snowballs/xp bottles faster than humanly possible" },
        autoCrystalCheck: { name: "Auto Crystal Check", description: "Flags auto crystal behavior" },
        noSwingCheck: { name: "No Swing Check", description: "Flags players attacking, placing, or breaking with no arm swing beforehand" },
        OreAlerts: {
            diamondOre: { name: "Diamond Ore Alerts", description: "Notifies admins when someone mines diamond ore" },
            netheriteOre: { name: "Netherite Ore Alerts", description: "Notifies admins when someone mines ancient debris" }
        }
    }

    constructor() {
        this._moduleIdByName = new Map();
        this._descriptionByName = new Map();
        this._allModuleNames = [];
        this._topLevelModuleNames = [];

        for (const [key, value] of Object.entries(this.Modules)) {
            if (!("name" in value)) {
                for (const [subKey, subValue] of Object.entries(value)) {
                    this._moduleIdByName.set(subValue.name, `${key}:${subKey}`);
                    this._descriptionByName.set(subValue.name, subValue.description ?? "");
                    this._allModuleNames.push(subValue.name);
                }
            }
            else {
                this._moduleIdByName.set(value.name, key);
                this._descriptionByName.set(value.name, value.description ?? "");
                this._allModuleNames.push(value.name);
                this._topLevelModuleNames.push(value.name);
            }
        }
    }

    getModuleID(module) {
        const moduleID = this._moduleIdByName.get(module);
        if (moduleID === undefined) throw ReferenceError(`"${module}" is not a valid SafeGuard module.`);
        return moduleID;
    }
    getDescription(module) {
        return this._descriptionByName.get(module) ?? "";
    }
    getModuleStatus(module) {
        const moduleID = this._moduleIdByName.get(module);
        if (moduleID === undefined) throw ReferenceError(`"${module}" is not a valid SafeGuard module.`);

        return world.getDynamicProperty(`safeguard:${moduleID}`) ?? false;
    }
    toggleModule(module) {
        const moduleID = this.getModuleID(module);
        const currentModuleState = world.getDynamicProperty(`safeguard:${moduleID}`) ?? false;

        world.setDynamicProperty(`safeguard:${moduleID}`, !currentModuleState);

        logDebug(`[SafeGuard] Toggled ${moduleID} to ${!currentModuleState}`);
    }
    getValidModules(skipNestedJSON = false) {
        return skipNestedJSON ? this._topLevelModuleNames : this._allModuleNames;
    }

};

export const SafeguardModule = new SafeGuardModule();
