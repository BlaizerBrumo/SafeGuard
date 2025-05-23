import * as Minecraft from '@minecraft/server';
import { logDebug } from './assets/util.js'; // Corrected path assuming util.js is in assets relative to scripts/
const world = Minecraft.world;

if (Minecraft.world.commands) {
    try {
        Minecraft.world.commands.registerCommand({
            name: "sg:offlineunban",
            description: "Removes a player from the global ban list (offline).",
            permissionLevel: Minecraft.CommandPermissionLevel.Admin,
            mandatoryParameters: [{
                name: "playerName",
                type: Minecraft.CustomCommandParamType.String,
                description: "The exact name of the player to remove from the offline ban list."
            }],
            optionalParameters: []
        }, (origin, args) => {
            const targetName = args.playerName;

            const gbanListString = world.getDynamicProperty("safeguard:gbanList");
            let gbanList = [];
            if (typeof gbanListString === 'string') {
                try {
                    gbanList = JSON.parse(gbanListString);
                    if (!Array.isArray(gbanList)) gbanList = [];
                } catch (e) {
                    logDebug("Failed to parse dynamic global ban list for /sg:offlineunban:", e);
                    gbanList = [];
                }
            }

            const playerIndex = gbanList.indexOf(targetName);

            if (playerIndex === -1) {
                const message = `§cPlayer ${targetName} is not on the offline ban list.`;
                if (origin instanceof Minecraft.Player) origin.sendMessage(message); else console.warn(message.replace(/§[0-9a-fk-or]/g, ''));
                return;
            }

            gbanList.splice(playerIndex, 1);
            world.setDynamicProperty("safeguard:gbanList", JSON.stringify(gbanList));

            const successMessage = `§aPlayer ${targetName} has been removed from the offline ban list.`;
            if (origin instanceof Minecraft.Player) origin.sendMessage(successMessage); else console.warn(successMessage.replace(/§[0-9a-fk-or]/g, ''));
            
            let adminName = "Server";
            if (origin instanceof Minecraft.Player) adminName = origin.name;
            logDebug(`[OfflineUnban] ${adminName} removed ${targetName} from the offline ban list via slash command.`);
        });
        logDebug("[SafeGuard] Registered /sg:offlineunban command");
    } catch (e) {
        logDebug("[SafeGuard] Failed to register /sg:offlineunban command:", e);
    }
} else {
    logDebug("[SafeGuard] CustomCommandRegistry not available, skipping /sg:offlineunban registration.");
}
