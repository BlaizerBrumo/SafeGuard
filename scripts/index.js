import * as Minecraft from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';


import * as config from "./config.js";
import * as ui from "./assets/ui.js";
import { formatMilliseconds, sendMessageToAllAdmins, parsePunishmentTime, sendAnticheatAlert, logDebug, getSelectedItem } from "./assets/util.js";
import { getPlayerState } from './assets/playerState.js';
import { globalBanList } from './assets/globalBanList.js';
import { commandHandler } from './command/handle.js';
import "./command/importer.js";
import { SafeguardModule } from './classes/module.js';

import "./classes/player.js";
import { legacy_BanToV2, legacy_MuteToV2 } from './assets/legacyMigration.js';
import { Initialize } from './initialize.js';

logDebug("[SafeGuard] Script Loaded");

const world = Minecraft.world;

const gamertagRegex = /[^A-Za-z 0-9-]/gm;


world.beforeEvents.chatSend.subscribe((data) => {
	const { sender: player, message } = data;
	const state = getPlayerState(player);

	const prefix = config.default.chat.prefix;
	const whitelistedPrefixes = config.default.chat.spammer.whitelistedPrefixes;
	let doNotCheckSpam = false;
	const isAdmin = player.hasAdmin();

	const antiSpam = SafeguardModule.getModuleStatus(SafeguardModule.Modules.spammerProtection.name);
	const now = Date.now();

	if (state.isMuted) {
		const muteInfo = player.getMuteInfo();
		if (!muteInfo.isActive) state.isMuted = false;
		else {
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
			Minecraft.system.run(() => {
				player.runCommand(`kick @s §6[§eSafeGuard§6]§r You have been permanently banned for sending invalid packet.`);
			})
			sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§c ${player.name}§4 was automatically banned for sending an invalid text packet (length=${message.length})`, true);
			return;
		}
		if (message == state.lastMessage) {
			data.cancel = true;
			player.sendMessage(`§6[§eSafeGuard§6]§r§c Please don't send repeating messages!`);
			return;
		}
		else if (now - state.lastMessageDate <= config.default.chat.spammer.minTime) {
			data.cancel = true;
			state.lastMessageDate = now;
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

		else if (config.default.chat.spammer.preventNonAsciiChars && /[^\x20-\x7E]/g.test(message)) {
			data.cancel = true;
			player.sendMessage(`§6[§eSafeGuard§6]§r§c Sorry! Your message contains invalid characters and was not sent!`);
			return;
		}
	}

	whitelistedPrefixes.forEach(wPrefix => {
		if (message.startsWith(wPrefix)) {
			doNotCheckSpam = true;
		}
	})

	if (!doNotCheckSpam) {
		state.lastMessage = message;
		state.lastMessageDate = now;
	}


	if (!message.startsWith(prefix)) return;

	//mojang made .runCommand() not be able to run in read-only mode (before events)
	//this bypasses this restriction
	data.cancel = true;
	Minecraft.system.run(() => commandHandler(data));
})


world.afterEvents.playerDimensionChange.subscribe((data) => {
	const { fromLocation, player, toDimension } = data;

	if (toDimension.id == "minecraft:the_end") {
		if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.endLock.name)) return;
		if (player.hasAdmin() && config.default.world.endLock.adminsBypass) return;

		logDebug(`${player.name} entered the end`);
		player.teleport({ ...fromLocation, y: 325 }, { dimension: world.getDimension("overworld"), rotation: { x: 0, y: 0 } });
		player.sendMessage("§6[§eSafeGuard§6]§r§4 The end was locked by an admin!");
		player.addEffect("slow_falling", 1200, { amplifier: 1, showParticles: false });
	}
	else if (toDimension.id == "minecraft:nether") {
		if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.netherLock.name)) return;
		if (player.hasAdmin() && config.default.world.netherLock.adminsBypass) return;

		logDebug(`${player.name} entered the nether`);
		player.teleport({ ...fromLocation, y: 325 }, { dimension: world.getDimension("overworld"), rotation: { x: 0, y: 0 } });
		player.sendMessage("§6[§eSafeGuard§6]§r§4 The nether was locked by an admin!");
		player.addEffect("slow_falling", 1200, { amplifier: 1, showParticles: false });
	}
})

world.afterEvents.playerSpawn.subscribe((data) => {
	const { player } = data;
	const state = getPlayerState(player);


	if (!data.initialSpawn) return;
	try {
		if (!world.safeguardInitialized) Initialize();
	} catch (err) {
		logDebug(`Initialization had expected errors.`);
	}
	state.currentGamemode = player.getGameMode();
	state.isMuted = player.getMuteInfo().isActive;
	state.combatLogTimer = null;
	state.lastSwingTick = Minecraft.system.currentTick;

	const antiNamespoof = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiNamespoof.name);

	if (antiNamespoof && (player.name.length > 16 || gamertagRegex.test(player.name))) {
		player.ban("Namespoof", Date.now(), true, "SafeGuard AntiCheat");
		player.runCommand(`kick @s §6[§eSafeGuard§6]§r You have been permanently banned for namespoof.`);
		sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§r ${player.name}§r§4 was automatically banned for namespoof`, true);
		return;
	}


	if (!world.safeguardIsSetup && player.hasAdmin()) {
		player.sendMessage(`§r§6[§eSafeGuard§6]§r§4 WARNING! §cThe AntiCheat is not setup, some features may not work. Please run §7/function setup/setup§c to setup!`);
	}

	if (world.safeguardVersion !== config.default.version) {
		player.sendMessage(`§r§6[§eSafeGuard§6]§f SafeGuard has successfully updated to v${config.default.version}`);
		world.setDynamicProperty("safeguard:version", config.default.version);
	}

	if (world.safeguardNotifyMigrationQueue.includes(player.name)) {
		const notifyScoreboard = world.scoreboard.addObjective("safeguard:notify") ?? world.scoreboard.getObjective("safeguard:notify");
		notifyScoreboard.setScore(player.scoreboardIdentity, 1);
		let newArray = new Set(world.safeguardNotifyMigrationQueue);
		newArray.delete(player.name);
		world.setDynamicProperty("safeguard:legacyNotifyPlayerList", [...newArray].join(","));

	}
	if (globalBanList.includes(player.name)) return player.runCommand(`kick @s §r§6[§eSafeGuard§6]§r §4Your name was found in the SafeGuard global ban list.`)


	if (world.safeguardUnbanQueue.includes(player.name)) {
		if (player.unban()) {
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

	if (player.hasTag("muted")) legacy_MuteToV2(player);

	if (player.hasTag("safeguard:Ban")) return legacy_BanToV2(player);

	if ((world.safeguardDeviceBan.length > 0 && world.safeguardDeviceBan.includes(player.clientSystemInfo.platformType)) && !player.hasAdmin()) {
		sendMessageToAllAdmins(`§6[§eSafeGuard§6]§4 The player §c${player.name}§4 was kicked for joining on banned device: §c${player.clientSystemInfo.platformType}`);
		player.runCommand(`kick @s §r§6[§eSafeGuard§6]§r §4Sorry, the administrators have banned the device you are playing on.`);
		return;
	}

	const welcomerisOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.welcomer.name);
	if (welcomerisOn) {
		const firstTimeWelcome = player.getDynamicProperty("safeguard:firstTimeWelcome");
		if (!firstTimeWelcome) {
			world.sendMessage(`§6[§eSafeGuard§6]§r§e ${player.name}§b is joining for the first time! This realm is protected by §eSafeGuard§b, enjoy your stay!§r`);
			player.setDynamicProperty("safeguard:firstTimeWelcome", true);
		} else {
			world.sendMessage(`§6[§eSafeGuard§6]§r§e ${player.name}§b is joining on §e${player.clientSystemInfo.platformType}`);
		}
	}

	const antiCLog = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiCombatlog.name);
	const endLockOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.endLock.name);
	const netherLock = SafeguardModule.getModuleStatus(SafeguardModule.Modules.netherLock.name);

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
		logDebug(player.name, "joined while in combat")
		player.removeTag("safeguard:isInCombat");

		if (player.hasAdmin() && config.default.combat.combatLogging.adminsBypass) state.combatLogTimer = null;
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
	const playerFreezeStatus = player.getDynamicProperty("safeguard:freezeStatus");
	if (typeof playerFreezeStatus === "boolean") player.setFreezeTo(playerFreezeStatus);




})

const armorSlotRules = {
	Head: { suffixes: ["_helmet"], exceptions: ["minecraft:carved_pumpkin", "minecraft:skeleton_skull", "minecraft:wither_skeleton_skull", "minecraft:zombie_head", "minecraft:creeper_head", "minecraft:dragon_head", "minecraft:piglin_head", "minecraft:player_head"] },
	Chest: { suffixes: ["_chestplate"], exceptions: ["minecraft:elytra"] },
	Legs: { suffixes: ["_leggings"], exceptions: [] },
	Feet: { suffixes: ["_boots"], exceptions: [] },
};


const armorSlotNames = Object.keys(armorSlotRules);

function invalidEquipmentCheckModule(player) {
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.invalidEquipmentCheck.name) || player.hasAdmin()) return;

	const equippable = player.getComponent(Minecraft.EntityComponentTypes.Equippable);
	if (!equippable) return;

	for (const slot of armorSlotNames) {
		const item = equippable.getEquipment(slot);
		if (!item || !item.typeId.startsWith("minecraft:")) continue;

		const rules = armorSlotRules[slot];
		if (rules.exceptions.includes(item.typeId) || rules.suffixes.some((suffix) => item.typeId.endsWith(suffix))) continue;

		equippable.setEquipment(slot);
		player.ban("Invalid equipment", Date.now(), true, "SafeGuard AntiCheat");
		player.runCommand(`kick "${player.name}" §6[§eSafeGuard§6]§r You have been permanently banned for invalid equipment.`);
		world.sendMessage(`§6[§eSafeGuard Notify§6]§c ${player.name}§4 was automatically banned for wearing §c${item.typeId.replace("minecraft:", "")}§4 in the ${slot} slot`);
		return;
	}
}

function checkSlotDurability(player, inv, slot) {
	const item = inv.getItem(slot);
	if (!item) return;

	const durability = item.getComponent(Minecraft.ItemComponentTypes.Durability);
	if (!durability) return;

	if (durability.damage > durability.maxDurability || durability.damage < 0) {
		const newItem = item;

		Minecraft.system.run(() => {
			const durComp = newItem.getComponent(Minecraft.ItemComponentTypes.Durability);
			durComp.damage = 0;
			inv.setItem(slot, newItem);
		})

		//doesn't count toward AutoMod, the item could've been picked up from someone else
		sendAnticheatAlert(player, "Unbreakable Item", `Item: ${item.typeId.replace("minecraft:", "")} | Durability: ${durability.damage}/${durability.maxDurability}`, SafeguardModule.Modules.invalidDurabilityCheck.name, false);
	}
}


function durabilitySelectedSlotCheckModule(player) {
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.invalidDurabilityCheck.name) || player.hasAdmin()) return;

	const inv = player.getComponent(Minecraft.EntityComponentTypes.Inventory).container;
	checkSlotDurability(player, inv, player.selectedSlotIndex);
}


function autoTotemCheckModule(player, state) {
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.autoTotemCheck.name) || player.hasAdmin()) return;

	const equippable = player.getComponent(Minecraft.EntityComponentTypes.Equippable);
	if (!equippable) return;

	const hasTotem = equippable.getEquipment("Offhand")?.typeId === "minecraft:totem_of_undying";

	if (!state.totemOffhandPresent && hasTotem && state.totemLastPopTick > 0) {
		const currentTick = Minecraft.system.currentTick;
		const cfg = config.default.combat.autoTotem;
		const ticksToRetotem = currentTick - state.totemLastPopTick;

		//good data for admins
		state.totemTicksToRetotemSum += ticksToRetotem;
		state.totemTicksToRetotemCount++;
		const avgTicksToRetotem = (state.totemTicksToRetotemSum / state.totemTicksToRetotemCount).toFixed(1);
		const detail = `ticksToRetotem=${ticksToRetotem}, pops=${state.totemPopsRecorded}, avgTicksToRetotem=${avgTicksToRetotem}`;

		if (ticksToRetotem < cfg.minSwapTicks) {
			state.totemFastSwapStreak++;
			state.totemConsistentStreak = 0;
			state.totemPreviousTicksToRetotem = null;

			if (state.totemFastSwapStreak >= cfg.fastSwapStreakRequired) {
				sendAnticheatAlert(player, "Fast Swap", detail, SafeguardModule.Modules.autoTotemCheck.name);
			}
		} else {
			state.totemFastSwapStreak = 0;
			state.totemConsistentStreak = (state.totemPreviousTicksToRetotem !== null && Math.abs(ticksToRetotem - state.totemPreviousTicksToRetotem) <= cfg.tickTolerance)
				? state.totemConsistentStreak + 1
				: 1;

			if (state.totemConsistentStreak >= cfg.consistentSwapsRequired) {
				sendAnticheatAlert(player, "Consistent Timing", detail, SafeguardModule.Modules.autoTotemCheck.name);
				state.totemConsistentStreak = 0;
			}

			state.totemPreviousTicksToRetotem = ticksToRetotem;
		}

		state.totemLastPopTick = 0;
	}

	state.totemOffhandPresent = hasTotem;
}

function durabilityCheckModule(player) {
	const isAdmin = player.hasAdmin();
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.invalidDurabilityCheck.name) || isAdmin) return;

	const inv = player.getComponent(Minecraft.EntityComponentTypes.Inventory).container;
	
	const selectedSlot = player.selectedSlotIndex;

	for (let currSlot = 0; currSlot < inv.size; currSlot++) {
		if (currSlot === selectedSlot) continue; //already checked every tick by durabilitySelectedSlotCheckModule
		checkSlotDurability(player, inv, currSlot);
	}
}

function evaluateCpsWindow(player, state) {
	if (state.currentCps <= 0) return;
	const antiAutoclicker = SafeguardModule.getModuleStatus(SafeguardModule.Modules.cpsCheck.name);
	if (state.currentCps > config.default.combat.autoclicker.maxCps && antiAutoclicker) {
		sendAnticheatAlert(player, "Autoclicker", state.currentCps, SafeguardModule.Modules.cpsCheck.name);
	}
	state.finalCps = state.currentCps;
	state.currentCps = 0;
	state.initialClick = 0;
}

let inventoryScanCounter = 0;

Minecraft.system.runInterval(() => {
	inventoryScanCounter++;
	const runInventoryScans = inventoryScanCounter >= config.default.other.performance.inventoryScanEveryTicks;
	if (runInventoryScans) inventoryScanCounter = 0;

	const players = world.getPlayers();
	for (let ii = 0; ii < players.length; ii++) {
		const player = players[ii];
		const state = getPlayerState(player);
		state.hitEntities = [];
		state.blocksBroken = 0;

		durabilitySelectedSlotCheckModule(player);
		autoTotemCheckModule(player, state);
		if (runInventoryScans) {
			invalidEquipmentCheckModule(player);
			durabilityCheckModule(player);
		}
		if (state.currentCps > 0 && Date.now() - state.initialClick >= 1000) {
			evaluateCpsWindow(player, state);
		}
		if (!state.registerValidCoords) state.registerValidCoords = true;
		if (state.combatLogTimer) {
			const now = Date.now();
			if (now - state.combatLogTimer > config.default.combat.combatLogging.timeToStayInCombat) {
				state.combatLogTimer = null;
				player.removeTag("safeguard:isInCombat");
				logDebug(player.name, "is longer in combat");
				player.sendMessage(`§r§6[§eSafeGuard§6]§r You are no longer in combat.`);
			}
		}

		//read location once and reuse for both the valid-coords cache and the border check below
		const location = player.location;
		if (state.registerValidCoords) state.lastValidCoords = location;

		if (world.worldBorder) {
			const { x, y, z } = location;
			const border = world.worldBorder;
			const originX = world.worldBorderOriginX ?? 0;
			const originZ = world.worldBorderOriginZ ?? 0;
			const relativeX = x - originX;
			const relativeZ = z - originZ;

			if (Math.abs(relativeX) > border || Math.abs(relativeZ) > border) {
				//hasAdmin() is only needed once a player is actually beyond the border
				if (player.hasAdmin() && config.default.world.worldborder.adminsBypassBorder) continue;

				player.sendMessage(`§6[§eSafeGuard§6]§r You reached the border of §e${border}§f blocks!`);

				const cfg = config.default.world.worldborder;
				const now = Date.now();
				if (now - state.lastBorderPushTime > cfg.pushStreakResetMs) state.borderPushStreak = 0;
				state.lastBorderPushTime = now;

				const pushDistance = Math.min(2 ** state.borderPushStreak, cfg.maxPushBlocks);
				state.borderPushStreak++;

				const innerBorder = border - pushDistance;
				const newX = originX + Math.max(-innerBorder, Math.min(innerBorder, relativeX));
				const newZ = originZ + Math.max(-innerBorder, Math.min(innerBorder, relativeZ));

				player.teleport(
					{ x: newX, y: y, z: newZ },
					{
						dimension: player.dimension,
						checkForBlocks: true
					}
				);
			}
		}

	}
}, 2);

// Credits to the Paradox team for this math.
function computeViewDot(eyeLocation, targetPoint, viewDirection) {
	const dx = targetPoint.x - eyeLocation.x;
	const dy = targetPoint.y - eyeLocation.y;
	const dz = targetPoint.z - eyeLocation.z;
	const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
	if (distance < 1e-6) return null;
	const dot = (viewDirection.x * dx + viewDirection.y * dy + viewDirection.z * dz) / distance;
	return { distance, dot };
}

function fovCheckModule(player, hurtEntity, state) {
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.fovCheck.name) || player.hasAdmin()) return;
	if (player.clientSystemInfo.platformType === Minecraft.PlatformType.Mobile) return;

	const cfg = config.default.combat.fov;
	if (Date.now() - state.fovLastAlertTime < cfg.alertCooldownMs) return;
	try {
		const eyeLocation = player.getHeadLocation();
		const targetHead = hurtEntity.getHeadLocation();

		const result = computeViewDot(eyeLocation, targetHead, player.getViewDirection());
		if (!result || result.distance < cfg.minDistance) return;

		const cosThreshold = Math.cos(cfg.maxAngle * Math.PI / 180);
		if (result.dot < cosThreshold) {
			const angleDegrees = Math.acos(Math.min(1, Math.max(-1, result.dot))) * (180 / Math.PI);
			state.fovLastAlertTime = Date.now();
			sendAnticheatAlert(player, "Swing", `angle=${angleDegrees.toFixed(1)}`, SafeguardModule.Modules.fovCheck.name);
		}
	} catch (err) {
		//getHeadLocation/getViewDirection can throw on an unloaded chunk
	}
}

//Rotation check idea from PR #11 by @Dream23322: https://github.com/BlaizerBrumo/SafeGuard/pull/11
//I believe its near impossible to ever land on a perfect integer rotation on one axis and not the other, so this is a good indicator of killaura
//Tested against some cheats.
function rotationKillauraCheckModule(player) {
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.killauraCheck.name) || player.hasAdmin()) return;

	const rotation = player.getRotation();
	if ((Number.isInteger(rotation.x) && !Number.isInteger(rotation.y)) || (!Number.isInteger(rotation.x) && Number.isInteger(rotation.y))) {
		sendAnticheatAlert(player, "Axis Snap", `yaw=${rotation.y}, pitch=${rotation.x}`, SafeguardModule.Modules.killauraCheck.name);
	}
}

//flags when  player attacks and does another action within the same tick
function dualActionKillauraCheckModule(player, state, currentTick) {
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.killauraCheck.name) || player.hasAdmin()) return;

	if (state.lastHitEntityTick === currentTick && state.lastStartBreakBlockTick === currentTick) {
		sendAnticheatAlert(player, "Dual Action", "action=mining", SafeguardModule.Modules.killauraCheck.name);
		return;
	}

	if (player.isSleeping) {
		sendAnticheatAlert(player, "Dual Action", "action=sleeping", SafeguardModule.Modules.killauraCheck.name);
	}
}

//checks if player places/breaks a block or attacks entity without swinging
function noSwingCheckModule(player, state, actionName) {
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.noSwingCheck.name) || player.hasAdmin()) return;

	
	if (getSelectedItem(player)?.typeId === "minecraft:trident" || player.getEffect("mining_fatigue")) return;

	const actionTick = Minecraft.system.currentTick;

	Minecraft.system.runTimeout(() => {
		if (actionTick - state.lastSwingTick > config.default.combat.noSwing.thresholdTicks) {
			sendAnticheatAlert(player, "", `action=${actionName}`, SafeguardModule.Modules.noSwingCheck.name);
		}
	}, config.default.combat.noSwing.verifyDelayTicks);
}

world.afterEvents.playerSwingStart.subscribe((data) => {
	getPlayerState(data.player).lastSwingTick = Minecraft.system.currentTick;
});

function autoCrystalBreakCheckModule(player, hitEntity, state) {
	if (hitEntity.typeId !== "minecraft:ender_crystal") return;

	const tracked = unexplainedCrystalSpawns.get(hitEntity.id);
	if (!tracked) {
		//certain auto crystal clients do not produce ItemUse event when placing crystals unlike a legit player which does on every placement.
		state.autoCrystalStreak = 0;
		return;
	}
	unexplainedCrystalSpawns.delete(hitEntity.id);

	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.autoCrystalCheck.name) || player.hasAdmin()) return;

	const cfg = config.default.combat.autoCrystal;
	const currentTick = Minecraft.system.currentTick;

	if (currentTick - tracked.spawnTick > cfg.maxBreakDelayTicks) {
		state.autoCrystalStreak = 0;
		return;
	}

	state.autoCrystalStreak++;
	if (state.autoCrystalStreak >= cfg.streakRequired) {
		sendAnticheatAlert(player, "", `streak=${state.autoCrystalStreak}`, SafeguardModule.Modules.autoCrystalCheck.name);
		state.autoCrystalStreak = 0;
	}
}

world.afterEvents.entityHitEntity.subscribe((data) => {
	const player = data.damagingEntity;
	const hurtEntity = data.hitEntity;

	if (!(player instanceof Minecraft.Player)) return;
	const state = getPlayerState(player);

	if (!player.hasAdmin() && player.id === hurtEntity.id) {
		player.ban("Self Hit", Date.now(), true, "SafeGuard AntiCheat");
		player.runCommand(`kick @s §6[§eSafeGuard§6]§r You have been permanently banned for hitting yourself.`);
		sendMessageToAllAdmins(`§6[§eSafeGuard Notify§6]§c ${player.name}§4 was automatically banned for hitting themselves (self hit)`, true);
		return;
	}

	fovCheckModule(player, hurtEntity, state);
	rotationKillauraCheckModule(player);
	autoCrystalBreakCheckModule(player, hurtEntity, state);
	noSwingCheckModule(player, state, "attack");

	const currentTick = Minecraft.system.currentTick;
	state.lastHitEntityTick = currentTick;
	dualActionKillauraCheckModule(player, state, currentTick);

	if (!state.hitEntities.includes(hurtEntity.id)) state.hitEntities.push(hurtEntity.id);

	//riptide can legitimately hit multiple entities in one throw
	const isHoldingTrident = getSelectedItem(player)?.typeId === "minecraft:trident";

	if (!isHoldingTrident && state.hitEntities.length > config.default.combat.killaura.maxHitEntities && !player.hasAdmin() && SafeguardModule.getModuleStatus(SafeguardModule.Modules.killauraCheck.name)) {
		sendAnticheatAlert(player, "Multi Hit", state.hitEntities.length, SafeguardModule.Modules.killauraCheck.name);
		state.hitEntities = [];
	}
	if (state.hitEntities.length <= 1) {
		const now = Date.now();

		if (state.initialClick && now - state.initialClick >= 1000) evaluateCpsWindow(player, state);
		if (!state.initialClick) state.initialClick = now;

		state.currentCps++;

	}


})
world.afterEvents.entityHurt.subscribe((data) => {
	const player = data.hurtEntity;

	if (player.typeId !== "minecraft:player") return;

	const state = getPlayerState(player);
	const hp = player.getComponent("health").currentValue;
	const currentTick = Minecraft.system.currentTick;


	if (SafeguardModule.getModuleStatus(SafeguardModule.Modules.autoTotemCheck.name) && !player.hasAdmin() && state.totemOffhandPresent) {
		const equippable = player.getComponent(Minecraft.EntityComponentTypes.Equippable);
		const stillHasTotem = equippable?.getEquipment("Offhand")?.typeId === "minecraft:totem_of_undying";

		if (!stillHasTotem && hp <= 1) {
			state.totemLastPopTick = currentTick;
			state.totemPopsRecorded++;
			state.totemOffhandPresent = false;
		}
	}

	if (hp <= 0) {
		state.combatLogTimer = null;
		if (player.hasTag("safeguard:isInCombat")) player.removeTag("safeguard:isInCombat");

		if (SafeguardModule.getModuleStatus(SafeguardModule.Modules.deathEffect.name)) player.runCommand("function assets/death_effect");


		const deathCoordStatus = SafeguardModule.getModuleStatus(SafeguardModule.Modules.deathCoords.name);
		if (deathCoordStatus) {
			const { x, y, z } = player.location;
			player.sendMessage(`§6[§eSafeGuard§6]§r §eYou died at ${Math.round(x)}, ${Math.round(y)}, ${Math.round(z)} (in ${player.dimension.id.replace("minecraft:", "")})`);
		}
	}

	const antiCombatLogEnabled = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiCombatlog.name);
	if (!antiCombatLogEnabled) return;

	if (data.damageSource.damagingEntity) {
		const damager = data.damageSource.damagingEntity;
		if (damager.typeId !== "minecraft:player") return;
		const damagerState = getPlayerState(damager);

		const adminsBypassCombatLogging = config.default.combat.combatLogging.adminsBypass;
		const now = Date.now();


		if (!player.hasTag("safeguard:isInCombat") && antiCombatLogEnabled) {
			if (player.hasAdmin() && adminsBypassCombatLogging) {
				state.combatLogTimer = 0;
			} else {
				player.addTag("safeguard:isInCombat");
				logDebug(player.name, "is now in combat");
				if (!state.combatLogWarningDisplayed) {
					player.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat, leaving during combat will result in a punishment.`);
					state.combatLogWarningDisplayed = true;
				} else {
					player.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat`);
				}
			}
		}

		if (!damager.hasTag("safeguard:isInCombat") && antiCombatLogEnabled) {
			if (damager.hasAdmin() && adminsBypassCombatLogging) {
				damagerState.combatLogTimer = 0;
			} else {
				damager.addTag("safeguard:isInCombat");
				logDebug(damager.name, "is now in combat");
				if (!damagerState.combatLogWarningDisplayed) {
					damager.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat, leaving during combat will result in a punishment.`);
					damagerState.combatLogWarningDisplayed = true;
				} else {
					damager.sendMessage(`§r§6[§eSafeGuard§6]§r You are now in combat.`);
				}
			}
		}
		damagerState.combatLogTimer = now;
		state.combatLogTimer = now;
	}
})
world.afterEvents.playerGameModeChange.subscribe((data) => {
	const { toGameMode, player } = data;
	getPlayerState(player).currentGamemode = toGameMode;
	//NOTE: This only gets triggered when a person switches gamemode, it DOES NOT constantly check for gamemode creative
	if (player.hasAdmin()) return;

	const antiGmcOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiGmc.name);
	if (antiGmcOn && toGameMode == Minecraft.GameMode.creative) {
		player.setGameMode(Minecraft.GameMode.survival);
		sendAnticheatAlert(player, "", "true", SafeguardModule.Modules.antiGmc.name);
	}
})

function fovPlaceCheckModule(player, block, data) {
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.fovCheck.name) || player.hasAdmin()) return;
	if (player.clientSystemInfo.platformType === Minecraft.PlatformType.Mobile) return;

	const cfg = config.default.combat.fov;
	const state = getPlayerState(player);
	if (Date.now() - state.fovPlacementLastAlertTime < cfg.alertCooldownMs) return;

	try {
		const eyeLocation = player.getHeadLocation();
		const blockCenter = { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 };

		const result = computeViewDot(eyeLocation, blockCenter, player.getViewDirection());
		if (!result || result.distance < cfg.minDistance) return;

		const cosThreshold = Math.cos(cfg.maxAngle * Math.PI / 180);
		if (result.dot < cosThreshold) {
			const angleDegrees = Math.acos(Math.min(1, Math.max(-1, result.dot))) * (180 / Math.PI);
			state.fovPlacementLastAlertTime = Date.now();
			data.cancel = true;
			Minecraft.system.run(() => {
				sendAnticheatAlert(player, "Placement", `angle=${angleDegrees.toFixed(1)}`, SafeguardModule.Modules.fovCheck.name);
			});
		}
	} catch (err) {
		//getHeadLocation/getViewDirection/block.location can throw on an unloaded chunk.
	}
}

world.beforeEvents.playerPlaceBlock.subscribe((data) => {
	const { player, block, permutationToPlace } = data;

	if (player.hasAdmin()) return;

	//gravity affects these, randomly gave me a false positive for sand, not sure why.
	const gravityAffectedBlocks = ["minecraft:sand", "minecraft:gravel", "minecraft:pointed_dripstone"];

	const antiAirPlaceOn = SafeguardModule.getModuleStatus(SafeguardModule.Modules.airPlaceCheck.name);
	if (antiAirPlaceOn && permutationToPlace.type.id !== "minecraft:scaffolding" && !gravityAffectedBlocks.includes(permutationToPlace.type.id)) {
		try {
			const hasSolidSupport = [block.above(), block.below(), block.north(), block.south(), block.east(), block.west()]
				.some(neighbor => neighbor?.isSolid);

			if (!hasSolidSupport) {
				data.cancel = true;
				Minecraft.system.run(() => {
					sendAnticheatAlert(player, "", permutationToPlace.type.id.replace("minecraft:", ""), SafeguardModule.Modules.airPlaceCheck.name);
				});
			}
		} catch (err) {
			//neighbor lookup can throw on an unloaded/out-of-bounds chunk
			logDebug(`[SafeGuard] AirPlace check failed for ${player.name}: ${err}`);
		}
	}

	fovPlaceCheckModule(player, block, data);
})

world.afterEvents.playerPlaceBlock.subscribe((data) => {
	const { player, block } = data;
	const state = getPlayerState(player);

	noSwingCheckModule(player, state, "place");

	if (SafeguardModule.getModuleStatus(SafeguardModule.Modules.scaffoldCheck.name)) {
		const playerRotation = player.getRotation();

		if (playerRotation.x % 10 === 0) {
			block.setType("minecraft:air");
			if (state.scaffoldChecks === 1 || state.scaffoldChecks % 15 === 0) sendAnticheatAlert(player, "", `timesDetected=${state.scaffoldChecks}`, SafeguardModule.Modules.scaffoldCheck.name);
			state.scaffoldChecks++
		}
	}
})

const MIN_CONSECUTIVE_FAST_THROWS = 2;

world.beforeEvents.itemUse.subscribe((data) => {
	if (data.source.typeId !== "minecraft:player") return;
	const player = data.source;
	const item = data.itemStack;
	if (!item) return;
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.antiFastUse.name) || player.hasAdmin()) return;

	const cfg = config.default.combat.antiFastUse;
	if (!cfg.items.includes(item.typeId)) return;

	const state = getPlayerState(player);
	const now = Date.now();
	const previousUse = state.lastThrowableUseTime;
	state.lastThrowableUseTime = now;
	if (previousUse === 0) return;

	const interval = now - previousUse;

	if (interval >= cfg.minThrowIntervalMs) {
		state.throwableIntervalSum = 0;
		state.throwableIntervalCount = 0;
		return;
	}

	data.cancel = true;

	state.throwableIntervalSum += interval;
	state.throwableIntervalCount++;
	if (state.throwableIntervalCount < MIN_CONSECUTIVE_FAST_THROWS) return;

	state.throwableSpamDetections++;
	if (state.throwableSpamDetections === 1 || state.throwableSpamDetections % 15 === 0) {
		const avgInterval = Math.round(state.throwableIntervalSum / state.throwableIntervalCount);
		Minecraft.system.run(() => {
			sendAnticheatAlert(player, "", `avgInterval=${avgInterval}ms`, SafeguardModule.Modules.antiFastUse.name);
		});
	}
})

world.beforeEvents.itemUse.subscribe((data) => {
	if (data.source.typeId !== "minecraft:player") return;
	const item = data.itemStack;
	if (!item || item.typeId !== "minecraft:end_crystal") return;

	getPlayerState(data.source).lastEndCrystalItemUseTick = Minecraft.system.currentTick;
});

const unexplainedCrystalSpawns = new Map();
world.afterEvents.entitySpawn.subscribe((data) => {
	if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.autoCrystalCheck.name)) return;
	if (data.entity.typeId !== "minecraft:ender_crystal") return;

	const cfg = config.default.combat.autoCrystal;
	const currentTick = Minecraft.system.currentTick;

	//cleanup list
	for (const [id, tracked] of unexplainedCrystalSpawns) {
		if (currentTick - tracked.spawnTick > cfg.maxBreakDelayTicks) unexplainedCrystalSpawns.delete(id);
	}

	let location;
	try {
		location = data.entity.location;
	} catch (err) {
		return;
	}

	//a pending click explains only the next crystal spawn near that player
	const nearbyPlayers = data.entity.dimension.getPlayers({ location, maxDistance: cfg.nearbyPlayerRadius });
	let explainedByPlayer = null;
	for (const p of nearbyPlayers) {
		const pState = getPlayerState(p);
		if (pState.lastEndCrystalItemUseTick !== 0 && currentTick - pState.lastEndCrystalItemUseTick <= cfg.pendingPlacementTicks) {
			explainedByPlayer = pState;
			break;
		}
	}

	if (explainedByPlayer) {
		explainedByPlayer.lastEndCrystalItemUseTick = 0;
		return;
	}

	unexplainedCrystalSpawns.set(data.entity.id, { spawnTick: currentTick });
});

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
		.button("Ban Logs", "textures/items/banner_pattern.png")
	player.playSound("random.pop");

	mainForm.show(player).then((formData) => {
		if (formData.canceled) return;
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
	})
});

world.afterEvents.playerStartBreakingBlock.subscribe((data) => {
	const { player } = data;
	const state = getPlayerState(player);
	const currentTick = Minecraft.system.currentTick;

	state.lastStartBreakBlockTick = currentTick;
	dualActionKillauraCheckModule(player, state, currentTick);
});

world.afterEvents.playerBreakBlock.subscribe((data) => {
	const { player, dimension, block } = data;
	const state = getPlayerState(player);
	const blockId = data.brokenBlockPermutation.type.id;

	noSwingCheckModule(player, state, "break");

	if (blockId == "minecraft:bedrock" || blockId == "minecraft:end_portal_frame") {
		if (player.hasAdmin() || state.currentGamemode === Minecraft.GameMode.creative) return;
		block.setPermutation(data.brokenBlockPermutation);
		world.sendMessage(`§6[§eSafeGuard§6]§r§c§l §r§c${player.name}§4 Attempted to break §c${blockId}`)
	}
	if (!config.default.world.nuker.blockExceptions.includes(blockId) && !player.getEffect("haste")) {
		state.blocksBroken++
	}

	if (state.blocksBroken > config.default.world.nuker.maxBlocks && SafeguardModule.getModuleStatus(SafeguardModule.Modules.nukerCheck.name)) {
		if (player.hasAdmin() && !config.default.world.nuker.checkAdmins) return;
		const items = dimension.getEntities({
			location: { x: block.location.x, y: block.location.y, z: block.location.z },
			minDistance: 0,
			maxDistance: 2,
			type: "item"
		});

		for (const item of items) item.kill();

		block.setPermutation(data.brokenBlockPermutation);
		if (SafeguardModule.getModuleStatus(SafeguardModule.Modules.autoMod.name)) {
			player.runCommand("gamemode adventure @s");
			player.teleport({ x: player.location.x, y: 325, z: player.location.z }, { dimension: player.dimension, rotation: { x: 0, y: 0 }, keepVelocity: false });
			sendAnticheatAlert(player, "", state.blocksBroken, SafeguardModule.Modules.nukerCheck.name);
		}
		return;
	}

	//xray alerts
	if (blockId == "minecraft:diamond_ore" || blockId == "minecraft:deepslate_diamond_ore") {
		if (!SafeguardModule.getModuleStatus(SafeguardModule.Modules.OreAlerts.diamondOre.name)) return
		sendMessageToAllAdmins(`§6[§eSafeGuard§6]§5§l §r§e${player.name}§f mined x1 §ediamond ore§r`);
	}
	if (blockId == "minecraft:ancient_debris" && SafeguardModule.getModuleStatus(SafeguardModule.Modules.OreAlerts.netheriteOre.name)) {
		sendMessageToAllAdmins(`§6[§eSafeGuard§6]§5§l §r§e${player.name}§f mined x1 §enetherite ore§r`);
	}
})


Minecraft.system.run(() => {
	//in case of /reload being ran
	if (!world.safeguardInitialized) Initialize();
	for (const player of world.getPlayers()) {
		getPlayerState(player).currentGamemode = player.getGameMode();
	}
})