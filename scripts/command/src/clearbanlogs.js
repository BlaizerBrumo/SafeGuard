import { world } from '@minecraft/server';
import { newCommand } from '../handle';

newCommand({
    name:"clearbanlogs",
    description:"Clears ban logs",
    ownerOnly:true,
    run: (data) => {
        
        world.setDynamicProperty("safeguard:banLogs",undefined);
        data.player.sendMessage("§6[§eSafeGuard§6]§f The ban logs were successfully cleared");
        
    }
})