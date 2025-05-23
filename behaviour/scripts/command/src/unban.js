import { addPlayerToUnbanQueue, getPlayerByName } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"unban",
    description:"<player> Unbans a player",
    run: (data) => {
        try {
            const {player, args} = data; // Ensure args is destructured
            const setNameUnban = args.slice(1).join(" ").replace(/["@]/g, "");
            
            if (!setNameUnban) { // Basic validation for player name
                player.sendMessage("§cUsage: .unban <player name>");
                return;
            }

            addPlayerToUnbanQueue(player,setNameUnban); // Already wrapped in util.js
        } catch (e) {
            logDebug("[SafeGuard ERROR][unban]", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to unban the player. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][unban] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
})