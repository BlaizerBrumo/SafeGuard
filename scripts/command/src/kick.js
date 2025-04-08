import { newCommand } from '../handle';
import { getPlayerByName, sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name: "kick",
    description: "<player> Kicks target player",
    run: (data) => {
        const { player, args } = data;

        const setName = args.slice(1).join(" ").replace(/["@]/g, "");
        const targetPlayer = getPlayerByName(setName);
        if (!targetPlayer) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);
        if (targetPlayer.hasAdmin()) {
            data.player.sendMessage(`§6[§eSafeGuard§6]§f Can't kick §e${targetPlayer.name}§f, they're an admin.`);
            return;
        }
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fkicked the player§e ${targetPlayer.name}§f! §r`, true);
        targetPlayer.runCommand(`kick @s you were kicked by ${player.name}`);
    }
})