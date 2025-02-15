import { newCommand } from '../handle';
import { sendMessageToAllAdmins } from "../../assets/util";
import { world } from '@minecraft/server';

newCommand({
    name: "fakeleave_server",
    description: "Simulate leaving the server",
    run: (data) => {
        const { player } = data;

        world.sendMessage(`§e${player.name} left the server`);
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name}§f fake left.`,true);
    }
})