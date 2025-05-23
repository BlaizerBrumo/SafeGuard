import { newCommand } from '../handle';
import { sendMessageToAllAdmins } from "../../assets/util";
import { world } from '@minecraft/server';

newCommand({
    name: "fakejoin",
    description: "Simulate joining the game",
    run: (data) => {
        const { player } = data;

        world.sendMessage(`§e${player.name} joined the game`);
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name}§f fake joined.`,true);
    }
})