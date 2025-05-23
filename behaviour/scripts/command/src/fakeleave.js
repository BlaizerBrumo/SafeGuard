import { newCommand } from '../handle';
import { sendMessageToAllAdmins } from "../../assets/util";
import { world } from '@minecraft/server';


newCommand({
    name: "fakeleave",
    description: "Simulate leaving the game",
    run: (data) => {
        try {
            const { player } = data;

            world.sendMessage(`§e${player.name} left the game`); // API Call
            sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name}§f fake left.`,true); // Already wrapped
        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in fakeleave command:", e, e.stack);
            // No player object to send message to if world.sendMessage fails early,
            // but if sendMessageToAllAdmins fails, player might still be accessible.
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to simulate leaving. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in fakeleave:", sendError, sendError.stack);
                }
            }
        }
    }
})