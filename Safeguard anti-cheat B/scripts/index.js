import * as Minecraft from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';


import * as config from "./config.js";
import * as ui from "./assets/ui.js";
import { scoreboardAction, formatMilliseconds, teleportToGround, sendMessageToAllAdmins, millisecondTime, parsePunishmentTime } from "./assets/util.js";
import { globalBanList } from './assets/globalBanList.js';
import { commandHandler } from './command/handle.js';
import "./command/importer.js";


console.warn("[SafeGuard] Script Loaded");
const world = Minecraft.world;



world.afterEvents.playerPlaceBlock.subscribe((data) => {
	const {player,block} = data;
	const playerRotation = player.getRotation();

	if(playerRotation.x == 60 || playerRotation.x == 90){
		if(!player.scaffoldChecks) player.scaffoldChecks = 0;
		
		const antiScaffoldOn = (world.scoreboard.getObjective('safeguard:scaffold_check') === undefined) ? false : true;
		if(!antiScaffoldOn || player.hasTag("admin")) return;
		block.setType("minecraft:air");
		if(player.scaffoldChecks === 1 || player.scaffoldChecks % 15 === 0) sendMessageToAllAdmins(`§6[§eSafeGuard Beta§6]§c ${player.name}§4 was detected using scaffold!`);
		player.scaffoldChecks++
		player.runCommandAsync(`scoreboard players add @s "safeguard:scaffold_check" 1`);
	} 
})

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
	const isAdmin = player.hasTag("admin");

	const antiSpam = (world.scoreboard.getObjective('safeguard:spammer_protection') === undefined) ? false : true;

	//message spam protection
	if(message == player.lastMessage && !isAdmin && antiSpam){
		data.cancel = true;
		player.sendMessage(`§6[§eSafeGuard§6]§r§c Please don't send repeating messages!`);
		return;
	}
	else if(Date.now() - player.lastMessageDate <= config.default.chat.spammer.minTime && !isAdmin && antiSpam){
		data.cancel = true;
		player.sendMessage(`§6[§eSafeGuard§6]§r§c You're sending messages too quickly!`);
		return;
	}

	else if(message.length > config.default.chat.spammer.maxMessageCharLimit && !isAdmin && antiSpam){
		data.cancel = true;
		player.sendMessage(`§6[§eSafeGuard§6]§r§c Sorry! Your message has too many characters!`);
		return;
	}
	else if(message.split(" ").length > config.default.chat.spammer.maxMessageWordLimit && !isAdmin && antiSpam){
		data.cancel = true;
		player.sendMessage(`§6[§eSafeGuard§6]§r§c Please keep your message below ${config.default.chat.spammer.maxMessageWordLimit} words!`);
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
  
	
  
	commandHandler(data);
})

let dbl = world.getDynamicProperty("dbl").toString()
let b1 = (dbl.lastIndexOf("[") + 1);
let b2 = (dbl.indexOf("]"));
let devicebanlist = dbl.slice(b1, b2).split(", ");
export let d = ["Placeholder"];
Minecraft.system.runInterval(() => {
	for (const player of world.getPlayers()) {
		if (!player.hasTag("admin") || !player.isOp() || !player.hasTag("dtbypass") {
		if (devicebanlist.includes(player.clientSystemInfo.platformType)) {
			player.sendMessage("you are on a banned device")
			player.dimension.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r §4You are banned from joining on this device type find another device type.\n§4Reason: §cPlaying on ${player.clientSystemInfo.platformType} \n§4Banned by: §cThe Device Ban Hammer`)
		}
		}
	}
})

//anti nuker
world.afterEvents.playerBreakBlock.subscribe((data) => {
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
	//check if the block id is in nuker block excpetions to prevent false positives
	if(!config.default.world.nuker.blockExceptions.includes(blockId) && player.getEffect("haste") == undefined){
		player.blocksBroken++
	}
	
		if(player.blocksBroken > config.default.world.nuker.maxBlocks && antiNuker){
			if(player.hasTag("admin") && !config.default.world.nuker.checkAdmins) return;
			player.runCommand(`scoreboard players add @s "safeguard:nuker_check" 1`);
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
					//I decided to put the player in adventure mode so they can't break more blocks 
					player.teleport({x: player.location.x, y: 325, z: player.location.z},{dimension: player.dimension, rotation: {x: 0, y: 0}, keepVelocity: false});
					player.runCommand(`kick "${player.name}" §r§6[§eSafeGuard§6]§r§4 You were detected using nuker by breaking §c${player.blocksBroken}§4 in one tick. `);
					//we only send an alert if auto mod is enabled because otherwise player would be breaking blocks indefinitely 
					//and constantly making the alert pop up, causing spam
					//here, we kick the player so the message should be sent once or twice without causing spam
					world.sendMessage(`§6[§eSafeGuard§6]§r§c§l ${player.name} §r§4Was detected using nuker by breaking §l§c${player.blocksBroken}§r§4 blocks in one tick!§r`);
				}
				return;
		}
	if(blockId == "minecraft:diamond_ore" || blockId =="minecraft:deepslate_diamond_ore"){
		if(!diamondAlertOn) return
		//player.runCommandAsync(`tellraw @a[tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"text":"§r§e${player.name}§f mined x1 §ediamond ore§r"}]}`);
		sendMessageToAllAdmins(`§6[§eSafeGuard§6]§5§l §r§e${player.name}§f mined x1 §ediamond ore§r`);
	}
	if(blockId == "minecraft:ancient_debris" && netheriteAlertOn){
		sendMessageToAllAdmins(`§6[§eSafeGuard§6]§5§l §r§e${player.name}§f mined x1 §enetherite ore§r`);
		//player.runCommandAsync(`tellraw @a[tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"text":"§r§e${player.name}§f mined x1 §enetherite ore§r"}]}`);
	}
})

Minecraft.system.runInterval(()  => {
	//check if gametest if on
	if(world.scoreboard.getObjective("safeguard:gametest_on") == undefined){
		world.scoreboard.addObjective("safeguard:gametest_on","Gamtetest Is On");
	}
	//check settings status
	const antiItemsOn = (world.scoreboard.getObjective('item_on') === undefined) ? false : true;
	const autoModOn = (world.scoreboard.getObjective('auto_mod_on') === undefined) ? false : true;
	const antiAutoClicker =  (world.scoreboard.getObjective('safeguard:cps_check') === undefined) ? false : true;
	world.getPlayers().forEach(player => {
		const plrName = player.name;
		const inv = player.getComponent("inventory").container;
		const velocity = player.getVelocity();
		const isAdmin = player.hasTag("admin");

		player.blocksBroken = 0;
		player.hitEntities = [];
		
		betaFeatures(player,velocity);

		//check if player received too many warnings
		if(player.hasTag("safeguard:reachingWarningsTooFast")){
			player.removeTag("safeguard:reachingWarningsTooFast");
			player.addTag("safeguard:Ban");
			const now = Date.now();
			const punishmentTime = millisecondTime.minute * config.default.other.warningsTooFastPunishmentTime;
			const unbanTime = now + punishmentTime
			player.addTag(`safeguardBanInfo**false**${unbanTime}**SafeGuard AutoMod**Reaching warnings too fast`);
			player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r You are temporarily banned for reaching warnings too fast.`);
		}
		//check if player's combat log time ran out
		if(player.combatLogTimer){
			const now = Date.now();
			if(now - player.combatLogTimer > config.default.combat.combatLogging.timeToStayInCombat){
				player.combatLogTimer = null;
				player.removeTag("safeguard:isInCombat");
				player.sendMessage(`§r§6[§eSafeGuard§6]§r You are no longer in combat.`);
			}
		}
		if(velocity.x > 0 || velocity.z > 0){
			if(!player.isFalling) player.addTag("safeguard:moving");
		} 
		if(velocity.x == 0 && velocity.z == 0 && !player.isFalling) player.removeTag("safeguard:moving")

		const item = inv.getItem(player.selectedSlotIndex);
		if(!item) player.removeTag("safeguard:hasRiptide");
			if(item){
				const itemName = item.nameTag ?? '';

				//check if player has a trident
				if(item.typeId == "minecraft:trident") {
					const hasRiptide = item.getComponent("enchantable").hasEnchantment("riptide");
					if(hasRiptide !== 0) player.addTag("safeguard:hasRiptide");
				}
				else if(item.typeId !== "minecraft:trident") player.removeTag("safeguard:hasRiptide");

				if (isAdmin) return;
				else{
					//illegal name check
					if (itemName.length > config.default.item.anti_items.maxItemNameLength && antiItemsOn) {
						world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Has illegal item: §l§c' +item.typeId.replace('minecraft:','') +'§l§4(chr limit exceeded§c ' + itemName.length + '§4/30)§4!§r')
						player.runCommandAsync('function punishment/warning/ill_warning');
						inv.setItem(player.selectedSlot,  undefined);
						return;
					}
					else if (item.getLore().length > 0 && antiItemsOn && config.default.item.anti_items.antiLore) { //items in surivial usually don't have lore in them so it is banned(note to make this a setting)
						world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + '§r §4Has illegal item: §c§l' +item.typeId.replace('minecraft:','') +'§4§l(lore chr limit exceeded§c ' + String(item.getLore()).length + '§4/0)§4!§r')
						player.runCommandAsync('function punishment/warning/ill_warning');
						inv.setItem(player.selectedSlot,  undefined);
						return;
					}
					//keyword ban check
					for(var u = 0; u < config.default.item.anti_items.bannedKeyWords.length; u++){
						if (String(itemName.toLowerCase()).includes(config.default.item.anti_items.bannedKeyWords[u]) && antiItemsOn) {
							world.sendMessage('§6[§eSafeGuard§6]§r§c§l ' + plrName + '§r §4Has illegal item: §c§l' +item.typeId.replace('minecraft:','') +' §r§4with banned keyword, item name:§r ' + String(itemName) + '§4!§r');
							inv.setItem(player.selectedSlot,  undefined);
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

		if(finalcps > config.default.combat.autoclicker.maxCps && isAdmin && antiAutoClicker){
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
		

		if(world.worldBorder){
			let { x, y, z } = player.location;
			const border = world.worldBorder;
			if(Math.abs(x) > border || Math.abs(y) > border || Math.abs(z) > border) {
				if(isAdmin && config.default.world.worldborder.adminsBypassBorder) return;

				player.sendMessage(`§6[§eSafeGuard§6]§r You reached the border of §e${border}§f blocks!`);
				const currentLocation = player.location;
				const offsetX = currentLocation.x >= 0 ? -1 : 1;
				const offsetZ = currentLocation.z >= 0 ? -1 : 1; 
				//const offsetY = currentLocation.y >= 0 ? -1 : 1;

				player.tryTeleport({
				  x: currentLocation.x + offsetX,
				  y: currentLocation.y,
				  z: currentLocation.z + offsetZ,
				}, {
				  checkForBlocks: false,
				});
			}
		}

		


		//removed because its bad
		//check if fall distance is in negatives (fly detection)
		/*if(player.fallDistance < config.default.movement.fly.minFallDistance && antiFly && !player.hasTag("gamemode:creative") && !player.hasTag("admin") && !player.hasTag("safeguard:hasRiptide") && !player.isGliding && !player.isClimbing){
			world.sendMessage(`§6[§eSafeGuard§6] §r§l§c${player.name}§4 was detected flying!`);
			player.runCommandAsync(`scoreboard players add @s "safeguard:fly_check" 1`)
		}*/

	
	})
});


function betaFeatures(player,velocity){

	if(player.hasTag("admin")) return;
	const playerVelocity =  velocity;
	const playerHealth = player.getComponent("minecraft:health");
	const playerMode = player.getGameMode();
	//anti fly idk
	let debugMenu = {
		velocity: playerVelocity,
	}
	//world.sendMessage(`-------------\n§e${JSON.stringify(velocity, null, 2)}§r\n-------------`);
	//if(config.default.debug) console.warn(`§e${JSON.stringify(debugMenu, null, 2)}§r\n-------------`);


	
	const invalidVelocityCheckOn = (world.scoreboard.getObjective('safeguard:velocity_check') === undefined) ? false : true;
	

	if(playerVelocity.y < -3.919921875 && invalidVelocityCheckOn){
		//while testing for a fly detection, I noticed that the terminal velocity for falling on y coordinate is -3.919921875
		//this seems to be a a better detection fly because when flying the velocity sometimes tends to set the velocity below that number which I assume is impossible
		//this also sometimes detects other movement cheats
		sendMessageToAllAdmins(`§6[§eSafeGuard Beta§6] §c${player.name}§4 reached invalid y velocity: §c${playerVelocity.y.toFixed(3)}§4`);
		teleportToGround(player);
		player.runCommandAsync(`scoreboard players add @s "safeguard:velocity_check" 1`);
		//player.tryTeleport({x:player.location.x + playerVelocity.x, y:player.location.y + playerVelocity.y,z:player.location.z + playerVelocity.z},{keepVelocity:false})
	}
	if(playerVelocity.y === 0 && !player.isOnGround && playerHealth.currentValue > 0 && !player.isFlying && !player.isSwimming && playerMode !== Minecraft.GameMode.creative && !player.isJumping){
		//even though this seems like a great check to detect NoFall it tends to false positive on low tps servers
		//until I figure out how to improve this, this is gonna stay here with no handling
		//world.sendMessage(`§6[§eSafeGuard Beta§6] §4Invalid properties: §c${player.name}§4 is not grounded and has no y velocity`);
	}
}


Minecraft.system.runInterval(() => {
	[...world.getPlayers()].forEach(player => {
		if(player.hasTag("admin")) return;
		const antiFly = (world.scoreboard.getObjective('safeguard:fly_check') === undefined) ? false : true;
		const maxYVelocityThreshold = config.default.movement.fly.maxYVelocityThreshold;
		const playerVelocity = player.getVelocity();
		const currentYVelocity = playerVelocity.y;

		if(!player.previousYVelocity) player.previousYVelocity = 0;

		const velocityDifference = Math.round(currentYVelocity - player.previousYVelocity);


		if (velocityDifference > maxYVelocityThreshold && !player.isGliding && antiFly && player.previousYVelocity !== 0 && currentYVelocity !== 0) {
			teleportToGround(player);
			sendMessageToAllAdmins(`§6[§eSafeGuard Beta§6] §c${player.name}§4 reached a high velocity difference (§c${velocityDifference}§4), potentially indicating fly behavior.`);
			player.runCommandAsync(`scoreboard players add @s "safeguard:fly_check" 1`);
			//world.sendMessage(`DIFF[§e${velocityDifference}§r] PREV[§e${previousYVelocity}§r] CURR[§e${currentYVelocity}§r]`);
		}

		player.previousYVelocity = currentYVelocity;
	})
}, 10);


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

	if(data.initialSpawn){
		if(!world.recievedInitialBorder){
			//get intial world border
			world.scoreboard.getObjectives().forEach((objective) => {
				const objectiveId = objective.id;
				if (objectiveId.startsWith("safeguard:worldBorder:")){
					console.warn(`[SafeGuard] Recieved intial world border: ${objectiveId}`)
					world.worldBorder = parseInt(objectiveId.split("safeguard:worldBorder:")[1]);
				}
			});
			if(!world.worldBorder){
				console.warn("[SafeGuard] No world border detected")
				world.worldBorder = null;
			}
			world.recievedInitialBorder = true;
		}
		if(player.hasTag("safeguard:isInCombat")){
			player.removeTag("safeguard:isInCombat");
			if(config.default.combat.combatLogging.alwaysSendAlert) world.sendMessage(`§r§6[§eSafeGuard§6]§e ${player.name}§r Was detected combat logging!`);
			switch(config.default.combat.combatLogging.punishmentType){
				case 0:
					//check for alwaysSendAlert option to prevent spam
					if(!config.default.combat.combatLogging.alwaysSendAlert) world.sendMessage(`§r§6[§eSafeGuard§6]§e ${player.name}§r Was detected combat logging!`);
				break;
				case 1:
					player.sendMessage(`§r§6[§eSafeGuard§6]§r You were killed for combat logging`);
					player.kill();
				break;
				case 2:
					player.sendMessage(`§r§6[§eSafeGuard§6]§r Your inventory was cleared for combat logging`);
					const inv = player.getComponent("inventory").container;
					inv.clearAll();
				break;
				case 3:
					const punishment = config.default.combat.combatLogging.punishmentTime.split(" ");
					const punishmentTime = parsePunishmentTime(punishment);
				  
					if (!punishmentTime) {
					  console.error(`§4[SafeGuard] Invalid punishment time format in config.`);
					  break;
					}
				  
					const now = Date.now();
					const unbanTime = now + punishmentTime;

					player.addTag("safeguard:Ban");
					player.addTag(`safeguardBanInfo**false**${unbanTime}**SafeGuard AntiCheat**Combat Logging`);
					player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r You were temporarily banned for combat logging.`);
					break;
				default:
					console.error(`§4[SafeGuard] Unknown punishment type(${config.default.combat.combatLogging.punishmentType}) was entered, no punishment will be given`);
				break;
			}
		}
	}
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
		player.runCommand("scoreboard players reset @s ac_banned");
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
		player.combatLogTimer = null;
		if(player.hasTag("safeguard:isInCombat")) player.removeTag("safeguard:isInCombat");
		
		player.runCommandAsync("function assets/death_effect");
		
		//death coords
		const deathCoordStatus = world.scoreboard.getObjective('death_coord_on');
		const { x, y, z } = player.location;
		if(deathCoordStatus){
			player.sendMessage(`§6[§eSafeGuard§6]§r §eYou died at ${Math.round(x)}, ${Math.round(y)}, ${Math.round(z)} (in ${player.dimension.id.replace("minecraft:","")})`);
		}
	}
	if (data.damageSource.damagingEntity) {
		const damager = data.damageSource.damagingEntity;
		if (damager.typeId !== "minecraft:player") return;
	  
		const adminsBypassCombatLogging = config.default.combat.combatLogging.adminsBypass;
		const now = Date.now();
		const antiCombatLogEnabled = (world.scoreboard.getObjective('safeguard:anti_combatlog') === undefined) ? false : true;
	  
		if (!player.hasTag("safeguard:isInCombat") && antiCombatLogEnabled) {
		  if (player.hasTag("admin") && adminsBypassCombatLogging) {
			player.combatLogTimer = 0;
		  } else {
			player.addTag("safeguard:isInCombat");
			
			if (!player.combatLogWarningDisplayed) {
			  player.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat, leaving during combat will result in a punishment.`);
			  player.combatLogWarningDisplayed = true;
			} else {
			  player.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat`);
			}
		  }
		}
	  
		if (!damager.hasTag("safeguard:isInCombat") && antiCombatLogEnabled) {
		  if (damager.hasTag("admin") && adminsBypassCombatLogging) {
			damager.combatLogTimer = 0;
		  } else {
			damager.addTag("safeguard:isInCombat");
			
			if (!damager.combatLogWarningDisplayed) {
			  damager.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat, leaving during combat will result in a punishment.`);
			  damager.combatLogWarningDisplayed = true;
			} else {
			  damager.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat.`);
			}
		  }
		}
		
		if(antiCombatLogEnabled){
			damager.combatLogTimer = now;
			player.combatLogTimer = now;
		}
	  }
	  
})
