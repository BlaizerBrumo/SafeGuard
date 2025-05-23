import { getPlayerByName, logDebug, sendMessageToAllAdmins } from '../../assets/util';
import {newCommand} from '../handle';
import * as config from "../../config";
import { world } from '@minecraft/server';

newCommand({
    name: "report",
    description: "<player> <reason> Report a player privately to online admins",
    adminOnly: false,
    run: (data) => {
        try {
            const {args, player} = data;

            // Check if there are enough arguments
            if (args.length < 2) {
                player.sendMessage("§6[§eSafeGuard§6]§f Usage: !report <player name> <reason>");
                return;
            }

            let playerNameArg, reasonArg;

            if (args[1].startsWith('"') || args[1].startsWith('@"')) {
                let closingQuoteIndex = -1;
                for (let i = 1; i < args.length; i++) {
                    if (args[i].endsWith('"')) {
                        closingQuoteIndex = i;
                        break;
                    }
                }
                if (closingQuoteIndex === -1) {
                    player.sendMessage("§6[§eSafeGuard§6]§f Invalid format! Closing quotation mark missing for player name.");
                    return;
                }
                playerNameArg = args.slice(1, closingQuoteIndex + 1).join(" ").replace(/["@]/g, "");
                reasonArg = args.slice(closingQuoteIndex + 1).join(" ") ?? "No reason provided";
            } else {
                playerNameArg = args[1].replace(/["@]/g, "");
                reasonArg = args.slice(2).join(" ") ?? "No reason provided";
            }
            
            const reportedPlayer = getPlayerByName(playerNameArg); // Already wrapped

            if (!reportedPlayer) {
                player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${playerNameArg}§f was not found`);
                return;
            }
            
            reportPlayerInternal(player, reportedPlayer, reasonArg);

        } catch (e) {
            logDebug("[SafeGuard ERROR][report]", e, e.stack);
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to process your report. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR][report] Failed to send error message to command executor:", sendError, sendError.stack);
                }
            }
        }
    }
});

// Moved reportPlayer logic to a separate function to be wrapped itself.
function reportPlayerInternal(player, reportedPlayer, reason) {
    try {
        if (reportedPlayer.name === player.name) {
            player.sendMessage(`§6[§eSafeGuard§6]§f Cannot execute this command on yourself!`);
            return;
        }
        
        let reportedPlayerReportsProperty = reportedPlayer.getDynamicProperty("safeguard:reports"); // API Call
        if(reportedPlayerReportsProperty === undefined){
            reportedPlayer.setDynamicProperty("safeguard:reports",""); // API Call
            reportedPlayerReportsProperty = reportedPlayer.getDynamicProperty("safeguard:reports"); // API Call
        }  

        const tempProperty = (reportedPlayerReportsProperty || "").split(","); // Ensure it's a string before split
        
        if(player.hasAdmin()){ // Already wrapped
            logDebug(tempProperty);
            player.sendMessage(`§6[§eSafeGuard§6]§f This player has been reported §e${tempProperty.filter(Boolean).length}§r times.`); // Filter Boolean to count actual reports
            return;
        }

        if(tempProperty.includes(player.id)) {
            player.sendMessage(`§6[§eSafeGuard§6]§f You have already reported this player!`);
            return;
        }
        if(reportedPlayer.name === player.name) { // Redundant check, but safe
            player.sendMessage(`§6[§eSafeGuard§6]§f You cannot report yourself!`);
            return;
        }
        if(reportedPlayer.hasAdmin()){ // Already wrapped
            player.sendMessage(`§6[§eSafeGuard§6]§f You cannot report admins.`);
            return;
        }
        
        tempProperty.push(player.id);
        reportedPlayer.setDynamicProperty("safeguard:reports",tempProperty.filter(Boolean).toString()); // API Call, filter Boolean to prevent empty strings if initial property was empty
        
        player.sendMessage(`§6[§eSafeGuard§6]§f Sent your report to all online admins!`); // API Call

        sendMessageToAllAdmins(`§6[§eSafeGuard§6]§e ${player.name}§r has reported §e${reportedPlayer.name}§r for §e${reason}§r`); // Already wrapped
    } catch (e) {
        logDebug("[SafeGuard ERROR][reportPlayerInternal]", e, e.stack);
        if (player) { // player is the one who executed the command
            try {
                player.sendMessage("§cAn error occurred while processing the report details. Please check the console.");
            } catch (sendError) {
                logDebug("[SafeGuard ERROR][reportPlayerInternal] Failed to send error message to player:", sendError, sendError.stack);
            }
        }
    }
}