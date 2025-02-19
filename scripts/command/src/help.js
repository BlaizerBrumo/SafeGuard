import { newCommand } from '../handle';
import * as config from '../../config';

newCommand({
    name:"help",
    description: "Shows help message",
    adminOnly: false,
    run: (data) => {
        const {commandsData, player} = data;

        const playerIsAdmin = player.hasAdmin();
        const playerIsOwner = player.isOwner();

        let helpMessage = `§eREALM COMMAND PREFIX: §6${config.default.chat.prefix}§e\nAVAILABLE COMMANDS:§r\n\n`;
        for (const command of commandsData) {
            if (playerIsOwner) helpMessage += `§6${command.name}§r - §e§o${command.description}§r\n`;
            else if(playerIsAdmin && !command.ownerOnly) helpMessage += `§6${command.name}§r - §e§o${command.description}§r\n`;
            else if(!playerIsAdmin && !command.adminOnly && !command.ownerOnly) helpMessage += `§6${command.name}§r - §e§o${command.description}§r\n`;
        }
        
        player.sendMessage(helpMessage);
    }
})