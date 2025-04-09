import { formatMilliseconds, getPlayerByName, logDebug, sendMessageToAllAdmins } from '../../assets/util';
import { newCommand } from '../handle';
import * as config from "../../config";
import { world } from '@minecraft/server';

newCommand({
	name: "mute",
	description: "<player> [time S | M | H | D] [reason] Mute a player for a specific duration",
	adminOnly: true,
	run: (data) => {
		const { args, player } = data;

		if (args.length < 2) {
			return player.sendMessage("§6[§eSafeGuard§6]§f Usage: !mute <player name> [time S | M | H | D] [reason]");
		}
		// Parse the player name with possible quotes
		let playerName, duration, reason;

		if (args[1].startsWith('"') || args[1].startsWith('@"')) {
			let closingQuoteIndex = -1;
			for (let i = 1; i < args.length; i++) {
				if (args[i].endsWith('"')) {
					closingQuoteIndex = i;
					break;
				}
			}
			if (closingQuoteIndex === -1) {
				return player.sendMessage("§6[§eSafeGuard§6]§f Invalid format! Closing quotation mark missing for player name.");
			}
			playerName = args.slice(1, closingQuoteIndex + 1).join(" ").replace(/["@]/g, "");
			duration = args[closingQuoteIndex + 1] ?? "permanent";
			reason = args.slice(closingQuoteIndex + 2).join(" ") || "No reason provided";
		} else {
			playerName = args[1].replace(/["@]/g, "");
			duration = args[2] ?? "permanent";
			reason = args.slice(3).join(" ") || "No reason provided";
		}

		// Verify the player exists
		const muteTarget = getPlayerByName(playerName);
		
		if (!muteTarget) {
			return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${playerName}§f was not found.`);
		}
		if (muteTarget.name === player.name) return player.sendMessage(`§6[§eSafeGuard§6]§f Cannot execute this command on yourself!`);

		// Parse and convert the time duration
		if (duration == "permanent" || duration.length < 1) return muteTarget.mute(muteTarget, reason, -1);

		const timeRegex = /^(\d+)([SMHD])$/i;
		if(!timeRegex.test(duration)){
			return player.sendMessage("§6[§eSafeGuard§6]§f Usage: !mute <player name> [time S | M | H | D] [reason]");
		}

		const timeMatch = duration.match(timeRegex);
		

		const timeValue = parseInt(timeMatch[1]);
		const timeUnit = timeMatch[2].toUpperCase();
	
		// Convert to milliseconds
		let timeInMs;
		switch (timeUnit) {
			case "S":
				timeInMs = timeValue * 1000; // seconds to ms
				break;
			case "M":
				timeInMs = timeValue * 1000 * 60; // minutes to ms
				break;
			case "H":
				timeInMs = timeValue * 1000 * 60 * 60; // hours to ms
				break;
			case "D":
				timeInMs = timeValue * 1000 * 60 * 60 * 24; // days to ms
				break;
			default:
				timeInMs = -1;
				break;
		}

		// Execute the mute action
		muteTarget.mute(player,reason,timeInMs);

		
	}
});
