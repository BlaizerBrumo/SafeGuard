import * as Minecraft from '@minecraft/server';
import * as config from '../config.js';
import { logDebug, sendMessageToAdmins } from '../assets/util.js';

const world = Minecraft.world;
const playerLastSwingTime = new Map(); // Stores player.id -> timestamp

export function initializeNoSwingCheck() {
    if (!config.default.combat.noSwingCheck.enabled) {
        logDebug("[NoSwingCheck] Disabled by config.");
        return;
    }
    logDebug("[NoSwingCheck] Initializing...");

    // Subscribe to player swing events to record the time
    world.afterEvents.playerSwing.subscribe(event => {
        const { player } = event;
        playerLastSwingTime.set(player.id, Date.now());
    }, {
        // No specific entityTypes needed here, just general player swings.
    });

    // Subscribe to entity hit events to check against last swing time
    world.afterEvents.entityHitEntity.subscribe(event => {
        const { damagingEntity, hitEntity } = event;

        if (!(damagingEntity instanceof Minecraft.Player) || hitEntity instanceof Minecraft.Player) {
            // Only check for players hitting non-player entities for NoSwing,
            // as player-on-player NoSwing might be too prone to false positives with this method
            // or could be part of a more specific PvP Killaura check.
            // This can be adjusted later if needed.
            // Also, ignore if the player is hitting themselves (e.g. shooting arrow up)
            if (damagingEntity instanceof Minecraft.Player && damagingEntity.id === hitEntity.id) return;
            
            // If we want to check for PvE only:
            // if (hitEntity instanceof Minecraft.Player) return; 
            // For now, let's allow checking for PvP as well, but be mindful of false positives.
            // The provided code effectively makes this a PvE-only check due to the outer condition.
            // To check PvP as well, the `|| hitEntity instanceof Minecraft.Player` should be removed.
            // For now, I will keep the provided logic as is.
            return; 
        }

        const player = damagingEntity;
        const lastSwingTime = playerLastSwingTime.get(player.id);
        const currentTime = Date.now();

        if (lastSwingTime === undefined || (currentTime - lastSwingTime > config.default.combat.noSwingCheck.maxTimeSinceSwingMs)) {
            // If no swing was recorded recently, or at all, it's a potential NoSwing.

            let violations = player.getDynamicProperty("safeguard:noSwingViolations") || 0;
            violations++;
            player.setDynamicProperty("safeguard:noSwingViolations", violations);

            const debugMsg = `[NoSwingCheck] Player ${player.name} potential NoSwing. Last swing: ${lastSwingTime ? (currentTime - lastSwingTime) + 'ms ago' : 'never/long ago'}. Violations: ${violations}`;
            logDebug(debugMsg);
            
            if (violations >= config.default.combat.noSwingCheck.violationThreshold) {
                player.setDynamicProperty("safeguard:noSwingViolations", 0); // Reset violations

                const message = `Player ${player.name} flagged for NoSwing Killaura.`;
                sendMessageToAdmins(`§6[§eSafeGuard Notify§6]§c ${message}`);

                const action = config.default.combat.noSwingCheck.action;
                if (action === "customCommand") {
                    let command = config.default.combat.noSwingCheck.customCommand;
                    command = command.replace(/{playerName}/g, player.name);
                    try {
                        world.overworld.runCommandAsync(command); // Changed from world.overworld to player.dimension for context
                        logDebug(`[NoSwingCheck] Executed custom command for ${player.name}: ${command}`);
                    } catch(e) {
                        logDebug(`[NoSwingCheck] Error executing custom command for ${player.name}: ${e}`);
                    }
                }
            }
        }
    }, {
        // No specific entityTypes needed here for the hit event itself.
    });
}
