import { newCommand } from '../handle';
import { getPlayerByName,sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name: "clearwarn",
    description: "<player> Clears the player's warnings",
    run: (data) => {
        try {
            const { player, args } = data;

            const setName = args.slice(1).join(" ").replace(/["@]/g, "").trim();

            const targetPlayer = getPlayerByName(setName); // Already wrapped

            if (!targetPlayer) {
                player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);
                return;
            }

            if (targetPlayer.hasAdmin()) { // Already wrapped
                player.sendMessage(`§6[§eSafeGuard§6]§f Can't clear the warns of §e${targetPlayer.name}§f, they're an admin.`);
                return;
            }
            sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fcleared the warnings of the player§e ${targetPlayer.name}! §r`, true); // Already wrapped
            player.sendMessage(`§6[§eSafeGuard§6]§f Successfully cleared warnings.`);
            targetPlayer.clearWarnings(); // Already wrapped
        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in clearwarn command:", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to clear warnings. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in clearwarn:", sendError, sendError.stack);
                }
            }
        }
    }
})