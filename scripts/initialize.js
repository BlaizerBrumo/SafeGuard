import * as Minecraft from '@minecraft/server';
import { logDebug, scoreboardAction } from './assets/util';
import * as config from './config';
import { globalBanList } from './assets/globalBanList.js'; // Added import
const world = Minecraft.world;

export function Initialize(){
    Minecraft.system.run(() => {
        // Ensure scoreboard objectives exist
        const objectives = [
            "safeguard:gametest_on",
            "safeguard:vanish",
            "safeguard:notify",
            "safeguard:setup_success"
        ];
        objectives.forEach(obj => {
            if (world.scoreboard.getObjective(obj) == undefined) {
                try {
                    world.scoreboard.addObjective(obj, obj); // Use obj as display name too, or customize
                    logDebug(`[SafeGuard] Created scoreboard objective: ${obj}`);
                } catch (e) {
                    logDebug(`[SafeGuard] Failed to create scoreboard objective ${obj}:`, e);
                }
            }
        });

        // Initialize Gamerules
        if (world.getDynamicProperty("safeguard:gamerulesSet") === undefined) {
            try {
                world.setGameRule(Minecraft.GameRule.sendCommandFeedback, false);
                world.setGameRule(Minecraft.GameRule.commandBlockOutput, false);
                world.setDynamicProperty("safeguard:gamerulesSet", true);
                logDebug("[SafeGuard] Initialized gamerules (sendCommandFeedback, commandBlockOutput).");
            } catch (e) {
                logDebug("[SafeGuard] Failed to initialize gamerules:", e);
            }
        }

        // world.worldBorder can be set directly if needed, or managed by other game logic/commands.
        // Example: world.worldBorder = world.getDynamicProperty("safeguard:worldBorder") ?? 0;
        // For this task, we are removing the specific legacy_WorldBordertoV2() call and related conditional.
        // If worldBorder needs to be initialized from a dynamic property, that logic should be explicit.
        // For now, just ensuring the property is read if it exists.
        const existingWorldBorder = world.getDynamicProperty("safeguard:worldBorder");
        if (typeof existingWorldBorder === 'number') {
            world.worldBorder = existingWorldBorder;
        }


        if (!world.safeguardUnbanQueue) world.safeguardUnbanQueue = []; // This seems like a runtime variable, not directly from dynamic property string parsing here.
        
        // Check for script setup first, then scoreboard as a fallback.
        world.safeguardIsSetup = world.getDynamicProperty("safeguard:scriptSetupComplete") === true || 
                                 world.scoreboard.getObjective("safeguard:setup_success") !== undefined;
        
        world.safeguardUnbanQueue = (world.getDynamicProperty("safeguard:unbanQueue") ?? "").split(",").filter(name => name.trim() !== "");

        
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

        // Load Global Ban List from globalBanList.js if dynamic property doesn't exist
        if (world.getDynamicProperty("safeguard:gbanList") === undefined) {
            world.setDynamicProperty("safeguard:gbanList", JSON.stringify(globalBanList)); // Use the imported globalBanList
            logDebug("[SafeGuard] Initialized global ban list dynamic property from globalBanList.js seed.");
        }

        world.setDynamicProperty("safeguard:scriptSetupComplete", true); // Set script setup flag
        logDebug("[SafeGuard] Initialized and script setup marked as complete.");
        world.safeguardInitialized = true; // General initialization flag
    })
}