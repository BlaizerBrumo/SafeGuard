import { getPlayerByName, sendMessageToAllAdmins } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"ban",
    description:"<player name> [reason] Permanently bans a player by their name, optionally specifying a reason.",
    run: (data) => {
        try {
            const {player,args} = data;
            
            if (args.length < 2) {
                player.sendMessage("§cUsage: .ban <player name> [reason]");
                return;
            }

            const targetName = args[1].replace(/["@]/g, "");
            const reasonInput = args.slice(2).join(" ");
            
            let reason = reasonInput.trim();
            if (reason === "") {
                reason = "No reason provided.";
            }

            const targetPlayer = getPlayerByName(targetName); // getPlayerByName is already wrapped
            if (!targetPlayer) {
                player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${targetName}§f was not found`);
                return;
            }
            if (targetPlayer.name == player.name) {
                player.sendMessage(`§6[§eSafeGuard§6]§f Cannot execute this command on yourself!`);
                return;
            }

            player.sendMessage(`§6[§eSafeGuard§6]§f Successfully banned §e${targetPlayer.name}§f for: ${reason}`);
            sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§f §e${player.name}§f banned §e${targetPlayer.name}§f for: ${reason}!`, true); // sendMessageToAllAdmins is wrapped

            // runCommand and ban are critical API calls. ban is already wrapped in Player.prototype.ban
            targetPlayer.ban(reason, Date.now(), true, player); // player.ban is wrapped
            // Kick should ideally be after confirming ban was successful, but ban is already robust.
            // If ban fails, kick might not happen if player is already gone due to ban failure.
            // For simplicity, keeping kick after ban.
            player.runCommand(`kick "${targetPlayer.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §c${reason}\n§4Banned by: §c${player.name}`);

        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in ban command:", e, e.stack);
            if (data && data.player) { // Check if player is defined from data
                try {
                    data.player.sendMessage("§cAn error occurred while trying to ban the player. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in ban command:", sendError, sendError.stack);
                }
            }
        }
    }
})