import { newCommand } from '../handle';
import { getPlayerByName,sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name: "clearwarn",
    description: "<player> Clears the player's warnings",
    run: (data) => {
        const { player, args } = data;

        const setName = args.slice(1).join(" ").replace(/["@]/g, "").trim();

        const targetPlayer = getPlayerByName(setName);

        if (!targetPlayer) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);

        if (targetPlayer.hasAdmin()) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Can't clear the warns of §e${targetPlayer.name}§f, they're an admin.`);
            return;
        }
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fcleared the warnings of the player§e ${targetPlayer.name}! §r`, true);
        player.sendMessage(`§6[§eSafeGuard§6]§f Successfully cleared warnings.`);
        targetPlayer.clearWarnings();
    }
})