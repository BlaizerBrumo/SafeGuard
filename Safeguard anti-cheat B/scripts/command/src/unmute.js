import { canFindPlayer, getPlayerByName, sendMessageToAllAdmins } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"unmute",
	description: "<player> Unmutes a muted player",
    run: (data) => {
        let player = data.player;
        const setNameUnmute = data.args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
		if (!canFindPlayer(setNameUnmute)) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameUnmute}§f was not found`);
		  return;
		}
		if (!getPlayerByName(setNameUnmute).hasTag("muted")) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameUnmute}§f is not muted.`);
		  return;
		}
		player.runCommandAsync('tag "' + setNameUnmute +'" remove muted');
		player.sendMessage(`§6[§eSafeGuard§6]§f Unmuted §e${setNameUnmute}`);
		sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§5§l ${player.name} §bunmuted§l§5 ${setNameUnmute}! §r`,true);
		//player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bunmuted§l§5 ${setNameUnmute}! §r"}]}`);
		
    }
})