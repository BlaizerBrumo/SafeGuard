import { canFindPlayer, getPlayerByName } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"unmute",
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
		player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bunmuted§l§5 ${setNameUnmute}! §r"}]}`);
		
    }
})