import { newCommand } from '../handle';
import { getPlayerByName, invsee, sendMessageToAllAdmins } from '../../assets/util';

newCommand({
    name:"invsee",
    description: "<player> List all the items that the player has in their inventory",
    run: (data) => {
        const {player,args} = data;

        const setNameInvsee = args.slice(1).join(" ").replace(/["@]/g, "");

        const targetPlayer = getPlayerByName(setNameInvsee);

        if(!targetPlayer) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameInvsee}§f was not found`);
        
        if (targetPlayer.hasAdmin()) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Can't view the inventory of §e${targetPlayer.name}§f, they're an admin.`);
		    return;
		}
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fviewed the inventory of§e ${targetPlayer.name}! §r`,true);
		
        invsee(data.player, targetPlayer);
    }
})