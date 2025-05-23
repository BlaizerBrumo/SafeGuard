import { newCommand } from '../handle';
import { getPlayerByName, sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name: "kick",
    description: "<player> Kicks target player",
    run: (data) => {
        try {
            const { player, args } = data;

            const setName = args.slice(1).join(" ").replace(/["@]/g, "");
            const targetPlayer = getPlayerByName(setName); // Already wrapped
            if (!targetPlayer) {
                player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);
                return;
            }
            if (targetPlayer.hasAdmin()) { // Already wrapped
                player.sendMessage(`§6[§eSafeGuard§6]§f Can't kick §e${targetPlayer.name}§f, they're an admin.`);
                return;
            }
            sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fkicked the player§e ${targetPlayer.name}§f! §r`, true); // Already wrapped
            targetPlayer.runCommand(`kick @s you were kicked by ${player.name}`); // API Call
        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in kick command:", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to kick the player. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in kick:", sendError, sendError.stack);
                }
            }
        }
    }
})