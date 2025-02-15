import { newCommand } from '../handle';
import { sendMessageToAllAdmins } from "../../assets/util";
import { world } from '@minecraft/server';


newCommand({
    name: "fakeleave",
    description: "Simulate leaving the realm",
    run: (data) => {
        const { player } = data;

        world.sendMessage(`§e${player.name} left the realm`);
        sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name}§f fake left.`,true);
    }
})