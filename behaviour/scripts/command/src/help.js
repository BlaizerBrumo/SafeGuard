import { newCommand } from '../handle';
import * as config from '../../config';

newCommand({
    name:"help",
    description: "Shows help message",
    adminOnly: false,
    run: (data) => {
        try {
            const {commandsData, player} = data;

            const playerIsAdmin = player.hasAdmin(); // Wrapped
            const playerIsOwner = player.isOwner(); // Wrapped

            let helpMessage = `§eREALM COMMAND PREFIX: §6${config.default.chat.prefix}§e\nAVAILABLE COMMANDS:§r\n\n`;
            for (const command of commandsData) {
                if (playerIsOwner) helpMessage += `§6${command.name}§r - §e§o${command.description}§r\n`;
                else if(playerIsAdmin && !command.ownerOnly) helpMessage += `§6${command.name}§r - §e§o${command.description}§r\n`;
                else if(!playerIsAdmin && !command.adminOnly && !command.ownerOnly) helpMessage += `§6${command.name}§r - §e§o${command.description}§r\n`;
            }
            
            player.sendMessage(helpMessage); // API Call
        } catch (e) {
            logDebug("[SafeGuard ERROR] Error in help command:", e, e.stack);
            // Attempt to notify the player if possible
            if (data && data.player) {
                try {
                    data.player.sendMessage("§cAn error occurred while trying to display help information. Please check the console.");
                } catch (sendError) {
                    logDebug("[SafeGuard ERROR] Failed to send error message to command executor in help:", sendError, sendError.stack);
                }
            }
        }
    }
})