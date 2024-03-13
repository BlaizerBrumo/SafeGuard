import { scoreboardAction } from '../../assets/util';
import config from '../../config';
import { newCommand } from '../handle';
import * as Minecraft from "@minecraft/server";

const world = Minecraft.world;

newCommand({
    name:"worldborder",
    run: (data) => {
        let player = data.player;
        let oldBorder = null;
		world.scoreboard.getObjectives().forEach((objective) => {
		  const objectiveId = objective.id;
		  if (objectiveId.startsWith("safeguard:worldBorder:")) oldBorder = objectiveId.split("safeguard:worldBorder:")[1];
		});
		const border = data.args[1];
		if (!border) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f The current border is §e${oldBorder ?? "not set"}§f.`);
		  return;
		}
		if(border === "remove"){
			if(!oldBorder) return player.sendMessage(`§6[§eSafeGuard§6]§f The world border is §enot set§f.`);
			scoreboardAction(`safeguard:worldBorder:${oldBorder}`,"remove");
			player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bremoved the world border! §r"}]}`);
			player.sendMessage(`§6[§eSafeGuard§6]§r Removed the world border.`);
			return;
		}
		if (isNaN(border) || border === "" || border < config.world.worldborder.minBorderDistance) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f You need to enter a valid number for the border (must be more than ${config.world.worldborder.minBorderDistance}).`);
		  return;
		}
		world.scoreboard.getObjectives().forEach((objective) => {
		  if (objective.id.startsWith("safeguard:worldBorder:")) scoreboardAction(objective.id, "remove");
		});
		scoreboardAction(`safeguard:worldBorder:${border}`, "add");
		player.sendMessage(`§6[§eSafeGuard§6]§f Set world border to §e${border}§f blocks.`);
		player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${player.name} §bset the world border to§5 ${border}§b blocks! §r"}]}`);
		
    }
})