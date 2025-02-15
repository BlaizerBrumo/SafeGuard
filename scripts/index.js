import * as Minecraft from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';


import * as config from "./config.js";
import * as ui from "./assets/ui.js";
import { formatMilliseconds, teleportToGround, sendMessageToAllAdmins, parsePunishmentTime, sendAnticheatAlert, logDebug } from "./assets/util.js";
import { globalBanList } from './assets/globalBanList.js';
import { commandHandler } from './command/handle.js';
import "./command/importer.js";
import { SafeguardModule } from './classes/module.js';
import { Vector3utils } from './classes/vector3.js';

import "./classes/player.js";
import { legacy_BanToV2 } from './assets/legacyMigration.js';
import { Initialize } from './initialize.js';

logDebug("[SafeGuard] Script Loaded");

const world = Minecraft.world;

const gamertagRegex = /[^A-Za-z 0-9-]/gm;


world.beforeEvents.chatSend.subscribe((data) => {
	const { sender: player, message } = data;

	const prefix = config.default.chat.prefix;
	const whitelistedPrefixes = config.default.chat.spammer.whitelistedPrefixes;
	let doNotCheckSpam = false;
	const isAdmin = player.hasAdmin();

	const antiSpam = SafeguardModule.getModuleStatus(SafeguardModule.Modules.spammerProtection);
	const now = Date.now();

	if (player.isMuted) {
		const muteInfo = player.getMuteInfo();
		if(!muteInfo.isActive) player.isMuted = false;
		else{
			player.sendMessage(`§6[§eSafeGuard§6]§4 You were muted by §c${muteInfo.admin}§4 Time remaining: §c${muteInfo.isPermanent ? "permanent" : formatMilliseconds(muteInfo.duration - Date.now())} §4reason: §c${muteInfo.reason}`);
			data.cancel = true;
			return;
		}
	}

	if (!isAdmin && antiSpam) {
		//message spam protection
		if (message.length > 512) {
			data.cancel = true;
			player.ban("Sending invalid packet", Date.now(), true, "SafeGuard AntiCheat");
			player.runCommandAsync(`kick "${player.name}" §6[§eSafeGuard§6]§r You have been permanently banned for sending invalid packet.`);
			sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§c ${player.name}§4 was automatically banned for sending an invalid text packet (length=${message.length})`, true);
			return;
		}
		if (message == player.lastMessage) {
			data.cancel = true;
			player.sendMessage(`§6[§eSafeGuard§6]§r§c Please don't send repeating messages!`);
			return;
		}
		else if (now - player.lastMessageDate <= config.default.chat.spammer.minTime) {
			data.cancel = true;
			player.lastMessageDate = now;
			player.sendMessage(`§6[§eSafeGuard§6]§r§c You're sending messages too quickly!`);
			return;
		}

		else if (message.length > config.default.chat.spammer.maxMessageCharLimit) {
			data.cancel = true;
			player.sendMessage(`§6[§eSafeGuard§6]§r§c Sorry! Your message has too many characters!`);
			return;
		}
		else if (message.split(" ").length > config.default.chat.spammer.maxMessageWordLimit) {
			data.cancel = true;
			player.sendMessage(`§6[§eSafeGuard§6]§r§c Please keep your message below ${config.default.chat.spammer.maxMessageWordLimit} words!`);
			return;
		}
	}

	whitelistedPrefixes.forEach(wPrefix => {
		if (message.startsWith(wPrefix)) {
			doNotCheckSpam = true;
		}
	})

	if (!doNotCheckSpam) {
		player.lastMessage = message;
		player.lastMessageDate = now;
	}


	if (!message.startsWith(prefix)) return;



	commandHandler(data);
})


world.afterEvents.playerDimensionChange.subscribe((data) => {
	const {fromLocation,player,toDimension} = data;
	//logDebug(`Dimension ID: ${toDimension.id}`);

	if (toDimension.id == "minecraft:the_end") {
		if(!SafeguardModule.getModuleStatus(SafeguardModule.Modules.endLock)) return;
		if(player.hasAdmin() && config.default.world.endLock.adminsBypass) return;
		
		logDebug(`${player.name} entered the end`);
		player.teleport({...fromLocation,y:325}, { dimension: world.getDimension("overworld"), rotation: { x: 0, y: 0 } });
		player.sendMessage("§6[§eSafeGuard§6]§r§4 The end was locked by an admin!");
		player.addEffect("slow_falling", 1200, { amplifier: 1, showParticles: false });
	}
	else if (toDimension.id == "minecraft:nether") {
		if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.netherLock)) return;
		if (player.hasAdmin() && config.default.world.netherLock.adminsBypass) return;

		logDebug(`${player.name} entered the nether`);
		player.teleport({ ...fromLocation, y: 325 }, { dimension: world.getDimension("overworld"), rotation: { x: 0, y: 0 } });
		player.sendMessage("§6[§eSafeGuard§6]§r§4 The nether was locked by an admin!");
		player.addEffect("slow_falling", 1200, { amplifier: 1, showParticles: false });
	}
})

world.afterEvents.playerSpawn.subscribe((data) => {
	const { player } = data;


	if (!data.initialSpawn) return;
	if (!world.safeguardInitialized) Initialize();
	
	player.currentGamemode = player.getGameMode();
	player.isMuted = player.getMuteInfo().isActive;
	player.combatLogTimer = null;

	if (!world.safeguardIsSetup && player.hasAdmin()) {
		player.sendMessage(`§r§6[§eSafeGuard§6]§r§4 WARNING! §cThe AntiCheat is not setup, some features may not work. Please run §7/function setup/setup§c to setup!`);
	}

	if(world.safeguardVersion !== config.default.version){
		player.sendMessage(`§r§6[§eSafeGuard§6]§f SafeGuard has successfully updated to v${config.default.version}`);
		world.setDynamicProperty("safeguard:version",config.default.version);
	}

	if (world.safeguardNotifyMigrationQueue.includes(player.name)){
		//legacy migration
		const notifyScoreboard = world.scoreboard.addObjective("safeguard:notify") ?? world.scoreboard.getObjective("safeguard:notify");
		notifyScoreboard.setScore(player.scoreboardIdentity,1);
		let newArray = new Set(world.safeguardNotifyMigrationQueue);
		newArray.delete(player.name);
		world.setDynamicProperty("safeguard:legacyNotificationPlayerList",[...newArray].join(","));
		
	}
	//TODO: check for namespoof here
	if ((player.name.length > 16 || gamertagRegex.test(player.name) && !player.hasAdmin())){
		world.sendMessage(`${player.name} flagged for namespoof`);
	}
	if (globalBanList.includes(player.name)) return player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r §4Your name was found in the SafeGuard global ban list.`)


	if (world.safeguardUnbanQueue.includes(player.name)){
		if(player.unban()) {
			player.sendMessage("§r§6[§eSafeGuard§6]§r You were unbanned.");
			logDebug(`[SafeGuard] Player ${player.name} was unbanned through unban queue`);
		}
		else logDebug(`[SafeGuard] Unban for ${player.name} failed`);
	}
	
	const banInfo = player.getBan();
	if (banInfo.isBanned) {
		const { unbanTime, isPermanent, bannedBy, reason } = banInfo;
		const timeRemaining = formatMilliseconds(unbanTime - Date.now());
		logDebug(`${player.name} is banned: `, JSON.stringify(banInfo));
		if (isPermanent) return player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §c${reason}\n§4Banned by: §c${bannedBy}`);
		else return player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r §4You are banned.\n§4Time Remaining: §c${timeRemaining}\n§4Reason: §c${reason}\n§4Banned by: §c${bannedBy}`);
	}

	//migrate legacy mute to V2
	if (player.hasTag("muted")) legacy_MuteToV2(player);

	//migrate legacy "safeguard:Ban" tag ban system into the new one.
	if (player.hasTag("safeguard:Ban")) return legacy_BanToV2(player);

	if (world.safeguardDeviceBan.length > 0 && world.safeguardDeviceBan.includes(player.clientSystemInfo.platformType)){
		sendMessageToAllAdmins(`§6[§eSafeGuard§6]§4 The player §c${player.name}§4 was kicked for joining on banned device: §c${player.clientSystemInfo.platformType}`);
		player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r §4Sorry, the administrators have banned the device you are playing on.`);
		return;
	}
	
	const welcomerisOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.welcomer);
	if (welcomerisOn) {
		const firstTimeWelcome = player.getDynamicProperty("safeguard:firstTimeWelcome");
		if (!firstTimeWelcome) {
			world.sendMessage(`§6[§eSafeGuard§6]§r§e ${player.name}§b is joining for the first time! This realm is protected by §eSafeGuard§b, enjoy your stay!§r`);
			player.setDynamicProperty("safeguard:firstTimeWelcome", true);
		} else {
			world.sendMessage(`§6[§eSafeGuard§6]§r§e ${player.name}§b is joining on §e${player.clientSystemInfo.platformType}`);
		}
	}

	const antiCLog = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiCombatlog);
	const endLockOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.endLock);
	const netherLock = SafeguardModule.getModuleStatus(SafeguardModule.Modules.netherLock);
	const antiGmc = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiGmc);

	

	
	if ((endLockOn && player.dimension.id == "minecraft:the_end") && !(player.hasAdmin() && config.default.world.endLock.adminsBypass)) {
		const playerSpawnPoint = player.getSpawnPoint();
		player.teleport({ x: playerSpawnPoint.x, y: playerSpawnPoint.y, z: playerSpawnPoint.z }, { dimension: playerSpawnPoint.dimension, rotation: { x: 0, y: 0 } });
		player.sendMessage("§6[§eSafeGuard§6]§r§4 The end was locked by an admin!");
	}
	if ((netherLock && player.dimension.id == "minecraft:nether") && !(player.hasAdmin() && config.default.world.netherLock.adminsBypass)) {
		const playerSpawnPoint = player.getSpawnPoint();
		player.teleport({ x: playerSpawnPoint.x, y: playerSpawnPoint.y, z: playerSpawnPoint.z }, { dimension: playerSpawnPoint.dimension, rotation: { x: 0, y: 0 } });
		player.sendMessage("§6[§eSafeGuard§6]§r§4 The nether was locked by an admin!");
	}

	if ((antiCLog && player.hasTag("safeguard:isInCombat"))) {
		logDebug(player.name,"joined while in combat")
		player.removeTag("safeguard:isInCombat");

		if (player.hasAdmin() && config.default.combat.combatLogging.adminsBypass) player.combatLogTimer = null;
		else {	
			logDebug(`executing clog punishment on ${player.name} (${config.default.combat.combatLogging.punishmentType})`);
			if (config.default.combat.combatLogging.alwaysSendAlert) world.sendMessage(`§r§6[§eSafeGuard§6]§e ${player.name}§r Was detected combat logging!`);

			switch (config.default.combat.combatLogging.punishmentType) {
				case 0:
					//check for alwaysSendAlert option to prevent spam
					if (!config.default.combat.combatLogging.alwaysSendAlert) world.sendMessage(`§r§6[§eSafeGuard§6]§e ${player.name}§r Was detected combat logging!`);
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
						console.warn(`§4[SafeGuard] Invalid punishment time format in config.`);
						break;
					}

					const now = Date.now();
					const unbanTime = now + punishmentTime;

					player.ban("Combat logging", unbanTime, false, "SafeGuard AntiCheat");
					player.runCommandAsync(`kick "${player.name}" §r§6[§eSafeGuard§6]§r You were temporarily banned for combat logging.`);
					break;
				default:
					console.warn(`§4[SafeGuard] Unknown punishment type(${config.default.combat.combatLogging.punishmentType}) was entered, no punishment will be given`);
					break;
			}
		}
	}
	const playerFreezeStatus = player.getDynamicProperty("safeguard:freezeStatus");
	if (typeof playerFreezeStatus === "boolean") player.setFreezeTo(playerFreezeStatus);




})

Minecraft.system.runInterval(() => {
	const invalidVelocityCheckOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.velocityCheck);
	world.getPlayers().forEach((player) => {
		const isAdmin = player.hasAdmin();
		player.velocity = player.getVelocity();
		player.speed = Vector3utils.magnitude(player.velocity);
		player.hitEntities = [];
		player.onScreenDisplay.setActionBar(`CPS: ${player.finalCps ?? 0} / ${player.currentCps ?? 0}`)
		//anti fly idk
		/*let debugMenu = {
			
			a:player.getRotation()
		}
		world.sendMessage(`-------------\n§e${JSON.stringify(debugMenu, null, 2)}§r\n-------------`);
		*/


		betaFeatures(player);
		if (player.currentCps > 0 && Date.now() - player.initialClick >= 1000) {
			const antiAutoclicker = SafeguardModule.getModuleStatus(SafeguardModule.Modules.cpsCheck);
			if (player.currentCps > config.default.combat.autoclicker.maxCps && antiAutoclicker) {
				player.addEffect("weakness", 40, { amplifier: 255, showParticles: false })
				sendAnticheatAlert(player, "autoclicker", player.currentCps, SafeguardModule.Modules.cpsCheck);
			}
			player.initialClick = 0;
			player.finalCps = player.currentCps;
			player.currentCps = 0;
		}
		if (!player.registerValidCoords) player.registerValidCoords = true;
		//anti combat log timer
		if (player.combatLogTimer) {
			const now = Date.now();
			if (now - player.combatLogTimer > config.default.combat.combatLogging.timeToStayInCombat) {
				player.combatLogTimer = null;
				player.removeTag("safeguard:isInCombat");
				logDebug(player.name, "is longer in combat");
				player.sendMessage(`§r§6[§eSafeGuard§6]§r You are no longer in combat.`);
			}
		}

		if (invalidVelocityCheckOn && player.speed > 400) {
			const { velocity } = player;
			sendAnticheatAlert(player, "high velocity", `X:§c${velocity.x.toFixed(2)} §4Y:§c${velocity.y.toFixed(2)}§4 §4Z:§c${velocity.z.toFixed(2)} §4(§c${player.speed.toFixed(3)}§4)`, SafeguardModule.Modules.velocityCheck);
			player.registerValidCoords = false;
			player.teleport(player.lastValidCoords);
		}

		if (player.registerValidCoords) player.lastValidCoords = player.location;

		if (world.worldBorder) {
			let { x, y, z } = player.location;
			const border = world.worldBorder;
			if (Math.abs(x) > border || Math.abs(y) > border || Math.abs(z) > border) {
				if (isAdmin && config.default.world.worldborder.adminsBypassBorder) return;

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
	})
});

world.afterEvents.entityHitEntity.subscribe(async (data) => {
	const player = data.damagingEntity;
	const hurtEntity = data.hitEntity;

	if (!(player instanceof Minecraft.Player)) return;
	const hasWeakness = player.getEffect("weakness");

	const antiKillaura = SafeguardModule.getModuleStatus(SafeguardModule.Modules.killauraCheck);


	if (!hasWeakness && !player.hitEntities.includes(hurtEntity.id)) player.hitEntities.push(hurtEntity.id);


	if (player.hitEntities.length > config.default.combat.killaura.maxHitEntities && !player.hasAdmin() && antiKillaura) {
		sendAnticheatAlert(player, "multi killaura", player.hitEntities.length, SafeguardModule.Modules.killauraCheck);
		player.addEffect("weakness", 40, { amplifier: 255, showParticles: false });
		player.hitEntities = 0;
	}
	if (!hasWeakness && player.hitEntities.length <= 1) {
		const now = Date.now();

		if (!player.initialClick || now - player.initialClick >= 1000) player.initialClick = now;

		player.currentCps++;

	}
	

})
world.afterEvents.entityHurt.subscribe((data) => {
	const player = data.hurtEntity;

	if (player.typeId !== "minecraft:player") return;

	const hp = player.getComponent("health").currentValue;
		
	if(hp <= 0) {
		player.combatLogTimer = null;
		if(player.hasTag("safeguard:isInCombat")) player.removeTag("safeguard:isInCombat");
		
		if(SafeguardModule.getModuleStatus(SafeguardModule.Modules.deathEffect)) player.runCommandAsync("function assets/death_effect");
		

		//death coords
		const deathCoordStatus = SafeguardModule.getModuleStatus(SafeguardModule.Modules.deathCoords);
		if(deathCoordStatus){
			const { x, y, z } = player.location;
			player.sendMessage(`§6[§eSafeGuard§6]§r §eYou died at ${Math.round(x)}, ${Math.round(y)}, ${Math.round(z)} (in ${player.dimension.id.replace("minecraft:","")})`);
		}
	}

	//anti combat log
	const antiCombatLogEnabled = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiCombatlog);
	if (!antiCombatLogEnabled) return;

	if (data.damageSource.damagingEntity) {
		const damager = data.damageSource.damagingEntity;
		if (damager.typeId !== "minecraft:player") return;

		const adminsBypassCombatLogging = config.default.combat.combatLogging.adminsBypass;
		const now = Date.now();


		if (!player.hasTag("safeguard:isInCombat") && antiCombatLogEnabled) {
			if (player.hasTag("admin") && adminsBypassCombatLogging) {
				player.combatLogTimer = 0;
			} else {
				player.addTag("safeguard:isInCombat");
				logDebug(player.name, "is now in combat");
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
				logDebug(damager.name, "is now in combat");
				if (!damager.combatLogWarningDisplayed) {
					damager.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat, leaving during combat will result in a punishment.`);
					damager.combatLogWarningDisplayed = true;
				} else {
					damager.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat.`);
				}
			}
		}
		damager.combatLogTimer = now;
		player.combatLogTimer = now;
	}
})
function betaFeatures(player) {

	const { velocity } = player;

	if (player.hasAdmin()) return;
	const playerVelocity = velocity;

	//if(config.default.debug) logDebug(`§e${JSON.stringify(debugMenu, null, 2)}§r\n-------------`);



	const invalidVelocityCheckOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.velocityCheck);


	if (playerVelocity.y < -3.919921875 && invalidVelocityCheckOn) {
		//while testing for a fly detection, I noticed that the terminal velocity for falling on y coordinate is -3.919921875
		//this seems to be a a better detection fly because when flying the velocity sometimes tends to set the velocity below that number which I assume is impossible
		//this also sometimes detects other movement cheats
		sendAnticheatAlert(player, "movement cheats (invalid y velocity)", playerVelocity.y.toFixed(3), SafeguardModule.Modules.velocityCheck);
		//LEGACY: sendMessageToAllAdmins(`§6[§eSafeGuard Beta§6] §c${player.name}§4 reached invalid y velocity: §c${playerVelocity.y.toFixed(3)}§4`);
		teleportToGround(player);
		//player.tryTeleport({x:player.location.x + playerVelocity.x, y:player.location.y + playerVelocity.y,z:player.location.z + playerVelocity.z},{keepVelocity:false})
	}
}


Minecraft.system.runInterval(() => {
	world.getPlayers().forEach(player => {
		//if(player.isAdmin) return;
		const antiFly = SafeguardModule.getModuleStatus(SafeguardModule.Modules.flyCheck);
		const velocityCheck = SafeguardModule.getModuleStatus(SafeguardModule.Modules.velocityCheck);

		const maxYVelocityThreshold = config.default.movement.fly.maxYVelocityThreshold;
		const { velocity: playerVelocity, speed } = player;
		const currentYVelocity = playerVelocity.y;

		if (!player.previousSpeed) player.previousSpeed = speed;
		if (!player.previousYVelocity) player.previousYVelocity = 0;

		const velocityDifference = Math.round(currentYVelocity - player.previousYVelocity);
		const speedDifference = speed - player.previousSpeed;

		if (velocityDifference > maxYVelocityThreshold && !player.isGliding && antiFly && player.previousYVelocity !== 0 && currentYVelocity !== 0) {
			teleportToGround(player);
			sendAnticheatAlert(player, "high velocity difference", velocityDifference, SafeguardModule.Modules.flyCheck);
			//world.sendMessage(`DIFF[§e${velocityDifference}§r] PREV[§e${previousYVelocity}§r] CURR[§e${currentYVelocity}§r]`);
		}
		if (speedDifference > 5 && !player.isGliding && player.previousSpeed !== 0 && speed !== 0 && velocityCheck && player.currentGamemode !== Minecraft.GameMode.creative) {
			sendAnticheatAlert(player, "high speeds", speedDifference.toFixed(4), SafeguardModule.Modules.velocityCheck);
			player.registerValidCoords = false;
			player.teleport(player.lastValidCoords, { keepVelocity: false, rotation: { x: 0, y: 0 } });
		}


		player.previousYVelocity = currentYVelocity;
		player.previousSpeed = speed;

	})
}, 10);


world.beforeEvents.playerGameModeChange.subscribe((data) => {
	const {toGameMode,fromGameMode,player} = data;
	player.currentGamemode = toGameMode;
	//NOTE: This only gets triggered when a person switches gamemode, it DOES NOT constantly check for gamemode creative
	if(player.hasAdmin()) return;

	const antiGmcOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiGmc);
	if(antiGmcOn && toGameMode == Minecraft.GameMode.creative){
		Minecraft.system.run(()=>{player.setGameMode(fromGameMode)});
		sendAnticheatAlert(player,"gamemode creative","true",SafeguardModule.Modules.antiGmc);
	}
})

world.afterEvents.playerPlaceBlock.subscribe((data) => {
	const antiScaffoldOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.scaffoldCheck);

	if (!antiScaffoldOn) return;
	const { player, block } = data;
	const playerRotation = player.getRotation();

	if (playerRotation.x == 60 || playerRotation.x == 90) {
		if (!player.scaffoldChecks) player.scaffoldChecks = 0;

		block.setType("minecraft:air");
		if (player.scaffoldChecks === 1 || player.scaffoldChecks % 15 === 0) sendAnticheatAlert(player, "scaffold", `timesDetected=${player.scaffoldChecks}`, SafeguardModule.Modules.scaffoldCheck);
		player.scaffoldChecks++
	}
})

world.afterEvents.itemUse.subscribe((data) => {
	if (data.source.typeId !== "minecraft:player") return;
	const player = data.source;
	const item = data.itemStack;
	if (!item) return;
	if (item.typeId !== "safeguard:admin_panel") return;
	if (!player.hasAdmin()) {
		player.playSound("random.anvil_land");
		player.sendMessage("§6[§eSafeGuard§6]§r §4You need admin tag to use admin panel!§r");
		return;
	}
	//check if anticheat was setup for convinience
	if (!world.scoreboard.getObjective("safeguard:setup_success")) {
		player.sendMessage(`§6[§eSafeGuard§6]§c§l ERROR: §r§4AntiCheat not setup!§r`);
		player.sendMessage(`§6[§eSafeGuard§6]§r§4 Run §c/function setup/setup§4 to setup anticheat!§r`);
		player.playSound("random.anvil_land");
		return;
	}


	let mainForm = new ActionFormData()
		.title("SafeGuard Admin Panel")
		.body(`Please select an option from below:`)
		.button("Settings", "textures/ui/settings_glyph_color_2x.png")
		.button("Quick Ban", "textures/ui/hammer_l.png")
		.button("Player Actions", "textures/ui/icon_multiplayer.png")
		.button("Unban Player", "textures/items/iron_sword.png")
	player.playSound("random.pop");

	mainForm.show(player).then((formData) => {
		if (formData.canceled) return;
		switch (formData.selection) {
			case 0:
				return ui.moduleSettingsForm(player);
			case 1:
				return ui.playerSelectionForm(player, "ban");
			case 2:
				return ui.playerSelectionForm(player, "action");
			case 3:
				return ui.unbanForm(player);
		}
	})
});

world.afterEvents.playerBreakBlock.subscribe((data) => {
	const { player, dimension, block } = data;
	const blockId = data.brokenBlockPermutation.type.id;

	const diamondAlertOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.OreAlerts.diamondOre);
	const netheriteAlertOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.OreAlerts.netheriteOre);
	const antiNuker = SafeguardModule.getModuleStatus(SafeguardModule.Modules.nukerCheck);
	const autoModOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.autoMod);


	if (blockId == "minecraft:bedrock" || blockId == "minecraft:end_portal_frame") {
		if (player.hasAdmin() || player.currentGamemode === Minecraft.GameMode.creative) return;
		block.setPermutation(data.brokenBlockPermutation);
		world.sendMessage(`§6[§eSafeGuard§6]§r§c§l §r§c${player.name}§4 Attempted to break §c${blockId}`)
	}
	//check if the block id is in nuker block excpetions to prevent false positives
	if (!config.default.world.nuker.blockExceptions.includes(blockId) && !player.getEffect("haste")) {
		if (!player.blocksBroken) player.blocksBroken = 0;
		player.blocksBroken++
	}

	if (player.blocksBroken > config.default.world.nuker.maxBlocks && antiNuker) {
		if (player.hasTag("admin") && !config.default.world.nuker.checkAdmins) return;
		// kill the items dropped items
		const items = dimension.getEntities({
			location: { x: block.location.x, y: block.location.y, z: block.location.z },
			minDistance: 0,
			maxDistance: 2,
			type: "item"
		});

		for (const item of items) item.kill();

		block.setPermutation(data.brokenBlockPermutation);
		if (autoModOn) {
			player.runCommand("gamemode adventure @s");
			//I decided to put the player in adventure mode so they can't break more blocks 
			player.teleport({ x: player.location.x, y: 325, z: player.location.z }, { dimension: player.dimension, rotation: { x: 0, y: 0 }, keepVelocity: false });
			//we only send an alert if auto mod is enabled because otherwise player would be breaking blocks indefinitely 
			//and constantly making the alert pop up, causing spam
			//here, we kick the player so the message should be sent once or twice without causing spam
			sendAnticheatAlert(player, "nuker", player.blocksBroken, SafeguardModule.Modules.nukerCheck);
		}
		return;
	}

	//xray alerts
	if (blockId == "minecraft:diamond_ore" || blockId == "minecraft:deepslate_diamond_ore") {
		if (!diamondAlertOn) return
		//player.runCommandAsync(`tellraw @a[tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"text":"§r§e${player.name}§f mined x1 §ediamond ore§r"}]}`);
		sendMessageToAllAdmins(`§6[§eSafeGuard§6]§5§l §r§e${player.name}§f mined x1 §ediamond ore§r`);
	}
	if (blockId == "minecraft:ancient_debris" && netheriteAlertOn) {
		sendMessageToAllAdmins(`§6[§eSafeGuard§6]§5§l §r§e${player.name}§f mined x1 §enetherite ore§r`);
		//player.runCommandAsync(`tellraw @a[tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"text":"§r§e${player.name}§f mined x1 §enetherite ore§r"}]}`);
	}
})