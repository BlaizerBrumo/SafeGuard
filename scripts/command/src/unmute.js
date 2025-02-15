import { getPlayerByName, logDebug, sendMessageToAllAdmins } from '../../assets/util';
import { newCommand } from '../handle';

newCommand({
    name:"unmute",
	description: "<player> Unmutes a muted player",
    run: (data) => {
        const {player} = data;

        const setNameUnmute = data.args.slice(1).join(" ").replace(/["@]/g, "");
		const targetPlayer = getPlayerByName(setNameUnmute);
		if (!targetPlayer) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameUnmute}§f was not found`);
		  return;
		}
		if (targetPlayer.name === player.name) return player.sendMessage(`§6[§eSafeGuard§6]§f Cannot execute this command on yourself!`);
		if (!targetPlayer.isMuted) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${targetPlayer.name}§f is not muted.`);
		  return;
		}
		
		targetPlayer.unmute();

		targetPlayer.sendMessage(`§6[§eSafeGuard§6]§f You were unmuted by §e${player.name}`);
		player.sendMessage(`§6[§eSafeGuard§6]§f Unmuted §e${targetPlayer.name}`);
		sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §funmuted§e ${targetPlayer.name}§f!`,true);
    }
})