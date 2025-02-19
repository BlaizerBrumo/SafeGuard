import { newCommand } from '../handle';
import { getPlayerByName,copyInv, sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name:"copyinv",
    description: "<player> Copies all the player items into your inventory",
    run: (data) => {
        const {player,args} = data;

        const setName = args.slice(1).join(" ").replace(/["@]/g, "");
        const targetPlayer = getPlayerByName(setName);
        if(!targetPlayer) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);
		if (targetPlayer.hasAdmin()) {
            data.player.sendMessage(`§6[§eSafeGuard§6]§f Can't copy the inventory of §e${targetPlayer.name}§f, they're an admin.`);
		    return;
        }
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fcopied the inventory of§e ${targetPlayer.name}§f! §r`,true);
		copyInv(player,targetPlayer);
    }
})