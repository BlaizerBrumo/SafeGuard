import { getPlayerByName, sendMessageToAllAdmins } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"ban",
    description:"<player name> Permanently bans a player by their name",
    run: (data) => {
        const {player,args} = data;
        
        const setNameBan = args.slice(1).join(" ").replace(/["@]/g, "");
        const targetPlayer = getPlayerByName(setNameBan);
        if (!targetPlayer) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameBan}§f was not found`);
            return;
        }
        player.sendMessage(`§6[§eSafeGuard§6]§f Successfully banned §e${targetPlayer.name}`);
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§f §e${player.name}§f banned §e${targetPlayer.name}§f!`, true);

        player.runCommandAsync(`kick "${targetPlayer.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §cNo reason provided.\n§4Banned by: §c${player.name}`)

        targetPlayer.ban("No reason provided.", Date.now(), true, player);
    }
})