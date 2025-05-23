import { newCommand } from '../handle';

newCommand({
    name:"clearchat",
    description: "Clear the chat",
    run: (data) => {
        try {
            data.player.runCommand("function admin_cmds/clearchat");
        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in clearchat command:", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to clear chat. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in clearchat:", sendError, sendError.stack);
                }
            }
        }
    }
})