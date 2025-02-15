import { newCommand } from '../handle';
import { getPlayerByName,sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name: "warn",
    description: "<player> Warns a player",
    run: (data) => {
        const { player, args } = data;

        const setName = args.slice(1).join(" ").replace(/["@]/g, "").trim();

        const targetPlayer = getPlayerByName(setName);

        if (!targetPlayer) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);

        if (targetPlayer.hasAdmin()) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Can't warn §e${targetPlayer.name}§f, they're an admin.`);
            return;
        }
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fwarned the player§e ${targetPlayer.name}! §r`, true);
        targetPlayer.sendMessage(`§6[§eSafeGuard§6]§f You were warned by the admin §e${player.name}§f!`);
        targetPlayer.setWarning("manual");
    }
})