import { getPlayerByName } from "../../assets/util";
import { newCommand } from "../handle";
import {MemoryTier} from "@minecraft/server";

newCommand({
    name:"systeminfo",
    description:"Get the system info of a selected player.",
    run:(data) => {
        const {player,args} = data;
        const targetPlayerName = data.args.slice(1).join(" ").replace(/["@]/g, "");
        const targetPlayer = getPlayerByName(targetPlayerName ?? player.name);
        if (!targetPlayer) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${targetPlayerName}§f was not found`);
        

        const {maxRenderDistance,memoryTier,platformType} = player.clientSystemInfo;

        player.sendMessage(`§eClient Info for §6${targetPlayer.name}§e: \n\nMax Render Distance: §6${maxRenderDistance}§e\nMemory: §6${Object.keys(MemoryTier)[memoryTier]}§e\nPlatform: §6${platformType}`);
    }
})