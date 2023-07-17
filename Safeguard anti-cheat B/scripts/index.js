import * as Minecraft from '@minecraft/server';
import { ActionFormData, MessageFormData, ModalFormData } from '@minecraft/server-ui';

import * as config from "./config.js";
import * as ui from "./assets/ui.js";
import {invsee, getPlayerByName, canFindPlayer, scoreboardAction} from "./assets/util.js";

console.warn("Script Loaded");
const world = Minecraft.world;


world.beforeEvents.itemUseOn.subscribe((data) => {
	const player = data.source;
	let antiCBEon = (world.scoreboard.getObjective('anti_cbe_on') === undefined) ? false : true;
	let antiItemsOn = (world.scoreboard.getObjective('item_on') === undefined) ? false : true;

	let item = data.itemStack;
	if (item) {
		if(player.hasTag("admin")) return;
		if (config.cbeItems.includes(item.typeId) && antiCBEon) {
				world.sendMessage(`§6[§eSafeGuard§6]§r§c§l ${player.nameTag} §r§4Placed illegal item: §l§c${item.typeId.replace("minecraft:","")}§r§4!§r`);
				player.runCommandAsync('function punishment/warning/ill_warning');
				data.cancel = true;
		}
		if(config.bannedItems.includes(item.typeId) || item.typeId.endsWith("_spawn_egg") && antiItemsOn){
			world.sendMessage(`§6[§eSafeGuard§6]§r§c§l ${player.nameTag} §r§4Placed illegal item: §l§c${item.typeId.replace("minecraft:","")}§r§4!§r`);
				player.runCommandAsync('function punishment/warning/ill_warning');
				data.cancel = true;
		}
}
});

world.beforeEvents.chatSend.subscribe((data) => {
	const player = data.sender;
	const message = data.message;
	const sender = data.sender.name;
  
	if (player.hasTag('muted') || player.hasTag('Ban')) {
	  player.sendMessage('§6[§eSafeGuard§6]§r§c You are muted!');
	  data.cancel = true;
	  return;
	}
  
	if (!message.startsWith(config.prefix)) return;
  
	const args = message.substring(config.prefix.length).split(" ");
  
	if (!player.hasTag("admin")) {
	  player.sendMessage('§6[§eSafeGuard§6]§r§c You need admin tag to run this!');
	  data.cancel = true;
	  return;
	}
  
	switch (args[0]) {
		case "help":
			player.sendMessage(`§l§aPREFIX:§2 §r${config.prefix}\n§l§aCOMMANDS:\n§r§eban <player name> §r|| to ban a person\n§einvsee <player name> §r|| see inventory of a player\n§emute <player name> §r|| mute a player\n§eunmute <player name>§r || unmute a player\n§eworldborder [border] §r|| get or set the world border\n§evanish §r|| toggle vanish mode\n§eclearchat §r|| clear the chat\n§efakeleave §r|| simulate leaving the realm\n§efakeleave_server §r|| simulate leaving the server\n§esummon_npc §r|| summon an NPC\n§enotify §r|| toggle anticheat notifications`);
			data.cancel = true;
		break;

  
	  case "invsee":
		data.cancel = true;
		const setNameInvsee = args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
		if (getPlayerByName(setNameInvsee).hasTag("admin")) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Can't view the inventory of §e${setNameInvsee}§f, they're an admin.`);
		  return;
		}
		player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bviewed the inventory of§l§5 ${setNameInvsee.replace("@", "")}! §r"}]}`);
		invsee(sender, setNameInvsee);
		break;
  
	  case "ban":
		data.cancel = true;
		const setNameBan = args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
		if (!canFindPlayer(setNameBan)) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameBan}§f was not found`);
		  return;
		}
		if (getPlayerByName(setNameBan).hasTag("admin")) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Can't ban §e${setNameBan}§f, they're an admin.`);
		  return;
		}
		player.runCommandAsync('tag "' + setNameBan +'" add Ban');
		player.sendMessage(`§6[§eSafeGuard§6]§f Banned §e${setNameBan}`);
		player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bbanned§l§5 ${setNameBan}! §r"}]}`);
		break;
  
	  case "mute":
		data.cancel = true;
		const setNameMute = args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
		if (!canFindPlayer(setNameMute)) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameMute}§f was not found`);
		  return;
		}
		if (getPlayerByName(setNameMute).hasTag("admin")) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Can't mute §e${setNameMute}§f, they're an admin.`);
		  return;
		}
		player.runCommandAsync('tag "' + setNameMute +'" add muted');
		player.sendMessage(`§6[§eSafeGuard§6]§f Muted §e${setNameMute}`);
		player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bmuted§l§5 ${setNameMute}! §r"}]}`);
		break;
  
	  case "unmute":
		data.cancel = true;
		const setNameUnmute = args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
		if (!canFindPlayer(setNameUnmute)) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameUnmute}§f was not found`);
		  return;
		}
		if (!getPlayerByName(setNameUnmute).hasTag("muted")) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameUnmute}§f is not muted.`);
		  return;
		}
		player.runCommandAsync('tag "' + setNameUnmute +'" remove muted');
		player.sendMessage(`§6[§eSafeGuard§6]§f Unmuted §e${setNameUnmute}`);
		player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bunmuted§l§5 ${setNameUnmute}! §r"}]}`);
		break;
  
	  case "worldborder":
		data.cancel = true;
		let oldBorder = null;
		world.scoreboard.getObjectives().forEach((objective) => {
		  const objectiveId = objective.id;
		  if (objectiveId.startsWith("safeguard:worldBorder:")) oldBorder = objectiveId.split("safeguard:worldBorder:")[1];
		});
		const border = args[1];
		if (!border) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f The current border is §e${oldBorder ?? "not set"}§f.`);
		  return;
		}
		if(border === "remove"){
			if(!oldBorder) return player.sendMessage(`§6[§eSafeGuard§6]§f The world border is §enot set§f.`);
			scoreboardAction(`safeguard:worldBorder:${oldBorder}`,"remove");
			player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bremoved the world border! §r"}]}`);
			player.sendMessage(`§6[§eSafeGuard§6]§r Removed the world border.`);
			return;
		}
		if (isNaN(border) || border === "" || border < 500) {
		  player.sendMessage(`§6[§eSafeGuard§6]§f You need to enter a valid number for the border (must be more than 500).`);
		  return;
		}
		world.scoreboard.getObjectives().forEach((objective) => {
		  if (objective.id.startsWith("safeguard:worldBorder:")) scoreboardAction(objective.id, "remove");
		});
		scoreboardAction(`safeguard:worldBorder:${border}`, "add");
		player.sendMessage(`§6[§eSafeGuard§6]§f Set world border to §e${border}§f blocks.`);
		player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bset the world border to§5 ${border}§b blocks! §r"}]}`);
		break;
  
	  case "vanish":
		player.runCommandAsync("function admin_cmds/vanish");
		data.cancel = true;
		break;
  
	  case "clearchat":
		player.runCommandAsync("function admin_cmds/clearchat");
		data.cancel = true;
		break;
  
	  case "fakeleave":
		player.runCommandAsync("function admin_cmds/fake_leave");
		data.cancel = true;
		break;
  
	  case "fakeleave_server":
		player.runCommandAsync("function admin_cmds/fake_leave_server");
		data.cancel = true;
		break;
  
	  case "summon_npc":
		player.runCommandAsync("function admin_cmds/summon_npc");
		data.cancel = true;
		break;
  
	  case "notify":
		player.runCommandAsync("function admin_cmds/notify");
		data.cancel = true;
		break;
  
	  default:
		player.sendMessage(`§cUnknown command: §f${args}`);
		data.cancel = true;
		break;
	}
  })
  

Minecraft.system.runInterval(()  => {
[...world.getPlayers()].forEach(player => {
	const plrName = player.name;
	const inv = player.getComponent("inventory").container;
	
	//check settings status
	const antiItemsOn = (world.scoreboard.getObjective('item_on') === undefined) ? false : true;
	const antiCBEon = (world.scoreboard.getObjective('anti_cbe_on') === undefined) ? false : true;
	const autoModOn = (world.scoreboard.getObjective('auto_mod_on') === undefined) ? false : true;
	const anti32kOn = (world.scoreboard.getObjective('32k_on') === undefined) ? false : true;

	const item = player.getComponent("minecraft:inventory").container.getItem(player.selectedSlot);
		if(item && !player.hasTag("admin")){
			const itemName = item.nameTag ?? '';
			if (player.hasTag('admin')) return;
			else{
				//illegal name check
				if (itemName.length > 30 && antiItemsOn) {
					world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Has illegal item: §l§c' +item.typeId.replace('minecraft:','') +'§l§4(chr limit exceeded§c ' + itemName.length + '§4/30)§4!§r')
					player.runCommandAsync('function punishment/warning/ill_warning');
					inv.setItem(player.selectedSlot,  new Minecraft.ItemStack('air', 1));
					return;
				}
				else if (item.getLore().length > 0 && antiItemsOn) { //items in surivial usually don't have lore in them so it is banned(note to make this a setting)
					world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + '§r §4Has illegal item: §c§l' +item.typeId.replace('minecraft:','') +'§4§l(lore chr limit exceeded§c ' + String(item.getLore()).length + '§4/0)§4!§r')
					player.runCommandAsync('function punishment/warning/ill_warning');
					inv.setItem(player.selectedSlot,  new Minecraft.ItemStack('air', 1));
					return;
				}
				//keyword ban check
				for(var u = 0; u < config.bannedKeyWords.length; u++){
					if (String(itemName.toLowerCase()).includes(config.bannedKeyWords[u]) && antiItemsOn) {
						world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + '§r §4Has illegal item: §c§l' +item.typeId.replace('minecraft:','') +' §r§4with banned keyword, item name:§r ' + String(itemName) + '§4!§r');
						inv.setItem(player.selectedSlot,  new Minecraft.ItemStack('air', 1));
						return;
					}}

				//cbe item list check
				if (config.cbeItems.includes(item.typeId) && antiCBEon) {
					player.runCommandAsync('function punishment/warning/ill_warning');
					world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Was detected having banned item: §l§c' + item.typeId.replace('minecraft:','') + '§4!§r')
					inv.setItem(player.selectedSlot,  new Minecraft.ItemStack('air', 1));
					if(autoModOn) return player.runCommandAsync('kick "' + plrName + '" §l§4kicked by §eSafe§6Guard §4AntiCheat\n For obtaining banned item: §c' + item.typeId.replace('minecraft:',''));
				}

				//banned item list check
				if (config.bannedItems.includes(item.typeId) || item.typeId.endsWith("_spawn_egg") && antiItemsOn) {
					player.runCommandAsync('function punishment/warning/cbe_warning');
					world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Was detected having banned item: §l§c' + item.typeId.replace('minecraft:','') + '§4!§r');
					inv.setItem(player.selectedSlot, new Minecraft.ItemStack('air', 1));
					if(autoModOn) return player.runCommandAsync('kick "' + plrName + '" §l§4kicked by §eSafe§6Guard §4AntiCheat\n For obtaining banned item: §c' + item.typeId.replace('minecraft:',''));
				}
				
		}

			}
	//check if gametest if on
	if(world.scoreboard.getObjective("safeguard:gametest_on") == undefined){
		world.scoreboard.addObjective("safeguard:gametest_on","Gamtetest Is On");
	}

	//end lock
	if(player.dimension.id == "minecraft:the_end" && world.scoreboard.getObjective('end_lock') !== undefined){
		player.kill();
	}

	world.scoreboard.getObjectives().forEach((objective) => {
		const objectiveId = objective.id;
		if(objectiveId.startsWith("safeguard:worldBorder:")){
			let {x,y,z} = player.location;
			const border = objectiveId.split("safeguard:worldBorder:")[1];
			if(x > border || y > border || z > border || x < -border || y < -border || z < -border ) {
				player.sendMessage(`§6[§eSafeGuard§6]§r You reached the border of §e${border}§f blocks!`)
				player.teleport({x: 0, y: 325, z: 0},{dimension: player.dimension, rotation: {x: 0, y: 0}, keepVelocity: false});
				player.addEffect("slow_falling", 1200, { amplifier: 1, showParticle: false })
			}
		}
	});

})
});


world.afterEvents.playerSpawn.subscribe((data) => {
	const player = data.player;
	if(!player.hasTag("Ban")) return;
	world.runCommandAsync(`kick "${player.name}" You are banned.`);
})

Minecraft.system.beforeEvents.watchdogTerminate.subscribe((beforeWatchdogTerminate) => {
	beforeWatchdogTerminate.cancel = true;

	world.sendMessage(`§6[§eSafeGuard§6] §f${new Date()} |§4 A Watchdog Exception has been detected and has been cancelled successfully. Reason: §c${beforeWatchdogTerminate.terminateReason}`);
});

world.afterEvents.itemUse.subscribe((data) => {
	if (data.source.typeId !== "minecraft:player") return;
	const player = data.source;
	const item = data.itemStack;
	if(!player.hasTag("admin")){
		player.playSound("random.anvil_land");
		player.sendMessage("§6[§eSafeGuard§6]§r §4You need admin tag to use admin panel!§r");
		return;
	}
	if(!item) return;
	if(item.typeId !== "safeguard:admin_panel") return;

	let mainForm = new ActionFormData()
	.title("SafeGuard Admin Panel")
	.body(`Please select an option from below:`)
	.button("Settings","textures/ui/settings_glyph_color_2x.png")
	.button("Quick Ban","textures/ui/hammer_l.png")
	.button("Player Actions","textures/ui/icon_multiplayer.png")
	player.playSound("random.pop");

	mainForm.show(player).then((formData) => {
		if (formData.canceled) return;
		if(formData.selection === 0) return ui.settingsForm(player);
		if(formData.selection === 1) return ui.playerSelectionForm(player,"ban");
		if(formData.selection === 2) return ui.playerSelectionForm(player,"action");
	})
});