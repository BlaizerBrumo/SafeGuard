import { newCommand } from '../handle';
import { sendMessageToAllAdmins } from "../../assets/util";
import { world } from '@minecraft/server';

newCommand({
    name: "fakejoin",
    description: "Simulate joining the game",
    run: (data) => {
        try {
            const { player } = data;

            world.sendMessage(`§e${player.name} joined the game`); // API Call
            sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name}§f fake joined.`,true); // Already wrapped
        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in fakejoin command:", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to simulate joining. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in fakejoin:", sendError, sendError.stack);
                }
            }
        }
    }
})