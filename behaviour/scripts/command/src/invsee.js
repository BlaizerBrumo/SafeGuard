import { newCommand } from '../handle';
import { getPlayerByName, invsee, sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name:"invsee",
    description: "<player> List all the items that the player has in their inventory",
    run: (data) => {
        try {
            const {player,args} = data;

            const setNameInvsee = args.slice(1).join(" ").replace(/["@]/g, "");

            const targetPlayer = getPlayerByName(setNameInvsee); // Already wrapped

            if(!targetPlayer) {
                player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameInvsee}§f was not found`);
                return;
            }
            
            if (targetPlayer.hasAdmin()) { // Already wrapped
                player.sendMessage(`§6[§eSafeGuard§6]§f Can't view the inventory of §e${targetPlayer.name}§f, they're an admin.`);
                return;
            }
            sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fviewed the inventory of§e ${targetPlayer.name}! §r`,true); // Already wrapped
            
            invsee(data.player, targetPlayer); // Already wrapped in util.js
        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in invsee command:", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to view inventory. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in invsee:", sendError, sendError.stack);
                }
            }
        }
    }
})