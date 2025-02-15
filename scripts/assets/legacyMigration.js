import { Player, world } from "@minecraft/server";
import { getPlayerByName, logDebug, scoreboardAction } from "./util";
import { SafeguardModule } from "../classes/module";


export function legacy_WorldBordertoV2(){
    let currentWorldBorderScoreboardName;
    for(const objective of world.scoreboard.getObjectives()){
        if (objective.id.startsWith("safeguard:worldBorder:")) {
            currentWorldBorderScoreboardName = objective.id;
            break;
            //break to optimize performance
        }
    };
    if(!currentWorldBorderScoreboardName) return false;
    const currentBorder = currentWorldBorderScoreboardName.split("safeguard:worldBorder:")[1];
    world.setDynamicProperty("safeguard:worldBorder",parseInt(currentBorder));
    world.worldBorder = currentBorder;
    scoreboardAction(currentWorldBorderScoreboardName,"remove");
    logDebug("[SafeGuard] Successfully migrated world border from legacy to v2");
}

export function legacy_MuteToV2(player){
    player.removeTag("muted");
    
    player.mute("SafeGuard AntiCheat","No reason provided.",-1);
    logDebug(`[SafeGuard] Successfully migrated "${player.name}" 's mute from legacy to v2`);
}

/**
 * @param {Player} player - The player to transfer ban from.
 */
export function legacy_BanToV2(player){
    if (!(player instanceof Player)) throw TypeError(`Parameter "player" is not instanceof player`);
    let banInfo;
    for(const tag of player.getTags()){
        if (tag.startsWith("safeguardBanInfo**")) {
            banInfo = tag;
            break;
            //break to optimize performance       
        }
    }
    const banInfoArray = banInfo.split("**");
    const isPermanent = banInfoArray[1];
    const timeStamp = banInfoArray[2];
    const adminName = banInfoArray[3];
    const reason = banInfoArray[4];

    //remove any legacy ban tags the user might have
    player.removeTag(banInfo);
    player.removeTag("safeguard:Ban");
    player.removeTag("Ban");
    player.removeTag("ac_ban");
    player.removeTag("ban");

    player.ban(reason,parseInt(timeStamp),isPermanent === "true",adminName);

    //kick the player assuming when they join back the system will display their ban info
    player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r You were banned, rejoin to find out more info.`);

    logDebug(`[SafeGuard] Successfully migrated "${player.name}" 's ban from legacy to v2`);
}

function checkAndToggleModules() {
    const scoreboards = [
        "gmc_on", "grief_on", "item_on", "auto_mod_on", "death_coord_on", "death_effect", "end_lock", "welcome_on",
        "safeguard:cps_check", "safeguard:killaura_check", "safeguard:nuker_check", "safeguard:spammer_protection",
        "safeguard:diamond_alert", "safeguard:netherite_alert",
        "safeguard:fly_check", "safeguard:scaffold_check", "safeguard:velocity_check", "safeguard:anti_combatlog"
    ];

    for (const scoreboardName of scoreboards) {
        const objectiveExists = world.scoreboard.getObjective(scoreboardName) !== undefined;

        if (objectiveExists) {
            try {
                // Get module name from scoreboard name
                const moduleName = convertScoreboardToModule(scoreboardName);

                if (moduleName) {
                    // Toggle the module using SafeguardModule
                    SafeguardModule.toggleModule(moduleName);
                } else {
                    logDebug(`[SafeGuard] No matching module found for scoreboard: ${scoreboardName}`);
                }
            } catch (error) {
                logDebug(`[SafeGuard] Error toggling module for scoreboard: ${scoreboardName} - ${error.message}`);
            }
        } else {
            logDebug(`[SafeGuard] Scoreboard "${scoreboardName}" does not exist.`);
        }
    }
}

// Helper function to map scoreboard names to module names
function convertScoreboardToModule(scoreboardName) {
    const moduleMap = {
        "gmc_on": SafeguardModule.Modules.antiGmc,
        "grief_on": SafeguardModule.Modules.antiGrief,
        "item_on": SafeguardModule.Modules.antiItem,
        "auto_mod_on": SafeguardModule.Modules.autoMod,
        "death_coord_on": SafeguardModule.Modules.deathCoords,
        "death_effect": SafeguardModule.Modules.deathEffect,
        "end_lock": SafeguardModule.Modules.endLock,
        "welcome_on": SafeguardModule.Modules.welcomer,
        "safeguard:cps_check": SafeguardModule.Modules.cpsCheck,
        "safeguard:killaura_check": SafeguardModule.Modules.killauraCheck,
        "safeguard:nuker_check": SafeguardModule.Modules.nukerCheck,
        "safeguard:spammer_protection": SafeguardModule.Modules.spammerProtection,
        "safeguard:diamond_alert": SafeguardModule.Modules.OreAlerts.diamondOre,
        "safeguard:netherite_alert": SafeguardModule.Modules.OreAlerts.netheriteOre,
        "safeguard:fly_check": SafeguardModule.Modules.flyCheck,
        "safeguard:scaffold_check": SafeguardModule.Modules.scaffoldCheck,
        "safeguard:velocity_check": SafeguardModule.Modules.velocityCheck,
        "safeguard:anti_combatlog": SafeguardModule.Modules.antiCombatlog
    };

    return moduleMap[scoreboardName] ?? null;
}


export function legacy_ScoreboardsToV2(){
    
    

    const notifyScoreboard = world.scoreboard.getObjective("notify");
    if(notifyScoreboard){
        //expect error if safeguard:notify already exists
        const newNotifyScoreboard = world.scoreboard.addObjective("safeguard:notify") ?? world.scoreboard.getObjective("safeguard:notify");
        let notifyPlayerList = new Set();
        
        for(const notifyPlayer of notifyScoreboard.getParticipants()){
            const playerName = notifyPlayer.getEntity().name;
            notifyPlayerList.add(playerName);
            logDebug(`[SafeGuard] ${playerName} is a participant of notify`)
        }
        
        for(const playerName of notifyPlayerList){
            const player = getPlayerByName(playerName);
            if(!player) continue;
            newNotifyScoreboard.setScore(player.scoreboardIdentity,1);
            notifyPlayerList.delete(playerName);
            logDebug(`[SafeGuard] Successfully migrated ${playerName} to v2 notify scoreboard`)
        }

        world.setDynamicProperty('safeguard:legacyNotifyPlayerList',[...notifyPlayerList].join(","));
    }
    
    checkAndToggleModules();

    logDebug("[SafeGuard] Finished migrating modules from legacy to v2");

    const scoreboards = [
        "Shulkbarrel_ban",
        "ac_banned",
        "anti_cbe_toggle",
        "antifly_toggle",
        "antinuker_toggle",
        "auto_mod_off",
        "auto_mod_on",
        "auto_mod_toggle",
        "banned",
        "barrel_lock",
        "cbe_warning",
        "cpscheck_toggle",
        "death_coord",
        "death_coord_off",
        "death_coord_on",
        "death_effect",
        "death_effect_off",
        "death_toggle",
        "diamond_toggle",
        "end_lock",
        "end_yes",
        "endnether_toggle",
        "gmc_off",
        "gmc_on",
        "gmc_toggle",
        "gmc_warning",
        "grief_off",
        "grief_on",
        "grief_toggle",
        "grief_warning",
        "ill_warning",
        "item_off",
        "item_on",
        "item_toggle",
        "killaura_toggle",
        "nethr_toggle",
        "notify",
        "safeguard:anti_combatlog",
        "safeguard:combatlog_toggle",
        "safeguard:cps_check",
        "safeguard:fly_check",
        "safeguard:killaura_check",
        "safeguard:nuker_check",
        "safeguard:scaffold_check",
        "safeguard:scaffold_toggle",
        "safeguard:spammer_protection",
        "safeguard:velocity_check",
        "safeguard:velocity_check_toggle",
        "safeguard:diamond_alert",
        "safeguard:netherite_alert",
        "setup_success",
        "shulkBarrel_lock",
        "shulk_lock",
        "shulkbarrel_yes",
        "spammer_toggle",
        "vanish",
        "welcome",
        "welcome_off",
        "welcome_on",
        "welcomer",
        "warning",
        "anti_lag",
        "safeguard:banned"
    ];
    

    for(const scoreboard of scoreboards){
        try{
            world.scoreboard.removeObjective(scoreboard);
        }
        catch(e){continue;}
        logDebug(`[SafeGuard] Removed legacy scoreboard: ${scoreboard}`)
    }
    logDebug(`[SafeGuard] Finished removing legacy scoreboards`);
}