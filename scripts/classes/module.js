import {world} from "@minecraft/server";
import { logDebug } from "../assets/util";



class SafeGuardModule {
    Modules = {
        antiGmc: "Anti GMC",
        antiGrief: "Anti Grief",
        autoMod: "Auto Mod",
        deathCoords: "Death Coords",
        deathEffect: "Death Effect",
        endLock: "End Lock",
        netherLock: "Nether Lock",
        welcomer: "Welcomer",
        cpsCheck: "High CPS Check",
        killauraCheck: "Anti Killaura",
        nukerCheck: "Anti Block Nuker",
        spammerProtection: "Anti Spammer",
        flyCheck: "Fly Check",
        scaffoldCheck: "Scaffold Check",
        velocityCheck: "Velocity Check",
        antiCombatlog: "Anti Combatlog",
        antiNamespoof: "Anti Namespoof",
        OreAlerts:{
            diamondOre: "Diamond Ore Alerts",
            netheriteOre: "Netherite Ore Alerts"
        }
    }
    getModuleID(module){
        if(!this.getValidModules().includes(module)) throw ReferenceError(`"${module}" is not a valid SafeGuard module.`);
        const moduleEntries = Object.entries(this.Modules);
        
        for(const [key,value] of moduleEntries){
            if(typeof(value) == "object"){
                const subModuleEntries = Object.entries(value);
                for(const [subKey, subValue] of subModuleEntries){
                    if(subValue === module) return `${key}:${subKey}`;
                }
            }
            else{
                if(value === module) return key;
            }
        }
        throw ReferenceError(`"${module}" was not found in modules, nor sub modules.`);
        
    }
    getModuleStatus(module){
        if(!this.getValidModules().includes(module)) throw ReferenceError(`"${module}" is not a valid SafeGuard module.`);
    
        return world.getDynamicProperty(`safeguard:${this.getModuleID(module)}`) ?? false;
    }
    toggleModule(module){
        if(!this.getValidModules().includes(module)) throw ReferenceError(`"${module}" is not a valid SafeGuard module.`);
    
        const moduleID = this.getModuleID(module);
        const currentModuleState = world.getDynamicProperty(`safeguard:${moduleID}`) ?? false;
    
        world.setDynamicProperty(`safeguard:${moduleID}`,!currentModuleState);
    
        logDebug(`[SafeGuard] Toggled ${moduleID} to ${!currentModuleState}`);
    }
    getValidModules(skipNestedJSON = false){
        const moduleArray = [];
        for(const object of Object.values(this.Modules)){
            if(typeof(object) == "object"){
                if(skipNestedJSON) continue;
                else moduleArray.push(...Object.values(object));
                continue;
            }
            moduleArray.push(object);
        }
        return moduleArray;
    }

};  

export const SafeguardModule = new SafeGuardModule();
