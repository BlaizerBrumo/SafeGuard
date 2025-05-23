import { newCommand } from '../handle';

newCommand({
    name:"removeowner",
    description:"Removes your owner status",
    ownerOnly: true,
    run: (data) => {
        try {
            const { player } = data;
            player.setDynamicProperty("safeguard:ownerStatus",false); // API Call
            player.sendMessage(`§6[§eSafeGuard§6]§f Your owner status was removed.`); // API Call
        } catch (e) {
            logDebug("[SafeGuard ERROR][removeowner]", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to remove owner status. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][removeowner] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
})