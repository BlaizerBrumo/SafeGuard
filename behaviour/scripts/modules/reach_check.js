import * as Minecraft from '@minecraft/server';
import * as config from '../config.js';
import { logDebug, sendMessageToAdmins } from '../assets/util.js';

const world = Minecraft.world;

function handleReachViolation(player, reachTypeStr, actualDistance, maxAllowedDistance, reachConfig) {
    let violations = player.getDynamicProperty("safeguard:reachViolations") || 0;
    violations++;
    player.setDynamicProperty("safeguard:reachViolations", violations);

    logDebug(`[ReachCheck] Player ${player.name} exceeded ${reachTypeStr} reach. Distance: ${actualDistance.toFixed(2)}/${maxAllowedDistance}. Violations: ${violations}`);

    if (violations >= reachConfig.violationThreshold) {
        player.setDynamicProperty("safeguard:reachViolations", 0); // Reset violations

        const message = `Player ${player.name} flagged for Reach (${reachTypeStr}). Distance: ${actualDistance.toFixed(2)}/${maxAllowedDistance}`;
        sendMessageToAdmins(`§6[§eSafeGuard Notify§6]§c ${message}`);

        const action = reachConfig.action;
        if (action === "customCommand" && reachConfig.customCommand) {
            let command = reachConfig.customCommand;
            command = command.replace(/{playerName}/g, player.name)
                             .replace(/{reachType}/g, reachTypeStr)
                             .replace(/{distance}/g, actualDistance.toFixed(2))
                             .replace(/{maxDistance}/g, maxAllowedDistance.toFixed(2)); // Ensure maxDistance is also formatted
            try {
                // It's generally safer to run commands from the player's dimension or overworld
                player.dimension.runCommandAsync(command); 
                logDebug(`[ReachCheck] Executed custom command for ${player.name}: ${command}`);
            } catch(e) {
                logDebug(`[ReachCheck] Error executing custom command for ${player.name}: ${e}`);
            }
        }
        // Return true if the action implies cancellation and the event is cancellable
        return action === "cancelEvent"; 
    }
    return false; // Do not cancel event by default
}


export function initializeReachCheck() {
    const reachConfig = config.default.combat.reachCheck; // Get the full reach config
    if (!reachConfig || !reachConfig.enabled) {
        logDebug("[ReachCheck] Disabled by config.");
        return;
    }
    logDebug("[ReachCheck] Initializing...");

    // Entity Hit Check (using afterEvents, so cannot be cancelled by this handler directly)
    world.afterEvents.entityHitEntity.subscribe(event => {
        const { damagingEntity, hitEntity } = event;

        if (!(damagingEntity instanceof Minecraft.Player)) {
            return; 
        }
        const player = damagingEntity;

        let maxDistance;
        if (player.currentGamemode === Minecraft.GameMode.creative) {
            maxDistance = reachConfig.maxHitDistanceCreative;
        } else { 
            maxDistance = reachConfig.maxHitDistanceSurvival;
        }

        const playerLocation = player.getHeadLocation(); 
        const targetLocation = hitEntity.location;
        
        const distance = Math.sqrt(
            Math.pow(playerLocation.x - targetLocation.x, 2) +
            Math.pow(playerLocation.y - targetLocation.y, 2) +
            Math.pow(playerLocation.z - targetLocation.z, 2)
        );

        if (distance > maxDistance) {
            // Call the common handler. Cancellation won't apply here due to afterEvents.
            handleReachViolation(player, "EntityHit", distance, maxDistance, reachConfig);
        }
    });

    // Player Break Block Check
    if (reachConfig.checkBlockBreak) {
        world.beforeEvents.playerBreakBlock.subscribe(event => {
            const { player, block } = event;
            
            let maxDistance;
            if (player.currentGamemode === Minecraft.GameMode.creative) {
                maxDistance = reachConfig.maxBlockBreakDistanceCreative;
            } else {
                maxDistance = reachConfig.maxBlockBreakDistanceSurvival;
            }

            const playerHeadLocation = player.getHeadLocation();
            // Calculate center of the block for more accurate distance
            const blockCenterLocation = { 
                x: block.location.x + 0.5, 
                y: block.location.y + 0.5, 
                z: block.location.z + 0.5 
            };

            const distance = Math.sqrt(
                Math.pow(playerHeadLocation.x - blockCenterLocation.x, 2) +
                Math.pow(playerHeadLocation.y - blockCenterLocation.y, 2) +
                Math.pow(playerHeadLocation.z - blockCenterLocation.z, 2)
            );

            if (distance > maxDistance) {
                if (handleReachViolation(player, "BlockBreak", distance, maxDistance, reachConfig)) {
                    event.cancel = true;
                }
            }
        });
    }

    // Player Place Block Check
    if (reachConfig.checkBlockPlace) {
        world.beforeEvents.playerPlaceBlock.subscribe(event => {
            const { player, block } = event; // block is the block being placed

            let maxDistance;
            if (player.currentGamemode === Minecraft.GameMode.creative) {
                maxDistance = reachConfig.maxBlockPlaceDistanceCreative;
            } else {
                maxDistance = reachConfig.maxBlockPlaceDistanceSurvival;
            }
            
            const playerHeadLocation = player.getHeadLocation();
            // block.location refers to the location where the block will be placed.
            // Calculate center of the block for more accurate distance
             const blockCenterLocation = { 
                x: block.location.x + 0.5, 
                y: block.location.y + 0.5, 
                z: block.location.z + 0.5 
            };

            const distance = Math.sqrt(
                Math.pow(playerHeadLocation.x - blockCenterLocation.x, 2) +
                Math.pow(playerHeadLocation.y - blockCenterLocation.y, 2) +
                Math.pow(playerHeadLocation.z - blockCenterLocation.z, 2)
            );

            if (distance > maxDistance) {
                 if (handleReachViolation(player, "BlockPlace", distance, maxDistance, reachConfig)) {
                    event.cancel = true;
                }
            }
        });
    }
}
