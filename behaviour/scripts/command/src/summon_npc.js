import { newCommand } from '../handle';

newCommand({
    name:"summon_npc",
    description:"Summons a NPC at your location",
    run: (data) => {
        try {
            data.player.runCommand("function admin_cmds/summon_npc"); // API Call
        } catch (e) {
            logDebug("[SafeGuard ERROR][summon_npc]", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to summon the NPC. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][summon_npc] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
})