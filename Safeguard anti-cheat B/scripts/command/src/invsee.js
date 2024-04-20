import { newCommand } from '../handle';
import { canFindPlayer, getPlayerByName, invsee, sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name:"invsee",
    description: "<player> List all the items that the player has in their inventory",
    run: (data) => {
        const setNameInvsee = data.args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");

        if(!canFindPlayer(setNameInvsee)) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameInvsee}§f was not found`);
		if (getPlayerByName(setNameInvsee).hasTag("admin")) {
            data.player.sendMessage(`§6[§eSafeGuard§6]§f Can't view the inventory of §e${setNameInvsee}§f, they're an admin.`);
		    return;
		}
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§5§l ${data.player.name} §bviewed the inventory of§l§5 ${setNameInvsee.replace("@", "")}! §r`,true);
		//data.player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bviewed the inventory of§l§5 ${setNameInvsee.replace("@", "")}! §r"}]}`);
		invsee(data.player.name, setNameInvsee);
    }
})