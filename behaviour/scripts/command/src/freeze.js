import { getPlayerByName, sendMessageToAllAdmins } from "../../assets/util";
import { newCommand } from "../handle";

newCommand({
    name:"freeze",
    description:"Toggle freeze of selected player",
    run: (data) => {
        try {
            const {args, player } = data;
            const targetName = args.slice(1).join(" ").replace(/["@]/g, "");
            const targetPlayer = getPlayerByName(targetName); // Already wrapped
            
            if (!targetPlayer) {
                player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${targetName}§f was not found`);
                return;
            }
            if (targetPlayer.hasAdmin()) { // Already wrapped
                player.sendMessage(`§6[§eSafeGuard§6]§f Can't toggle freeze of §e${targetPlayer.name}§f, they're an admin.`);
                return;
            }
            
            const playerFreezeStatus = targetPlayer.getDynamicProperty("safeguard:freezeStatus") ?? false; 
            const freezeMsg = playerFreezeStatus ? "unfrozen" : "frozen"; // Corrected logic: if status is true, action is to unfreeze, so message is "unfrozen"

            targetPlayer.setFreezeTo(!playerFreezeStatus); // Already wrapped

            player.sendMessage(`§6[§eSafeGuard§6]§f Succesfully ${freezeMsg} §e${targetPlayer.name}`);
            targetPlayer.sendMessage(`§6[§eSafeGuard§6]§f You were §e${freezeMsg}§f by the admin §e${player.name}`);
            
            sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fhas ${freezeMsg}§e ${targetPlayer.name}! §r`, true); // Already wrapped

        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in freeze command:", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to toggle freeze. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in freeze:", sendError, sendError.stack);
                }
            }
        }
    } 
})