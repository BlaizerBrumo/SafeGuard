import { canFindPlayer, getPlayerByName } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"mute",
    run: (data) => {
        let player = data.player; 
        const setNameMute = data.args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
		if (!canFindPlayer(setNameMute)) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameMute}§f was not found`);
		  return;
		}
		if (getPlayerByName(setNameMute).hasTag("admin")) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Can't mute §e${setNameMute}§f, they're an admin.`);
		  return;
		}
		player.runCommandAsync('tag "' + setNameMute +'" add muted');
		player.sendMessage(`§6[§eSafeGuard§6]§f Muted §e${setNameMute}`);
		player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bmuted§l§5 ${setNameMute}! §r"}]}`);
		
    }
})