import { canFindPlayer, getPlayerByName, sendMessageToAllAdmins } from '../../assets/util';
import {newCommand} from '../handle';
import * as config from "../../config";
import { world } from '@minecraft/server';

newCommand({
    name: "report",
    description: "<player> <reason> Report a player privately to online admins",
    adminOnly: false,
    run: (data) => {
        const {args, player} = data;

        // Check if there are enough arguments
        if (args.length < 2) {
            return player.sendMessage("§6[§eSafeGuard§6]§f Usage: !report <player name> <reason>");
        }

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
            const playerName = args.slice(1, closingQuoteIndex + 1).join(" ").replaceAll('"', "").replaceAll('@', "");
            const reason = args.slice(closingQuoteIndex + 1).join(" ") ?? "No reason provided";

            if(!canFindPlayer(playerName)) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${playerName}§f was not found`);
            
            const reportedPlayer = getPlayerByName(playerName);

            reportPlayer(reportedPlayer,reason);
        } else {
            const playerName = args[1].replaceAll('"', "").replaceAll('@', "");
            const reportedPlayer = getPlayerByName(playerName);
            const reason = args.slice(2).join(" ") ?? "No reason provided";

            reportPlayer(reportedPlayer,reason);            
        }

        function reportPlayer(reportedPlayer,reason){
            let reportedPlayerReportsProperty = reportedPlayer.getDynamicProperty("safeguard:reports");
            if(reportedPlayerReportsProperty === undefined){
                reportedPlayer.setDynamicProperty("safeguard:reports","");
                reportedPlayerReportsProperty = reportedPlayer.getDynamicProperty("safeguard:reports");
            }  

            const tempProperty = reportedPlayerReportsProperty.split(",");
            


            if(player.hasTag("admin")){
                console.warn(tempProperty)
                player.sendMessage(`§6[§eSafeGuard§6]§f This player has been reported §e${tempProperty.length - 1}§r times.`);
                return;
            }

            if(tempProperty.includes(player.id)) return player.sendMessage(`§6[§eSafeGuard§6]§f You have already reported this player!`);
            if(reportedPlayer.name === player.name) return player.sendMessage(`§6[§eSafeGuard§6]§f You cannot report yourself!`);
            if(reportedPlayer.hasTag("admin")) return player.sendMessage(`§6[§eSafeGuard§6]§f You cannot report admins.`);
            tempProperty.push(player.id);
            reportedPlayer.setDynamicProperty("safeguard:reports",tempProperty.toString());
            
            player.sendMessage(`§6[§eSafeGuard§6]§f Sent your report to all online admins!`);

            sendMessageToAllAdmins(`§6[§eSafeGuard§6]§e ${player.name}§r has reported §e${reportedPlayer.name}§r for §e${reason}§r`);
        }

    }
})