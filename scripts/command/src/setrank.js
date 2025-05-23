import { newCommand } from '../handle.js';
import { getPlayerByName } from "../../assets/util.js";
import config from '../../config.js'; // Corrected import for config

newCommand({
    name: "setrank",
    description: "<playerName> <rankId> - Sets a player's rank. Rank IDs are keys from config.ranks (e.g., owner, admin, member).",
    adminOnly: true,
    run: (data) => {
        const { player, args } = data;

        if (args.length < 3) {
            player.sendMessage("§cUsage: .setrank <playerName> <rankId>");
            return;
        }

        const targetPlayerName = args[1];
        const rankIdInput = args[2].toLowerCase();

        const targetPlayer = getPlayerByName(targetPlayerName);
        if (!targetPlayer) {
            player.sendMessage(`§cPlayer "${targetPlayerName}" not found.`);
            return;
        }

        const validRankIds = Object.keys(config.default.ranks);
        if (!validRankIds.includes(rankIdInput)) {
            player.sendMessage(`§cInvalid rankId "${rankIdInput}". Valid ranks are: ${validRankIds.join(", ")}.`);
            return;
        }

        targetPlayer.setDynamicProperty("safeguard:rankId", rankIdInput);

        const rankName = config.default.ranks[rankIdInput]?.name || rankIdInput;

        player.sendMessage(`§aSuccessfully set ${targetPlayer.name}'s rank to ${rankName}.`);
        
        // Optional: Notify target player
        targetPlayer.sendMessage(`§aYour rank has been set to ${rankName}.`);
    }
});
