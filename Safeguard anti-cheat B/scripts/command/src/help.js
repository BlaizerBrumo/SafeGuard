import { newCommand } from '../handle';
import * as config from '../../config';

newCommand({
    name:"help",
    description: "Shows help message",
    adminOnly: false,
    run: (data) => {
        const {commandsData, player} = data;

        const playerIsAdmin = player.hasTag("admin");

        let helpMessage = `§eREALM COMMAND PREFIX: §6${config.default.chat.prefix}§e\nAVAILABLE COMMANDS:§r\n\n`;
        for (const command of commandsData) {
            if(playerIsAdmin) helpMessage += `§6${command.name}§r - §e§o${command.description}§r\n`;
            else if(!playerIsAdmin && !command.adminOnly) helpMessage += `§6${command.name}§r - §e§o${command.description}§r\n`;
        }
        
        player.sendMessage(helpMessage);
    }
})