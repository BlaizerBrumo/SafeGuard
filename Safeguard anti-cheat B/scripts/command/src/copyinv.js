import { newCommand } from '../handle';
import { getPlayerByName,copyInv, canFindPlayer, sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name:"copyinv",
    description: "<player> Copies all the player items into your inventory",
    run: (data) => {
        const {player} = data;

        const setName = data.args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
        if(!canFindPlayer(setName)) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);
		if (getPlayerByName(setName).hasTag("admin")) {
            data.player.sendMessage(`§6[§eSafeGuard§6]§f Can't copy the inventory of §e${setName}§f, they're an admin.`);
		    return;
        }
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§5§l ${player.name} §bcopied the inventory of§l§5 ${setName}! §r`,true);
		//data.player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bcopied the inventory of§l§5 ${setNameInvsee.replace("@", "")}! §r"}]}`);
		copyInv(data.player,setName);
    }
})