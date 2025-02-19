import * as Minecraft from '@minecraft/server';
import { legacy_ScoreboardsToV2, legacy_WorldBordertoV2 } from './assets/legacyMigration';
import { logDebug } from './assets/util';
import * as config from './config';
const world = Minecraft.world;

export function Initialize(){
    if (world.scoreboard.getObjective("safeguard:gametest_on") == undefined) {
        world.scoreboard.addObjective("safeguard:gametest_on", "Gametest Is On");
    }
    if (!world.worldBorder) {
        const worldBorder = world.getDynamicProperty("safeguard:worldBorder");
        if (!worldBorder) legacy_WorldBordertoV2();
        else world.worldBorder = worldBorder ?? 0;
    }
    if (world.scoreboard.getObjective("notify")){
        //NOTE: SafeGuard notify migration queue is handled in index.js at initialSpawn
        legacy_ScoreboardsToV2();
    }
    world.safeguardIsSetup = world.scoreboard.getObjective("safeguard:setup_success") !== undefined; 
    
    world.safeguardNotifyMigrationQueue = (world.getDynamicProperty("safeguard:legacyNotifyPlayerList") ?? "").split(",");
    world.safeguardUnbanQueue = (world.getDynamicProperty("safeguard:unbanQueue") ?? "").split(",");

    
    logDebug(`[SafeGuard] Unban Queue: `,world.safeguardUnbanQueue.join(","));

    world.safeguardDeviceBan = (world.getDynamicProperty("safeguard:deviceBan") ?? "").split(",");


    world.safeguardVersion = world.getDynamicProperty("safeguard:version");
    if(!world.safeguardVersion){
        world.setDynamicProperty("safeguard:version",config.default.version);
        world.safeguardVersion = config.default.version;
    }
    //TODO: see if setting up logs works. Make sure to add a limit to how much logs can be displayed

    let editedConfig = world.getDynamicProperty("safeguard:config");
    if(editedConfig){
        editedConfig = JSON.parse(editedConfig);
        for (const i of Object.keys(editedConfig)) {
            config.default[i] = editedConfig[i];
        }
        logDebug(`Loaded config from dynamic properties.`)
    }

    logDebug("[SafeGuard] Initialized");
    world.safeguardInitialized = true;
}