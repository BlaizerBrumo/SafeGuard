import { newCommand } from '../handle';
import { getPlayerByName, invsee } from '../../assets/util';

newCommand({
    name:"invsee",
    run: (data) => {
        const setNameInvsee = data.args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
		if (getPlayerByName(setNameInvsee).hasTag("admin")) {
            data.player.sendMessage(`§6[§eSafeGuard§6]§f Can't view the inventory of §e${setNameInvsee}§f, they're an admin.`);
		    return;
		}
		data.player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bviewed the inventory of§l§5 ${setNameInvsee.replace("@", "")}! §r"}]}`);
		invsee(data.player.name, setNameInvsee);
    }
})