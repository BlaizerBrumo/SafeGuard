import * as Minecraft from '@minecraft/server';
import * as config from '../config.js';
import { logDebug, sendMessageToAdmins } from '../assets/util.js';

const world = Minecraft.world;
// Stores player.id -> Map<itemId, lastUseTimestamp>
const playerLastItemUseTime = new Map(); 

export function initializeFastUseCheck() {
    const fastUseConfig = config.default.itemInteractions?.fastUseCheck;
    if (!fastUseConfig || !fastUseConfig.enabled) {
        logDebug("[FastUseCheck] Disabled by config.");
        return;
    }
    logDebug("[FastUseCheck] Initializing...");

    world.beforeEvents.itemUse.subscribe(event => {
        const { source, itemStack } = event;
        if (!(source instanceof Minecraft.Player)) {
            return; // Only check for players
        }

        const player = source;
        const itemId = itemStack.typeId;
        const currentTime = Date.now();

        let itemCooldown = fastUseConfig.defaultCooldownMs;
        if (fastUseConfig.itemSpecificCooldowns[itemId] !== undefined) {
            itemCooldown = fastUseConfig.itemSpecificCooldowns[itemId];
        } else if (itemStack.isFood) { // Check if the item is food
            itemCooldown = fastUseConfig.foodCooldownMs;
        }
        
        if (!playerLastItemUseTime.has(player.id)) {
            playerLastItemUseTime.set(player.id, new Map());
        }

        const playerItemCooldowns = playerLastItemUseTime.get(player.id);
        const lastUseTime = playerItemCooldowns.get(itemId) || 0;

        if (currentTime - lastUseTime < itemCooldown) {
            let violations = player.getDynamicProperty("safeguard:fastUseViolations") || 0;
            violations++;
            player.setDynamicProperty("safeguard:fastUseViolations", violations);

            logDebug(`[FastUseCheck] Player ${player.name} FastUse violation for ${itemId}. Interval: ${currentTime - lastUseTime}ms. Violations: ${violations}`);

            if (violations >= fastUseConfig.violationThreshold) {
                player.setDynamicProperty("safeguard:fastUseViolations", 0); // Reset violations

                const message = `Player ${player.name} flagged for FastUse (${itemStack.typeId.replace("minecraft:", "")}).`;
                sendMessageToAdmins(`§6[§eSafeGuard Notify§6]§c ${message}`);
                
                const action = fastUseConfig.action;
                if (action === "cancelEvent") {
                    event.cancel = true;
                    logDebug(`[FastUseCheck] Cancelled item use for ${player.name} due to FastUse.`);
                    // Optionally send a message to the player
                    // player.sendMessage("§cYou are using items too quickly!");
                } else if (action === "customCommand") {
                    let command = fastUseConfig.customCommand;
                    command = command.replace(/{playerName}/g, player.name)
                                     .replace(/{itemName}/g, itemStack.typeId.replace("minecraft:", ""));
                    try {
                        world.overworld.runCommandAsync(command);
                        logDebug(`[FastUseCheck] Executed custom command for ${player.name}: ${command}`);
                    } catch(e) {
                        logDebug(`[FastUseCheck] Error executing custom command for ${player.name}: ${e}`);
                    }
                }
            }
            // If action is cancelEvent and threshold is met, we've already cancelled.
            // If not cancelling, or threshold not met, we should still update the timestamp
            // to prevent spamming violations for a single 'too fast' action if it wasn't cancelled.
            // However, if cancelled, they didn't 'use' it, so don't update.
            if (!event.cancel) {
                playerItemCooldowns.set(itemId, currentTime);
            }
        } else {
            // Valid use, update timestamp
            playerItemCooldowns.set(itemId, currentTime);
            // Optional: Reset violation count for this specific item if you want more granular violation tracking.
            // For now, using a single global fastUseViolations counter.
        }
    });
}
