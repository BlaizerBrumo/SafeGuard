import { world } from '@minecraft/server';
import { newCommand } from '../handle';

newCommand({
    name:"clearbanlogs",
    description:"Clears ban logs",
    ownerOnly:true,
    run: (data) => {
        try {
            world.setDynamicProperty("safeguard:banLogs",undefined);
            data.player.sendMessage("§6[§eSafeGuard§6]§f The ban logs were successfully cleared");
        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in clearbanlogs command:", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while clearing ban logs. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in clearbanlogs:", sendError, sendError.stack);
                }
            }
        }
    }
})