import * as Minecraft from '@minecraft/server';
import * as config from '../config.js';
import { logDebug, sendMessageToAdmins } from '../assets/util.js';

const world = Minecraft.world;
const system = Minecraft.system;

// We might need to track player states if direct properties aren't available.
// e.g., const playersUsingItems = new Set(); // player.id
// e.g., const playersWithOpenContainers = new Set(); // player.id

export function initializeContextualKillauraCheck() {
    const killauraConfig = config.default.combat?.contextualKillauraCheck;
    if (!killauraConfig || !killauraConfig.enabled) {
        logDebug("[ContextualKillaura] Disabled by config.");
        return;
    }
    logDebug("[ContextualKillaura] Initializing...");

    // Note: Detecting "using item" and "chest open" accurately server-side for all cases can be very complex.
    // This implementation will make best-effort attempts or focus on what's feasible.

    // Example for "using item" - very simplified:
    // This would require more events (ItemStartUse, ItemStopUse) for robust tracking.
    // world.afterEvents.itemUse.subscribe(event => {
    //     if (isItemWithUseDuration(event.itemStack.typeId)) {
    //         playersUsingItems.add(event.source.id);
    //         // Need a way to remove them: ItemStopUse, or a timer, or if they switch item.
    //     }
    // });

    world.afterEvents.entityHitEntity.subscribe(event => {
        const { damagingEntity, hitEntity } = event;

        if (!(damagingEntity instanceof Minecraft.Player)) {
            return;
        }
        const player = damagingEntity;
        let violationType = null;

        // 1. Check for attacking while sleeping
        if (killauraConfig.checkWhileSleeping) {
            // The 'isSleeping' property is the most direct way if available.
            // As of @minecraft/server 1.8.0, there isn't a direct player.isSleeping.
            // A common workaround is to check if the player has the 'sleeping' state (e.g., player.matches({ state: "sleeping" }))
            // or if they are physically in a bed via location checks + block type, or if they have a specific vanilla tag.
            // Let's assume a hypothetical tag or state for now, or this check might be difficult.
            // For example, if a system elsewhere adds a "safeguard:is_sleeping" tag:
            if (player.hasTag("safeguard:is_sleeping")) { // Placeholder for actual sleep detection
                violationType = "AttackingWhileSleeping";
            }
        }

        // 2. Check for attacking while using an item (Simplified: check if player is blocking)
        // More robust checks would involve tracking item use states.
        if (!violationType && killauraConfig.checkWhileUsingItem) {
            if (player.isBlocking) { // isBlocking is a standard Player property
                 violationType = "AttackingWhileBlocking";
            }
            // Add more checks here if we track other item uses, e.g. if (playersUsingItems.has(player.id)) ...
        }
        
        // 3. Check for attacking while chest open (Very hard to detect reliably server-side without specific events)
        // if (!violationType && killauraConfig.checkWhileChestOpen) {
        //     // if (playersWithOpenContainers.has(player.id)) { // Needs a system to add/remove player IDs
        //     // violationType = "AttackingWithContainerOpen";
        //     // }
        // }


        if (violationType) {
            let violations = player.getDynamicProperty("safeguard:contextKillauraViolations") || 0;
            violations++;
            player.setDynamicProperty("safeguard:contextKillauraViolations", violations);

            logDebug(`[ContextualKillaura] Player ${player.name} ${violationType}. Violations: ${violations}`);

            if (violations >= killauraConfig.violationThreshold) {
                player.setDynamicProperty("safeguard:contextKillauraViolations", 0); 

                const message = `Player ${player.name} flagged for Killaura (${violationType}).`;
                sendMessageToAdmins(`§6[§eSafeGuard Notify§6]§c ${message}`);
                
                const action = killauraConfig.action;
                if (action === "customCommand") {
                    let command = killauraConfig.customCommand;
                    command = command.replace(/{playerName}/g, player.name)
                                     .replace(/{type}/g, violationType);
                    try {
                        world.overworld.runCommandAsync(command);
                        logDebug(`[ContextualKillaura] Executed custom command for ${player.name}: ${command}`);
                    } catch(e) {
                        logDebug(`[ContextualKillaura] Error executing custom command for ${player.name}: ${e}`);
                    }
                }
            }
        }
    });
}
