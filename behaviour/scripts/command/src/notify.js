import { newCommand } from '../handle';

newCommand({
    name:"notify",
    description:"Toggle anticheat notifications",
    run: (data) => {
        try {
            data.player.runCommand("function admin_cmds/notify");
        } catch (e) {
            logDebug("[SafeGuard ERROR][notify]", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to toggle notifications. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][notify] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
})