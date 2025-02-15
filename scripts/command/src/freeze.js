import { getPlayerByName, sendMessageToAllAdmins } from "../../assets/util";
import { newCommand } from "../handle";

newCommand({
    name:"freeze",
    description:"Toggle freeze of selected player",
    run: (data) => {
        const {args, player } = data;
        const targetName = args.slice(1).join(" ").replace(/["@]/g, "");
        const targetPlayer = getPlayerByName(targetName);
        
        if (!targetPlayer) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${targetName}§f was not found`);
        if (targetPlayer.hasAdmin()) return player.sendMessage(`§6[§eSafeGuard§6]§f Can't toggle freeze of §e${targetPlayer.name}§f, they're an admin.`);
        
        const playerFreezeStatus = targetPlayer.getDynamicProperty("safeguard:freezeStatus") ?? false; 
        const freezeMsg = !playerFreezeStatus ? "unfrozen" : "frozen";

        player.sendMessage(`§6[§eSafeGuard§6]§f Succesfully ${freezeMsg} §e${targetPlayer.name}`);
        targetPlayer.sendMessage(`§6[§eSafeGuard§6]§f You were §e${freezeMsg}§f by the admin §e${player.name}`);
        
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fhas ${freezeMsg}§e ${targetPlayer.name}! §r`, true);


        targetPlayer.setFreezeTo(!playerFreezeStatus);
    } 
})