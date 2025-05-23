import { system, world } from '@minecraft/server';
import { newCommand } from '../handle';

newCommand({
    name:"lagclear",
    description:"Clears lag by killing entities",
    run: async (data) => {
        try {
            const { dimension, name: playerName } = data.player; // Get player name for logging

            world.sendMessage(`§6[§eSafeGuard§6]§r§a Ground items will be cleared in 10 seconds...`);

            await system.waitTicks(20 * 5); // Generally safe

            for (let seconds = 5; seconds >= 1; seconds--) {
                world.sendMessage(`§6[§eSafeGuard§6]§r§a Ground items will be cleared in ${seconds} seconds...`);
                await system.waitTicks(20); // Generally safe
            }

            const entityTypesToClear = [
                { type: "xp_orb" },
                { families: ["monster"] },
                { type: "arrow" },
                { type: "area_effect_cloud" },
                { type: "item" }
            ];

            let totalKilled = 0;

            for (const queryOptions of entityTypesToClear) {
                const entities = dimension.getEntities(queryOptions); // API Call
                for (const entity of entities) {
                    try {
                        entity.remove(); // API Call
                        totalKilled++;
                    } catch (entityRemoveError) {
                        logDebug(`[SafeGuard ERROR] Failed to remove entity ${entity.typeId || 'unknown type'} during lagclear:`, entityRemoveError, entityRemoveError.stack);
                    }
                }
            }
            
            logDebug(`[SafeGuard] Lagclear command executed by ${playerName}, removed ${totalKilled} entities.`);
            world.sendMessage(`§6[§eSafeGuard§6]§r§a Lag cleared! Removed ${totalKilled} entities.§r`);
        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in lagclear command:", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to clear lag. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in lagclear:", sendError, sendError.stack);
                }
            }
        }
    }
})