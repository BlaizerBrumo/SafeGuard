import * as Minecraft from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';


import * as config from "./config.js";
import * as ui from "./assets/ui.js";
import {invsee, getPlayerByName, canFindPlayer, scoreboardAction, unban, copyInv, formatMilliseconds } from "./assets/util.js";
import { globalBanList } from './assets/globalBanList.js';


console.warn("Script Loaded");
const world = Minecraft.world;




world.beforeEvents.itemUseOn.subscribe((data) => {
	const player = data.source;
	let antiItemsOn = (world.scoreboard.getObjective('item_on') === undefined) ? false : true;

	let item = data.itemStack;
	if (item) {
		if(player.hasTag("admin")) return;
		if(config.default.item.anti_items.bannedItems.includes(item.typeId) || item.typeId.endsWith("_spawn_egg")){
			if(!antiItemsOn) return;
			world.sendMessage(`§6[§eSafeGuard§6]§r§c§l ${player.name} §r§4Placed illegal item: §l§c${item.typeId.replace("minecraft:","")}§r§4!§r`);
				player.runCommandAsync('function punishment/warning/ill_warning');
				data.cancel = true;
		}
}
});



world.beforeEvents.chatSend.subscribe((data) => {
	const player = data.sender;
	const message = data.message;
	const sender = data.sender.name;

	const prefix = config.default.chat.prefix;
	const whitelistedPrefixes = config.default.chat.spammer.whitelistedPrefixes;
	let checkSpam = false;

	const antiSpam = (world.scoreboard.getObjective('safeguard:spammer_protection') === undefined) ? false : true;

	//message spam protection
	if(message == player.lastMessage && !player.hasTag("admin") && antiSpam){
		data.cancel = true;
		player.sendMessage(`§6[§eSafeGuard§6]§r§c Please don't send repeating messages!`);
		return;
	}
	else if(Date.now() - player.lastMessageDate <= config.default.chat.spammer.minTime && !player.hasTag("admin") && antiSpam){
		data.cancel = true;
		player.sendMessage(`§6[§eSafeGuard§6]§r§c You're sending messages too quickly!`);
		return;
	}
	whitelistedPrefixes.forEach(wPrefix => {
		if(message.startsWith(wPrefix)){
			checkSpam = true;
		}
	})
	if(!checkSpam){
		player.lastMessage = message;
		player.lastMessageDate = Date.now();
	}
  
	if (player.hasTag('muted') || player.hasTag('Ban')) {
	  player.sendMessage('§6[§eSafeGuard§6]§r§c You are muted!');
	  data.cancel = true;
	  return;
	}
  
	if (!message.startsWith(prefix)) return;
  
	const args = message.substring(prefix.length).split(" ");
  
	if (!player.hasTag("admin")) {
	  player.sendMessage('§6[§eSafeGuard§6]§r§c You need admin tag to run this!');
	  data.cancel = true;
	  return;
	}
  
	switch (args[0]) {
		case "help":
			player.sendMessage(`§l§aPREFIX:§2 §r${prefix}\n§l§aCOMMANDS:\n§r§eban <player name> §r|| to ban a person\n§einvsee <player name> §r|| see inventory of a player\n§emute <player name> §r|| mute a player\n§eunmute <player name>§r || unmute a player\n§eworldborder [border] §r|| get or set the world border\n§evanish §r|| toggle vanish mode\n§eclearchat §r|| clear the chat\n§efakeleave §r|| simulate leaving the realm\n§efakeleave_server §r|| simulate leaving the server\n§esummon_npc §r|| summon an NPC\n§enotify §r|| toggle anticheat notifications\n§elagclear §r|| clear lag\n§eunban <player name> §r|| unban a player`);
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

	  case "lagclear":
		player.runCommandAsync("function anti/anti_lag");
		data.cancel = true;
		break;
  
	  case "notify":
		player.runCommandAsync("function admin_cmds/notify");
		data.cancel = true;
		break;

	  case "copyinv":
		data.cancel = true;
		const setNameInvcopy = args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
		if (!canFindPlayer(setNameInvcopy)) {
			player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setNameInvcopy}§f was not found`);
			return;
		  }
		copyInv(player,setNameInvcopy)
		break;

		case "unban":
			data.cancel = true;
			const setNameUnban = args.slice(1).join(" ").replaceAll('"', "").replaceAll('@', "");
			unban(player,setNameUnban);
			break;
	
  
	  default:
		player.sendMessage(`§cUnknown command: §f${args}`);
		data.cancel = true;
		break;
	}
})
  
//anti nuker
world.afterEvents.blockBreak.subscribe((data) => {
	const { player, dimension, block } = data;
	const blockId = data.brokenBlockPermutation.type.id;

	const diamondAlertOn = world.scoreboard.getObjective('safeguard:diamond_alert');
	const netheriteAlertOn = world.scoreboard.getObjective('safeguard:netherite_alert');
	const antiNuker = world.scoreboard.getObjective('safeguard:nuker_check');
	const autoModOn = (world.scoreboard.getObjective('auto_mod_on') === undefined) ? false : true;


	if(blockId == "minecraft:bedrock" || blockId == "minecraft:end_portal_frame"){
		if(player.hasTag("admin") || player.hasTag("gamemode:creative")) return;
		block.setPermutation(data.brokenBlockPermutation);
		world.sendMessage(`§6[§eSafeGuard§6]§r§c§l §r§c${player.name}§4 Attempted to break §c${blockId}`)
	}


	player.blocksBroken++
	if(player.blocksBroken > config.default.world.nuker.maxBlocks && antiNuker){
		if(player.hasTag("admin") && !config.default.world.nuker.checkAdmins) return;
		player.runCommandAsync(`scoreboard players add @s "safeguard:nuker_check" 1`)
				// kill the items dropped items
				const items = dimension.getEntities({
					location:{x: block.location.x, y: block.location.y, z: block.location.z},
					minDistance: 0,
					maxDistance: 2,
					type: "item"
				});
		
				for(const item of items) item.kill();
		
				block.setPermutation(data.brokenBlockPermutation);
				if(autoModOn) {
					player.runCommand("gamemode adventure @s");
					player.teleport({x: player.location.x, y: 325, z: player.location.z},{dimension: player.dimension, rotation: {x: 0, y: 0}, keepVelocity: false});
					player.runCommand(`kick "${player.name}" §r§6[§eSafeGuard§6]§r§4 You were detected using nuker by breaking §c${player.blocksBroken}§4 in one tick. `)
					world.sendMessage(`§6[§eSafeGuard§6]§r§c§l ${player.name} §r§4Was detected using nuker by breaking §l§c${player.blocksBroken}§r§4 blocks in one tick!§r`);
				}
				return;
	}
	if(blockId == "minecraft:diamond_ore" || blockId =="minecraft:deepslate_diamond_ore"){
		if(!diamondAlertOn) return
		player.runCommandAsync(`tellraw @a[tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"text":"§r§e${player.name}§f mined x1 §ediamond ore§r"}]}`);
	}
	if(blockId == "minecraft:ancient_debris" && netheriteAlertOn){
		player.runCommandAsync(`tellraw @a[tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"text":"§r§e${player.name}§f mined x1 §enetherite ore§r"}]}`);
	}
})

Minecraft.system.runInterval(()  => {
	//check if gametest if on
	if(world.scoreboard.getObjective("safeguard:gametest_on") == undefined){
		world.scoreboard.addObjective("safeguard:gametest_on","Gamtetest Is On");
	}
	[...world.getPlayers()].forEach(player => {
		const plrName = player.name;
		const inv = player.getComponent("inventory").container;
		const velocity = player.getVelocity();

		player.blocksBroken = 0;
		player.hitEntities = [];
		
		//check settings status
		const antiItemsOn = (world.scoreboard.getObjective('item_on') === undefined) ? false : true;
		const autoModOn = (world.scoreboard.getObjective('auto_mod_on') === undefined) ? false : true;
		const antiAutoClicker =  (world.scoreboard.getObjective('safeguard:cps_check') === undefined) ? false : true;
		const antiFly = (world.scoreboard.getObjective('safeguard:fly_check') === undefined) ? false : true;

		if(velocity.x > 0 || velocity.z > 0){
			if(!player.isFalling) player.addTag("safeguard:moving");
		} 
		if(velocity.x == 0 && velocity.z == 0 && !player.isFalling) player.removeTag("safeguard:moving")

		const item = player.getComponent("minecraft:inventory").container.getItem(player.selectedSlot);
		if(!item) player.removeTag("safeguard:hasRiptide");
			if(item){
				const itemName = item.nameTag ?? '';

				//check if player has a trident
				if(item.typeId == "minecraft:trident") {
					const hasRiptide = item.getComponent("enchantments").enchantments.hasEnchantment("riptide");
					if(hasRiptide !== 0) player.addTag("safeguard:hasRiptide");
				}
				else if(item.typeId !== "minecraft:trident") player.removeTag("safeguard:hasRiptide");

				if (player.hasTag('admin')) return;
				else{
					//illegal name check
					if (itemName.length > config.default.item.anti_items.maxItemNameLength && antiItemsOn) {
						world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Has illegal item: §l§c' +item.typeId.replace('minecraft:','') +'§l§4(chr limit exceeded§c ' + itemName.length + '§4/30)§4!§r')
						player.runCommandAsync('function punishment/warning/ill_warning');
						inv.setItem(player.selectedSlot,  new Minecraft.ItemStack('air', 1));
						return;
					}
					else if (item.getLore().length > 0 && antiItemsOn && config.default.item.anti_items.antiLore) { //items in surivial usually don't have lore in them so it is banned(note to make this a setting)
						world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + '§r §4Has illegal item: §c§l' +item.typeId.replace('minecraft:','') +'§4§l(lore chr limit exceeded§c ' + String(item.getLore()).length + '§4/0)§4!§r')
						player.runCommandAsync('function punishment/warning/ill_warning');
						inv.setItem(player.selectedSlot,  new Minecraft.ItemStack('air', 1));
						return;
					}
					//keyword ban check
					for(var u = 0; u < config.default.item.anti_items.bannedKeyWords.length; u++){
						if (String(itemName.toLowerCase()).includes(config.default.item.anti_items.bannedKeyWords[u]) && antiItemsOn) {
							world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + '§r §4Has illegal item: §c§l' +item.typeId.replace('minecraft:','') +' §r§4with banned keyword, item name:§r ' + String(itemName) + '§4!§r');
							inv.setItem(player.selectedSlot,  new Minecraft.ItemStack('air', 1));
							return;
						}}


					//banned item list check
					if (config.default.item.anti_items.bannedItems.includes(item.typeId) || item.typeId.endsWith("_spawn_egg")) {
						//console.warn(antiItemsOn)
						if(!antiItemsOn) return
						player.runCommandAsync('function punishment/warning/cbe_warning');
						world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Was detected having banned item: §l§c' + item.typeId.replace('minecraft:','') + '§4!§r');
						inv.setItem(player.selectedSlot, new Minecraft.ItemStack('air', 1));
						if(autoModOn) return player.runCommandAsync('kick "' + plrName + '" §l§4kicked by §eSafe§6Guard §4AntiCheat\n For obtaining banned item: §c' + item.typeId.replace('minecraft:',''));
					}
					
			}

				}

		const finalcps = world.scoreboard.getObjective("safeguard:finalcps").getScore(player.scoreboardIdentity);

		if(finalcps > config.default.combat.autoclicker.maxCps && !player.hasTag("admin") && antiAutoClicker){
			world.sendMessage(`§6[§eSafeGuard§6]§r §c§l${player.name}§r§4 was detected using autoclicker with a cps of §l§c${finalcps}`);
			player.runCommandAsync(`scoreboard players add @s "safeguard:cps_check" 1`)
			player.addEffect("weakness", 40, { amplifier: 255, showParticles: false })
			player.runCommandAsync(`scoreboard players reset @s safeguard:cpstimer`);
			player.runCommandAsync(`scoreboard players reset @s safeguard:cps`);
			player.runCommandAsync(`scoreboard players reset @s safeguard:finalcps`);
		}
		if(world.scoreboard.getObjective("safeguard:cpstimer").getScore(player.scoreboardIdentity) > 20){

			const cps = world.scoreboard.getObjective("safeguard:cps").getScore(player.scoreboardIdentity);

			player.runCommandAsync(`scoreboard players set @s safeguard:finalcps ${cps}`)
			player.runCommandAsync(`scoreboard players reset @s safeguard:cpstimer`);
			player.runCommandAsync(`scoreboard players reset @s safeguard:cps`);
			
		}
		
		//end lock
		if(player.dimension.id == "minecraft:the_end" && world.scoreboard.getObjective('end_lock')){
			player.kill();
		}

		world.scoreboard.getObjectives().forEach((objective) => {
			const objectiveId = objective.id;
			if(objectiveId.startsWith("safeguard:worldBorder:")){
				let {x,y,z} = player.location;
				const border = objectiveId.split("safeguard:worldBorder:")[1];
				if(x > border || y > border || z > border || x < -border || y < -border || z < -border ) {
					player.sendMessage(`§6[§eSafeGuard§6]§r You reached the border of §e${border}§f blocks!`);
					player.teleport({x: 0, y: 325, z: 0},{dimension: player.dimension, rotation: {x: 0, y: 0}, keepVelocity: false});
					player.addEffect("slow_falling", 1200, { amplifier: 1, showParticles: false })
				}
			}
		});

		//anti fly idk
		let debugMenu = {
			isFalling: player.isFalling,
			isFlying: player.isFlying,
			isOnGround: player.isOnGround,
			isGliding: player.isGliding,
			isClimbing: player.isClimbing,
			fallDistance: player.fallDistance,
			isSwimming: player.isSwimming,
			isJumping: player.isJumping,
			isSprinting: player.isSprinting,
			isInWater: player.isInWater,
			isSneaking: player.isSneaking,
			velocity: velocity
		}
		//world.sendMessage(`-------------\n§e${JSON.stringify(velocity, null, 2)}§r\n-------------`);
		if(config.debug) world.sendMessage(`§e${JSON.stringify(debugMenu, null, 2)}§r\n-------------`);

		//check if fall distance is in negatives (fly detection)
		if(player.fallDistance < config.default.movement.fly.minFallDistance && antiFly && !player.hasTag("gamemode:creative") && !player.hasTag("admin") && !player.hasTag("safeguard:hasRiptide") && !player.isGliding && !player.isClimbing){
			world.sendMessage(`§6[§eSafeGuard§6] §r§l§c${player.name}§4 was detected flying!`);
			player.runCommandAsync(`scoreboard players add @s "safeguard:fly_check" 1`)
			player.tryTeleport({x: player.location.x, y: player.location.y + player.fallDistance, z: player.location.z},{checkForBlocks: true,dimension: player.dimension, rotation: {x:0,y:0}, keepVelocity: false});
		}

	
	})
});


//combat cheats detection and shi
world.afterEvents.entityHitEntity.subscribe(async (data) => {
	const player = data.damagingEntity;
	const hurtEntity = data.hitEntity;

	const antiKillaura = (world.scoreboard.getObjective('safeguard:killaura_check') === undefined) ? false : true;
	
	const hasWeakness = player.getEffect("weakness");

	if(player.typeId !== "minecraft:player") return;
	//if(hurtEntity.typeId !== "minecraft:player") return;
	
	if(!hasWeakness && !player.hitEntities.includes(hurtEntity.id)) player.hitEntities.push(hurtEntity.id);


	if(player.hitEntities.length > config.default.combat.killaura.maxHitEntities && !player.hasTag("admin") && antiKillaura){
		world.sendMessage(`§6[§eSafeGuard§6]§r §c§l${player.name}§r§4 was detected using killaura by attacking §l§c${player.hitEntities.length}§r§4 entities at a time!`);
		player.addEffect("weakness", 40, { amplifier: 255, showParticles: false });
		player.runCommandAsync(`scoreboard players add @s "safeguard:killaura_check" 1`)
		player.hitEntities = 0;
	}

	if(!hasWeakness) player.runCommandAsync(`scoreboard players add @s safeguard:cps 1`);
})


world.afterEvents.playerSpawn.subscribe((data) => {
	const player = data.player;


	//if(!player.hasTag("Ban") || !player.hasTag("safeguard:Ban")) return;

	if(globalBanList.includes(player.name)) return player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r §4Your name was found in the SafeGuard global ban list.`)

	if(world.scoreboard.getObjective(`safeguard:unban:${player.name}`)){
		player.getTags().forEach(tag => {
			if(tag.startsWith("safeguardBanInfo**")) player.removeTag(tag)
		})
		player.addTag("warning_reset");
		player.removeTag("safeguard:Ban");
		player.removeTag("ac_ban");
		player.removeTag("ban");
		player.runCommandAsync("scoreboard players reset @s ac_banned");
		player.removeTag("Ban");
		player.sendMessage(`§6[§eSafeGuard§6]§r §aYou were unbanned!`);
		player.teleport({x: player.location.x, y: 325, z: player.location.z},{dimension: player.dimension, rotation: {x: 0, y: 0}, keepVelocity: false});
		player.addEffect("slow_falling", 1200, { amplifier: 1, showParticles: false });
		player.runCommandAsync("gamemode survival @s");
		scoreboardAction(`safeguard:unban:${player.name}`,"remove");
		return;
	}

	if(player.hasTag("Ban")) return player.runCommandAsync(`kick "${player.name}" You are banned.`);
	if(player.hasTag("safeguard:Ban")){
		let banInfo;
		player.getTags().forEach(tag => {
			if(tag.startsWith("safeguardBanInfo**")) banInfo = tag;
		})
		const banInfoArray = banInfo.split("**");
		const isPermanent = banInfoArray[1];
		const timeStamp = banInfoArray[2];
		const adminName = banInfoArray[3];
		const reason = banInfoArray[4];
		const timeRemaining = formatMilliseconds(timeStamp - Date.now()); 

		if(isPermanent == "false" && timeRemaining == "No time set."){
			player.removeTag("safeguard:Ban");
			player.removeTag(banInfo);
			player.sendMessage(`§6[§eSafeGuard§6]§r §aYou were unbanned!`);
			const spawnPoint = player.getSpawnPoint();
			player.tryTeleport({x: spawnPoint.x, y: spawnPoint.y, z: spawnPoint.z},{dimension: spawnPoint.dimension, rotation: player.rotation, keepVelocity: false})
			return;
		}

		if(isPermanent == "false") return player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r §4You are banned.\n§4Time Remaining: §c${timeRemaining}\n§4Reason: §c${reason == "" ? "No reason provided." : reason}\n§4Banned by: §c${adminName}`)
		if(isPermanent == "true") return player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §c${reason == "" ? "No reason provided." : reason}\n§4Banned by: §c${adminName}`)
	}
})

Minecraft.system.beforeEvents.watchdogTerminate.subscribe((beforeWatchdogTerminate) => {
	beforeWatchdogTerminate.cancel = true;

	world.sendMessage(`§6[§eSafeGuard§6] §f${new Date()} |§4 A Watchdog Exception has been detected and has been cancelled successfully. Reason: §c${beforeWatchdogTerminate.terminateReason}`);
});

world.afterEvents.itemUse.subscribe((data) => {
	if (data.source.typeId !== "minecraft:player") return;
	const player = data.source;
	const item = data.itemStack;
	if(!item) return;
	if(item.typeId !== "safeguard:admin_panel") return;
	if(!player.hasTag("admin")){
		player.playSound("random.anvil_land");
		player.sendMessage("§6[§eSafeGuard§6]§r §4You need admin tag to use admin panel!§r");
		return;
	}
	//check if anticheat was setup for convinience
	if(!world.scoreboard.getObjective("setup_success")){
		player.sendMessage(`§6[§eSafeGuard§6]§c§l ERROR: §r§4AntiCheat not setup!§r`);
		player.sendMessage(`§6[§eSafeGuard§6]§r§4 Run §c/function setup/setup§4 to setup anticheat!§r`);
		player.playSound("random.anvil_land");
		return;
	}


	let mainForm = new ActionFormData()
	.title("SafeGuard Admin Panel")
	.body(`Please select an option from below:`)
	.button("Settings","textures/ui/settings_glyph_color_2x.png")
	.button("Quick Ban","textures/ui/hammer_l.png")
	.button("Player Actions","textures/ui/icon_multiplayer.png")
	.button("Unban Player","textures/items/iron_sword.png")
	player.playSound("random.pop");

	mainForm.show(player).then((formData) => {
		if (formData.canceled) return;
		if(formData.selection === 0) return ui.settingsForm(player);
		if(formData.selection === 1) return ui.playerSelectionForm(player,"ban");
		if(formData.selection === 2) return ui.playerSelectionForm(player,"action");
		if(formData.selection === 3) return ui.unbanForm(player);
	})
});


world.afterEvents.entityHurt.subscribe((data) => {
	const player = data.hurtEntity;

	if(player.typeId !== "minecraft:player") return;

	const hp = player.getComponent("health").currentValue;
		
	if(hp <= 0) {

		const inv = player.getComponent("inventory").container;
		player.runCommandAsync("function assets/death_effect");
		
		//death coords
		const deathCoordStatus = world.scoreboard.getObjective('death_coord_on');
		const { x, y, z } = player.location;
		if(deathCoordStatus){
			player.sendMessage(`§6[§eSafeGuard§6]§r §eYou died at ${Math.round(x)}, ${Math.round(y)}, ${Math.round(z)} (in ${player.dimension.id.replace("minecraft:","")})`);
		}
	}
})