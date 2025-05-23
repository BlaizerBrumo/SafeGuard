import { newCommand } from '../handle';
import { getPlayerByName,copyInv, sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name:"copyinv",
    description: "<player> Copies all the player items into your inventory",
    run: (data) => {
        try {
            const {player,args} = data;

            const setName = args.slice(1).join(" ").replace(/["@]/g, "");
            const targetPlayer = getPlayerByName(setName); // Already wrapped
            if(!targetPlayer) {
                player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);
                return;
            }
            if (targetPlayer.hasAdmin()) { // Already wrapped
                player.sendMessage(`§6[§eSafeGuard§6]§f Can't copy the inventory of §e${targetPlayer.name}§f, they're an admin.`);
                return;
            }
            sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fcopied the inventory of§e ${targetPlayer.name}§f! §r`,true); // Already wrapped
            copyInv(player,targetPlayer); // Already wrapped
        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in copyinv command:", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to copy inventory. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in copyinv:", sendError, sendError.stack);
                }
            }
        }
    }
})