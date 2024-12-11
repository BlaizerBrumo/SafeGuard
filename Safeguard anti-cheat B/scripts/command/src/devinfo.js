import { canFindPlayer, getPlayerByName } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name: "devinfo",
    description: "<player name> Displays device information of a player",
    run: (data) => {
        const { player } = data;
        const playerName = data.args.slice(1).join(" ");

        if (!player.hasTag("admin")) return;

        const targetPlayer = canFindPlayer(playerName) ? getPlayerByName(playerName) : null;
        if (!targetPlayer) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${playerName}§f was not found`);
            return;
        }

        player.sendMessage(`Player Name: ${targetPlayer.name}`);
        player.sendMessage(`Platform Type: ${targetPlayer.clientSystemInfo.platformType}`);
        player.sendMessage(`System Memory: ${targetPlayer.clientSystemInfo.memoryTier}`);
        player.sendMessage(`Max Render Distance: ${targetPlayer.clientSystemInfo.maxRenderDistance}`)
    }
});
