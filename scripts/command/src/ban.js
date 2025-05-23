import { getPlayerByName, sendMessageToAllAdmins } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"ban",
    description:"<player name> [reason] Permanently bans a player by their name, optionally specifying a reason.",
    run: (data) => {
        const {player,args} = data;
        
        if (args.length < 2) {
            player.sendMessage("§cUsage: .ban <player name> [reason]");
            return;
        }

        const targetName = args[1].replace(/["@]/g, "");
        const reasonInput = args.slice(2).join(" ");
        
        let reason = reasonInput.trim();
        if (reason === "") {
            reason = "No reason provided.";
        }

        const targetPlayer = getPlayerByName(targetName);
        if (!targetPlayer) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${targetName}§f was not found`);
            return;
        }
        if (targetPlayer.name == player.name) return player.sendMessage(`§6[§eSafeGuard§6]§f Cannot execute this command on yourself!`);

        player.sendMessage(`§6[§eSafeGuard§6]§f Successfully banned §e${targetPlayer.name}§f for: ${reason}`);
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§f §e${player.name}§f banned §e${targetPlayer.name}§f for: ${reason}!`, true);

        player.runCommand(`kick "${targetPlayer.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §c${reason}\n§4Banned by: §c${player.name}`)

        targetPlayer.ban(reason, Date.now(), true, player);
    }
})