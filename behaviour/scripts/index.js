import * as Minecraft from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';


import * as config from "./config.js";
import * as ui from "./assets/ui.js";
import { formatMilliseconds, teleportToGround, sendMessageToAllAdmins, parsePunishmentTime, sendAnticheatAlert, logDebug } from "./assets/util.js";
import { globalBanList as seedGlobalBanList } from './assets/globalBanList.js'; // Renamed import
import { commandHandler } from './command/handle.js';
import "./command/importer.js";
import "./slash_commands.js";
import { SafeguardModule } from './classes/module.js';
import { Vector3utils } from './classes/vector3.js';

import "./classes/player.js"; // This is the import to verify later
import { Initialize } from './initialize.js';
import { initializeReachCheck } from './modules/reach_check.js';
import { initializeNoSwingCheck } from './modules/noswing_check.js'; // New import

logDebug("[SafeGuard] Script Loaded");

const world = Minecraft.world;

const gamertagRegex = /[^A-Za-z 0-9-]/gm;


world.beforeEvents.chatSend.subscribe((data) => {
	try {
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
			Minecraft.system.run(() => { // Changed from system.run to Minecraft.system.run
				player.runCommand(`kick @s §6[§eSafeGuard§6]§r You have been permanently banned for sending invalid packet.`);
			})
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

	// NEW RANK FORMATTING LOGIC STARTS HERE
	if (!message.startsWith(prefix)) { // Only format if it's NOT a command
		const playerRankId = player.getDynamicProperty("safeguard:rankId") || config.default.defaultRank;
		// Ensure playerRankId is a string, as dynamic properties can return other types.
		const rankIdStr = typeof playerRankId === 'string' ? playerRankId : config.default.defaultRank;
		const rankInfo = config.default.ranks[rankIdStr];

		if (rankInfo) { // Check if rankInfo is valid
			const formattedMessage = `${rankInfo.displayText} ${rankInfo.nameColor}${player.name}§r: ${rankInfo.messageColor}${message}`;
			data.cancel = true; // Cancel original message
			world.sendMessage(formattedMessage); // Send formatted message
			return; // Return after sending formatted message to prevent command processing
		}
		// If rankInfo is not found, the original message will proceed unless cancelled by other logic.
	}
	// NEW RANK FORMATTING LOGIC ENDS HERE

	if (!message.startsWith(prefix)) return; // This check is now somewhat redundant if rank formatting happened, but kept for safety / if rank formatting doesn't occur.

		data.cancel = true;
		Minecraft.system.run(() => { // commandHandler itself should have try-catch if it makes external calls
			try {
				commandHandler(data);
			} catch (e) {
				logDebug("[SafeGuard ERROR] Error in commandHandler inside system.run:", e, e.stack);
				if (data.sender instanceof Minecraft.Player) {
					data.sender.sendMessage("§cAn error occurred while processing your command.");
				}
			}
		});
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in chatSend event:", e, e.stack);
		if (data && data.sender instanceof Minecraft.Player) {
			try {
				data.sender.sendMessage("§cAn error occurred processing your chat message.");
				data.cancel = true; // Prevent further processing if possible
			} catch (sendMessageError) {
				logDebug("[SafeGuard ERROR] Failed to send error message to player in chatSend:", sendMessageError, sendMessageError.stack);
			}
		}
	}
})


world.afterEvents.playerDimensionChange.subscribe((data) => {
	try {
		const {fromLocation,player,dimension: toDimension} = data; // dimension renamed to toDimension

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
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in playerDimensionChange event:", e, e.stack);
		if (data && data.player instanceof Minecraft.Player) {
			try {
				data.player.sendMessage("§cAn error occurred processing your dimension change.");
			} catch (sendMessageError) {
				logDebug("[SafeGuard ERROR] Failed to send error message to player in playerDimensionChange:", sendMessageError, sendMessageError.stack);
			}
		}
	}
})

world.afterEvents.playerSpawn.subscribe((data) => {
	try {
		const { player, initialSpawn } = data; // initialSpawn from data

		if (!initialSpawn) return; // Use initialSpawn
		try{ // Inner try-catch for Initialize as it's a distinct critical step
			if (!world.safeguardInitialized) Initialize(); // Initialize itself should have robust error handling
		}catch(err){
			logDebug(`[SafeGuard ERROR] Error during Initialize call in playerSpawn:`, err, err.stack);
			// Potentially send a message to admins or the joining player if critical
		}
		player.currentGamemode = player.getGameMode(); // getGameMode is an API call
		player.isMuted = player.getMuteInfo().isActive; // getMuteInfo now has try-catch
		player.combatLogTimer = null;

		const antiNamespoof = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiNamespoof);

		if (antiNamespoof && (player.name.length > 16 || gamertagRegex.test(player.name))) {
			player.ban("Namespoof", Date.now(), true, "SafeGuard AntiCheat"); // ban is wrapped
			player.runCommand(`kick @s §6[§eSafeGuard§6]§r You have been permanently banned for namespoof.`);
			sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§r ${player.name}§r§4 was automatically banned for namespoof`, true); // sendMessageToAllAdmins is wrapped
			return;
		}
		
		if (!world.safeguardIsSetup && player.hasAdmin()) { // hasAdmin is wrapped
			player.sendMessage(`§r§6[§eSafeGuard§6]§r§4 WARNING! §cThe AntiCheat is not setup, some features may not work. Please run §7/function setup/setup§c to setup!`);
		}

		if(world.safeguardVersion !== config.default.version){
			player.sendMessage(`§r§6[§eSafeGuard§6]§f SafeGuard has successfully updated to v${config.default.version}`);
		try {
			world.setDynamicProperty("safeguard:version",config.default.version); 
		} catch (e) {
			logDebug("[SafeGuard ERROR] Failed to set version dynamic property in playerSpawn:", player.name, e, e.stack);
		}
		}

	// Fetch and parse the dynamic global ban list
	const dynamicGbanListString = world.getDynamicProperty("safeguard:gbanList"); // Already handled parsing with try-catch
	let dynamicGbanList = [];
	if (typeof dynamicGbanListString === 'string') { // Ensure it's a string before parsing
		try {
			dynamicGbanList = JSON.parse(dynamicGbanListString);
			if (!Array.isArray(dynamicGbanList)) { // Ensure it's an array
				dynamicGbanList = [];
				logDebug("Dynamic global ban list was not an array, reset to empty.");
			}
		} catch (e) {
			logDebug("Failed to parse dynamic global ban list, resetting to empty:", e);
			dynamicGbanList = []; // Reset to empty array on parse error
			// Optionally, re-initialize from seed if parsing fails and it's considered critical
			// world.setDynamicProperty("safeguard:gbanList", JSON.stringify(seedGlobalBanList)); 
		}
	}

	// Check against both seed and dynamic global ban lists
	const isBannedInSeed = seedGlobalBanList.some(entry => 
		(typeof entry === 'string' && entry === player.name) || 
		(typeof entry === 'object' && entry.name === player.name)
	);
	const isBannedInDynamic = dynamicGbanList.some(entry => 
		(typeof entry === 'string' && entry === player.name) || 
		(typeof entry === 'object' && entry.name === player.name)
	);

	if (isBannedInSeed || isBannedInDynamic) {
		let kickMessage = `§r§6[§eSafeGuard§6]§r §4Your name was found in the global ban list.`; // Default

		const dynamicBanEntry = dynamicGbanList.find(entry => typeof entry === 'object' && entry.name === player.name);
		const seedBanEntry = seedGlobalBanList.find(entry => typeof entry === 'object' && entry.name === player.name);
		
		if (dynamicBanEntry && dynamicBanEntry.reason) {
			kickMessage = `§r§6[§eSafeGuard§6]§r §4You are on the global ban list.\n§4Reason: §c${dynamicBanEntry.reason}\n§4Banned by: §c${dynamicBanEntry.bannedBy || 'Unknown'}`;
		} else if (seedBanEntry && seedBanEntry.reason) { // Fallback to seed list reason
			 kickMessage = `§r§6[§eSafeGuard§6]§r §4You are on the global ban list.\n§4Reason: §c${seedBanEntry.reason}\n§4Banned by: §c${seedBanEntry.bannedBy || 'System'}`;
		}

		player.runCommand(`kick @s ${kickMessage}`);
		return;
	}

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
		if (isPermanent) return player.runCommand(`kick @s §r§6[§eSafeGuard§6]§r §4You are permanently banned.\n§4Reason: §c${reason}\n§4Banned by: §c${bannedBy}`);
		else return player.runCommand(`kick @s §r§6[§eSafeGuard§6]§r §4You are banned.\n§4Time Remaining: §c${timeRemaining}\n§4Reason: §c${reason}\n§4Banned by: §c${bannedBy}`);
	}

	if (world.safeguardDeviceBan.length > 0 && world.safeguardDeviceBan.includes(player.clientSystemInfo.platformType)){
		sendMessageToAllAdmins(`§6[§eSafeGuard§6]§4 The player §c${player.name}§4 was kicked for joining on banned device: §c${player.clientSystemInfo.platformType}`);
		player.runCommand(`kick @s §r§6[§eSafeGuard§6]§r §4Sorry, the administrators have banned the device you are playing on.`);
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
					player.runCommand(`kick @s §r§6[§eSafeGuard§6]§r You were temporarily banned for combat logging.`);
					break;
				default:
					console.warn(`§4[SafeGuard] Unknown punishment type(${config.default.combat.combatLogging.punishmentType}) was entered, no punishment will be given`);
					break;
			}
		}
	}
	const playerFreezeStatus = player.getDynamicProperty("safeguard:freezeStatus"); // getDynamicProperty is generally safe
	if (typeof playerFreezeStatus === "boolean") player.setFreezeTo(playerFreezeStatus); // setFreezeTo is wrapped
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in playerSpawn event for player:", data?.player?.name, e, e.stack);
		if (data && data.player instanceof Minecraft.Player) {
			try {
				data.player.sendMessage("§cAn error occurred during the spawn process. Please notify an admin.");
			} catch (sendMessageError) {
				logDebug("[SafeGuard ERROR] Failed to send error message to player in playerSpawn:", sendMessageError, sendMessageError.stack);
			}
		}
	}
})

Minecraft.system.runInterval(() => {
	try {
		const invalidVelocityCheckOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.velocityCheck);
		const players = world.getPlayers(); // API Call
		for (let ii = 0; ii < players.length; ii++) { 
			try {
				const player = players[ii];
				const isAdmin = player.hasAdmin(); // Wrapped
				player.velocity = player.getVelocity(); // API Call
				player.speed = Vector3utils.magnitude(player.velocity);
				player.hitEntities = [];
				player.blocksBroken = 0;

				betaFeatures(player); // betaFeatures will be wrapped
				if (player.currentCps > 0 && Date.now() - player.initialClick >= 1000) {
					const antiAutoclicker = SafeguardModule.getModuleStatus(SafeguardModule.Modules.cpsCheck);
					if (player.currentCps > config.default.combat.autoclicker.maxCps && antiAutoclicker) {
						player.addEffect("weakness", 40, { amplifier: 255, showParticles: false }); // API Call
						sendAnticheatAlert(player, "autoclicker", player.currentCps, SafeguardModule.Modules.cpsCheck); // Wrapped
					}
					player.initialClick = 0;
					player.finalCps = player.currentCps;
					player.currentCps = 0;
				}
				if (!player.registerValidCoords) player.registerValidCoords = true;
				
				if (player.combatLogTimer) {
					const now = Date.now();
					if (now - player.combatLogTimer > config.default.combat.combatLogging.timeToStayInCombat) {
						player.combatLogTimer = null;
						player.removeTag("safeguard:isInCombat"); // API Call
						logDebug(player.name, "is longer in combat");
						player.sendMessage(`§r§6[§eSafeGuard§6]§r You are no longer in combat.`); // API Call
					}
				}

				if (invalidVelocityCheckOn && player.speed > 400) {
					const { velocity } = player;
					sendAnticheatAlert(player, "high velocity", `X:§c${velocity.x.toFixed(2)} §4Y:§c${velocity.y.toFixed(2)}§4 §4Z:§c${velocity.z.toFixed(2)} §4(§c${player.speed.toFixed(3)}§4)`, SafeguardModule.Modules.velocityCheck); // Wrapped
					player.registerValidCoords = false;
					player.teleport(player.lastValidCoords); // API Call
				}

				if (player.registerValidCoords) player.lastValidCoords = player.location;

				if (world.worldBorder) {
					let { x, y, z } = player.location;
					const border = world.worldBorder;
					if (Math.abs(x) > border || Math.abs(y) > border || Math.abs(z) > border) {
						if (isAdmin && config.default.world.worldborder.adminsBypassBorder) continue; // use continue for loops

						player.sendMessage(`§6[§eSafeGuard§6]§r You reached the border of §e${border}§f blocks!`); // API Call
						const currentLocation = player.location;
						const offsetX = currentLocation.x >= 0 ? -1 : 1;
						const offsetZ = currentLocation.z >= 0 ? -1 : 1;

						player.tryTeleport({ // API Call
							x: currentLocation.x + offsetX,
							y: currentLocation.y,
							z: currentLocation.z + offsetZ,
						}, {
							checkForBlocks: false,
						});
					}
				}
			} catch (playerError) {
				logDebug("[SafeGuard ERROR] Error processing player in runInterval (velocity/CPS):", players[ii]?.name, playerError, playerError.stack);
			}
		}
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in runInterval (velocity/CPS):", e, e.stack);
	}
});

world.afterEvents.entityHitEntity.subscribe(async (data) => {
	try {
		const player = data.damagingEntity; 
		const hurtEntity = data.hitEntity; 

		if (!(player instanceof Minecraft.Player)) return;
		const hasWeakness = player.getEffect("weakness"); // API Call

		const antiKillaura = SafeguardModule.getModuleStatus(SafeguardModule.Modules.killauraCheck);

		if (!hasWeakness && !player.hitEntities.includes(hurtEntity.id)) player.hitEntities.push(hurtEntity.id);

		if (player.hitEntities.length > config.default.combat.killaura.maxHitEntities && !player.hasAdmin() && antiKillaura) { // hasAdmin is wrapped
			sendAnticheatAlert(player, "multi killaura", player.hitEntities.length, SafeguardModule.Modules.killauraCheck); // Wrapped
			player.addEffect("weakness", 40, { amplifier: 255, showParticles: false }); // API Call
			player.hitEntities = 0; 
		}
		if (!hasWeakness && player.hitEntities.length <= 1) {
			const now = Date.now();

			if (!player.initialClick || now - player.initialClick >= 1000) player.initialClick = now;

			player.currentCps++;
		}
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in entityHitEntity event:", data?.damagingEntity?.name, e, e.stack);
	}
})

world.afterEvents.entityHurt.subscribe((data) => {
	try {
		const player = data.hurtEntity; 

		if (!(player instanceof Minecraft.Player)) return; // Check if it's a player instance

		const healthComponent = player.getComponent("health"); // API Call
		if (!healthComponent) return; // Component might not exist
		const hp = healthComponent.currentValue;
			
		if(hp <= 0) {
			player.combatLogTimer = null;
			if(player.hasTag("safeguard:isInCombat")) player.removeTag("safeguard:isInCombat"); // API Call
			
			if (SafeguardModule.getModuleStatus(SafeguardModule.Modules.deathEffect)) player.runCommand("function assets/death_effect"); // API Call
			
			const deathCoordStatus = SafeguardModule.getModuleStatus(SafeguardModule.Modules.deathCoords);
			if(deathCoordStatus){
				const { x, y, z } = player.location;
				player.sendMessage(`§6[§eSafeGuard§6]§r §eYou died at ${Math.round(x)}, ${Math.round(y)}, ${Math.round(z)} (in ${player.dimension.id.replace("minecraft:","")})`); // API Call
			}
		}

		const antiCombatLogEnabled = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiCombatlog);
		if (!antiCombatLogEnabled) return;

		if (data.damageSource?.damagingEntity instanceof Minecraft.Player) { // Check if damagingEntity exists and is a player
			const damager = data.damageSource.damagingEntity;

			const adminsBypassCombatLogging = config.default.combat.combatLogging.adminsBypass;
			const now = Date.now();

			if (!player.hasTag("safeguard:isInCombat") && antiCombatLogEnabled) { // API Call
				if (player.hasAdmin() && adminsBypassCombatLogging) { // hasAdmin is wrapped
					player.combatLogTimer = 0;
				} else {
					player.addTag("safeguard:isInCombat"); // API Call
					logDebug(player.name, "is now in combat");
					if (!player.combatLogWarningDisplayed) {
						player.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat, leaving during combat will result in a punishment.`); // API Call
						player.combatLogWarningDisplayed = true;
					} else {
						player.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat`); // API Call
					}
				}
			}

			if (!damager.hasTag("safeguard:isInCombat") && antiCombatLogEnabled) { // API Call
				if (damager.hasAdmin() && adminsBypassCombatLogging) { // hasAdmin is wrapped
					damager.combatLogTimer = 0;
				} else {
					damager.addTag("safeguard:isInCombat"); // API Call
					logDebug(damager.name, "is now in combat");
					if (!damager.combatLogWarningDisplayed) {
						damager.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat, leaving during combat will result in a punishment.`); // API Call
						damager.combatLogWarningDisplayed = true;
					} else {
						damager.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat.`); // API Call
					}
				}
			}
			damager.combatLogTimer = now;
			player.combatLogTimer = now;
		}
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in entityHurt event:", data?.hurtEntity?.name, e, e.stack);
	}
})

function betaFeatures(player) {
	try {
		const { velocity } = player;

		if (player.hasAdmin()) return; // hasAdmin is wrapped
		const playerVelocity = velocity;

		const invalidVelocityCheckOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.velocityCheck);

		if (invalidVelocityCheckOn && (playerVelocity.y < -3.919921875 && (Date.now() - player.tridentLastUse) > 5000) && player.isFalling) {
			sendAnticheatAlert(player, "movement cheats (invalid y velocity)", playerVelocity.y.toFixed(3), SafeguardModule.Modules.velocityCheck); // Wrapped
			teleportToGround(player); // Wrapped
		}
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in betaFeatures for player:", player?.name, e, e.stack);
	}
}

Minecraft.system.runInterval(() => {
	try {
		world.getPlayers().forEach(player => { // API Call
			try {
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
					teleportToGround(player); // Wrapped
					sendAnticheatAlert(player, "high velocity difference", velocityDifference, SafeguardModule.Modules.flyCheck); // Wrapped
				}
				if (velocityCheck && speedDifference > 5 && !player.isGliding && player.previousSpeed !== 0 && speed !== 0 && player.currentGamemode !== Minecraft.GameMode.creative) {
					sendAnticheatAlert(player, "high speeds", speedDifference.toFixed(4), SafeguardModule.Modules.velocityCheck); // Wrapped
					player.registerValidCoords = false;
					player.teleport(player.lastValidCoords, { keepVelocity: false, rotation: { x: 0, y: 0 } }); // API Call
				}

				player.previousYVelocity = currentYVelocity;
				player.previousSpeed = speed;
			} catch (playerError) {
				logDebug("[SafeGuard ERROR] Error processing player in runInterval (fly check):", player?.name, playerError, playerError.stack);
			}
		})
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in runInterval (fly check):", e, e.stack);
	}
}, 10);


world.afterEvents.playerGameModeChange.subscribe((data) => {
	try {
		const {toGameMode,player} = data;
		player.currentGamemode = toGameMode;
		if(player.hasAdmin()) return; // hasAdmin is wrapped

		const antiGmcOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiGmc);
		if(antiGmcOn && toGameMode == Minecraft.GameMode.creative){
			player.setGameMode(Minecraft.GameMode.survival); // API Call
			sendAnticheatAlert(player,"gamemode creative","true",SafeguardModule.Modules.antiGmc); // Wrapped
		}
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in playerGameModeChange event:", data?.player?.name, e, e.stack);
	}
})

world.afterEvents.itemUse.subscribe((data) => {
	try {
		if (!(data.source instanceof Minecraft.Player)) return; // Check if source is a player instance
		const player = data.source;
		const item = data.itemStack;
		if (!item) return;

		const enchantable = item.getComponent("enchantable"); // API Call
		if (item.typeId === "minecraft:trident" && enchantable?.hasEnchantment("riptide")){ // API Call
			player.tridentLastUse = Date.now();
		}
		if (item.typeId !== "safeguard:admin_panel") return;
		
		if (!player.hasAdmin()) { // hasAdmin is wrapped
			player.playSound("random.anvil_land"); // API Call
			player.sendMessage("§6[§eSafeGuard§6]§r §4You need admin tag to use admin panel!§r"); // API Call
			return;
		}
		if (!world.scoreboard.getObjective("safeguard:setup_success")) { // API Call
			player.sendMessage(`§6[§eSafeGuard§6]§c§l ERROR: §r§4AntiCheat not setup!§r`); // API Call
			player.sendMessage(`§6[§eSafeGuard§6]§r§4 Run §c/function setup/setup§4 to setup anticheat!§r`); // API Call
			player.playSound("random.anvil_land"); // API Call
			return;
		}

		let mainForm = new ActionFormData()
			.title("SafeGuard Admin Panel")
			.body(`Please select an option from below:`)
			.button("Settings", "textures/ui/settings_glyph_color_2x.png")
			.button("Quick Ban", "textures/ui/hammer_l.png")
			.button("Player Actions", "textures/ui/icon_multiplayer.png")
			.button("Unban Player", "textures/items/iron_sword.png")
			.button("Ban Logs", "textures/items/banner_pattern.png")
		player.playSound("random.pop"); // API Call

		mainForm.show(player).then((formData) => { // UI show calls are handled in ui.js for their .catch
			if (formData.canceled) return;
			// The ui functions themselves should handle errors from form processing or subsequent actions
			switch (formData.selection) {
				case 0:
					return ui.settingSelector(player);
				case 1:
					return ui.playerSelectionForm(player, "ban");
				case 2:
					return ui.playerSelectionForm(player, "action");
				case 3:
					return ui.unbanForm(player);
				case 4:
					return ui.banLogForm(player);
			}
		}).catch(e => logDebug("[SafeGuard ERROR] Error showing/processing main admin panel form:", player.name, e, e.stack));
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in itemUse event:", data?.source?.name, e, e.stack);
	}
});

world.afterEvents.playerBreakBlock.subscribe((data) => {
	try {
		const { player, dimension, block } = data;
		const blockId = data.brokenBlockPermutation.type.id;

		const diamondAlertOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.OreAlerts.diamondOre);
		const netheriteAlertOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.OreAlerts.netheriteOre);
		const antiNuker = SafeguardModule.getModuleStatus(SafeguardModule.Modules.nukerCheck);
		const autoModOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.autoMod);

		if (blockId == "minecraft:bedrock" || blockId == "minecraft:end_portal_frame") {
			if (player.hasAdmin() || player.currentGamemode === Minecraft.GameMode.creative) return; // hasAdmin wrapped
			block.setPermutation(data.brokenBlockPermutation); // API Call
			world.sendMessage(`§6[§eSafeGuard§6]§r§c§l §r§c${player.name}§4 Attempted to break §c${blockId}`); // API Call
		}
		
		if (!config.default.world.nuker.blockExceptions.includes(blockId) && !player.getEffect("haste")) { // API Call
			player.blocksBroken++;
		}

		if (player.blocksBroken > config.default.world.nuker.maxBlocks && antiNuker) {
			if (player.hasAdmin() && !config.default.world.nuker.checkAdmins) return; // hasAdmin wrapped
			
			const items = dimension.getEntities({ // API Call
				location: { x: block.location.x, y: block.location.y, z: block.location.z },
				minDistance: 0,
				maxDistance: 2,
				type: "item"
			});

			for (const item of items) item.kill(); // API Call

			block.setPermutation(data.brokenBlockPermutation); // API Call
			if (autoModOn) {
				player.runCommand("gamemode adventure @s"); // API Call
				player.teleport({ x: player.location.x, y: 325, z: player.location.z }, { dimension: player.dimension, rotation: { x: 0, y: 0 }, keepVelocity: false }); // API Call
				sendAnticheatAlert(player, "nuker", player.blocksBroken, SafeguardModule.Modules.nukerCheck); // Wrapped
			}
			return;
		}

		if (blockId == "minecraft:diamond_ore" || blockId == "minecraft:deepslate_diamond_ore") {
			if (!diamondAlertOn) return;
			sendMessageToAllAdmins(`§6[§eSafeGuard§6]§5§l §r§e${player.name}§f mined x1 §ediamond ore§r`); // Wrapped
		}
		if (blockId == "minecraft:ancient_debris" && netheriteAlertOn) {
			sendMessageToAllAdmins(`§6[§eSafeGuard§6]§5§l §r§e${player.name}§f mined x1 §enetherite ore§r`); // Wrapped
		}
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in playerBreakBlock event:", data?.player?.name, e, e.stack);
	}
})

Minecraft.system.run(() => { // Final initialization run
	try {
		if(!world.safeguardInitialized) Initialize(); // Initialize should have its own robust error handling
		for (const player of world.getPlayers()) { // API Call
			try {
				player.currentGamemode = player.getGameMode(); // API Call
			} catch (playerError) {
				logDebug("[SafeGuard ERROR] Error setting currentGamemode for player on initial run:", player?.name, playerError, playerError.stack);
			}
		}
		initializeReachCheck(); 
		initializeNoSwingCheck(); 
	} catch (e) {
		logDebug("[SafeGuard ERROR] Error in final system.run for initialization:", e, e.stack);
	}
})
