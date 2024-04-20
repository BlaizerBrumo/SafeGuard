import { canFindPlayer, getPlayerByName, sendMessageToAllAdmins } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"ban",
    description:"<player name> Permanently bans a player by their name",
    run: (data) => {
        const {player} = data;
        
        const setNameBan = data.args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
        if (!canFindPlayer(setNameBan)) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameBan}§f was not found`);
            return;
        }
        const bannedPlayer = getPlayerByName(setNameBan);
        if (bannedPlayer.hasTag("admin")) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Can't ban §e${setNameBan}§f, they're an admin.`);
            return;
        }
        bannedPlayer.addTag("safeguard:Ban");
		const now = Date.now();
		bannedPlayer.addTag(`safeguardBanInfo**true**${now}**${player.name}**No reason provided.`);
		bannedPlayer.runCommandAsync(`kick "${bannedPlayer.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §cNo reason provided\n§4Banned by: §c${player.name}`)
        player.sendMessage(`§6[§eSafeGuard§6]§f Banned §e${setNameBan}`);
        sendMessageToAllAdmins(`"§6[§eSafeGuard Notify§6]§5§l ${player.name} §bbanned§l§5 ${setNameBan}! §r`,true);
        //player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bbanned§l§5 ${setNameBan}! §r"}]}`);
    }
})