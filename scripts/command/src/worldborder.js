import { scoreboardAction, sendMessageToAllAdmins } from '../../assets/util';
import config from '../../config';
import { newCommand } from '../handle';
import * as Minecraft from "@minecraft/server";

const world = Minecraft.world;

newCommand({
    name:"worldborder",
	description: "<border | remove | origin <x> <z>> Get or set the worldborder",
    run: (data) => {
        const {args,player} = data;
        const oldBorder = world.getDynamicProperty("safeguard:worldBorder");
		const border = args[1] !== undefined ? Number(args[1]) : undefined;

		//no args given, display current world border
		if (args[1] === undefined) {
			const originX = world.worldBorderOriginX ?? 0;
			const originZ = world.worldBorderOriginZ ?? 0;
			return player.sendMessage(`§6[§eSafeGuard§6]§f The current border is §e${oldBorder ?? "not set"}§f, centered on §e${originX}, ${originZ}§f.`);
		}

		//user wants to set where the border is centered
		if (args[1] === "origin") {
			const originX = Number(args[2]);
			const originZ = Number(args[3]);
			if (isNaN(originX) || isNaN(originZ)) {
				player.sendMessage(`§6[§eSafeGuard§6]§f Usage: §e!worldborder origin <x> <z>§f.`);
				return;
			}

			world.setDynamicProperty("safeguard:worldBorderOriginX", originX);
			world.setDynamicProperty("safeguard:worldBorderOriginZ", originZ);
			world.worldBorderOriginX = originX;
			world.worldBorderOriginZ = originZ;

			player.sendMessage(`§6[§eSafeGuard§6]§f Set the world border origin to §e${originX}, ${originZ}§f.`);
			sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fset the world border origin to §e${originX}, ${originZ}§f! §r`,true);
			return;
		}

		//user wants to remove the border
		if(args[1] === "remove"){
			if(!oldBorder) return player.sendMessage(`§6[§eSafeGuard§6]§f The world border is §enot set§f.`);
			world.setDynamicProperty("safeguard:worldBorder",0);
			world.worldBorder = null;

			//notify admins
			sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fremoved the world border! §r`,true);
			player.sendMessage(`§6[§eSafeGuard§6]§r Removed the world border.`);
			return;
		}
		else if (isNaN(border) || border < config.world.worldborder.minBorderDistance) {
			//arg is invalid
			player.sendMessage(`§6[§eSafeGuard§6]§f You need to enter a valid number for the border (must be more than ${config.world.worldborder.minBorderDistance}).`);
			return;
		}
		//update world border if everything is valid
		world.setDynamicProperty("safeguard:worldBorder",border);
		world.worldBorder = border;
		player.sendMessage(`§6[§eSafeGuard§6]§f Set world border to §e${border}§f blocks.`);
		sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§e ${player.name} §fset the world border to§e ${border}§f blocks! §r`,true);
		
    }
})