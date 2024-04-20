import * as Minecraft from "@minecraft/server";
import * as config from "../config";
const world = Minecraft.world;


export const millisecondTime = {
	minute: 60000,
	hour: 3600000,
	day: 86400000
}

export function formatMilliseconds(milliseconds) {
	if (milliseconds < 0) {
	  return 'No time set.';
	}
  
	const totalSeconds = Math.floor(milliseconds / 1000);
	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
  
	const formattedDays = String(days).padStart(2, '0');
	const formattedHours = String(hours).padStart(2, '0');
	const formattedMinutes = String(minutes).padStart(2, '0');
  
	return `${formattedDays} Days ${formattedHours} Hours ${formattedMinutes} Mins`;
}
export function parsePunishmentTime(punishment) {
	if (punishment.length !== 2) {
	  return null;
	}
  
	const amount = parseInt(punishment[0]);
	if (isNaN(amount) || amount <= 0) {
	  return null;
	}
  
	const unit = punishment[1].toLowerCase();
	const multiplier = {
	  minute: millisecondTime.minute,
	  hour: millisecondTime.hour,
	  day: millisecondTime.day,
	}[unit];
  
	if (!multiplier) {
	  return null;
	}
  
	return amount * multiplier;
}
export function invsee(sender, target) {
	const senderPlayer = getPlayerByName(sender);
	const targetPlayer = getPlayerByName(target);
	if(targetPlayer == undefined) return senderPlayer.sendMessage(`§6[§eSafeGuard§6]§f Player §e${target}§f was not found`);
	const inv = targetPlayer.getComponent("minecraft:inventory").container;
	senderPlayer.sendMessage(`§6[§eSafeGuard§6]§f ${targetPlayer.nameTag}'s inventory:\n\n`);
	for (let i = 0; i < inv.size; i++) {
		const item = inv.getItem(i)
		if (!item) continue;
		const itemName = item.nameTag ?? ''
		const { amount } = item;
		if (item.typeId == "undefined") continue;
		senderPlayer.sendMessage(`§6[§eSafeGuard§6]§f Slot §e${i}§f: §e${item.typeId.replace('minecraft:','')}§f x§e${item.amount} ${itemName ? `§fItem Name: §r${itemName}` : ""}`)
	}
}
export function canFindPlayer(player){
	const target = [...world.getPlayers({
		name: player
	})][0]
	if(target == undefined) return false
	else return true;
}
export function getPlayerByName(name){
	const player = [...world.getPlayers({
		name: name
	})][0]
	return player;
}
export function scoreboardAction(id,type){
    //this shite not letting me delete it inside a before event :sob:
    Minecraft.system.run(()=>{ 
        if(type == "remove") world.scoreboard.removeObjective(id);
        if(type == "add") world.scoreboard.addObjective(id,id);
    });
}

export function unban(player,playerName){
	if(world.scoreboard.getObjective(`safeguard:unban:${playerName}`)){
		return player.sendMessage(`§6[§eSafeGuard§6]§r§4 Player §c${playerName}§4 is already pending an unban!`);
	}
	scoreboardAction(`safeguard:unban:${playerName}`,"add");
	player.sendMessage(`§6[§eSafeGuard§6]§r Player §e${playerName}§r will be unbanned when they join.`)
}

export function isRiding(player){
	if(player.getComponent("minecraft:riding")) return true
	else return false
}

export function sendMessageToAllAdmins(message = "No message provided",isANotification = false){
	if(config.default.debug) return world.sendMessage(message);
	let entityQueryOptions = {
		tags:["admin"]
	};
	if(isANotification){
		entityQueryOptions.scoreOptions = [{
			objective: "notify",
			maxScore: 1,
			minScore: 1,
			exclude: false
		}]
	}
	
	const adminPlayers = world.getPlayers(entityQueryOptions);
	adminPlayers.forEach((admin) => {
		admin.sendMessage(message);
	})
}

export function teleportToGround(player) {
	const playerPosition = player.location;
	const eyeY = playerPosition.y + 1.6; // Adjust for eye position
  
	const raycastStart = { x: playerPosition.x, y: eyeY, z: playerPosition.z };
	const raycastDirection = { x: 0, y: -1, z: 0 };	
	const dimension = player.dimension;

	const tempBlock = dimension.getBlockFromRay(raycastStart,raycastDirection).block;
	if(!tempBlock){
		console.warn("Couldn't teleport player to the ground.");
		return
	}
	Minecraft.system.run(() => {
		player.tryTeleport({ x: tempBlock.x, y: tempBlock.y + 1, z: tempBlock.z });
	})
}

 export function copyInv(player,target){
	Minecraft.system.run(()=>{ 
		const targetContainer = getPlayerByName(target).getComponent("minecraft:inventory").container;
		const container = player.getComponent("minecraft:inventory").container;
		for (let i = 0; i < targetContainer.size; i++) {
			const item = targetContainer.getItem(i)
			if (!item) continue;
			container.setItem(i,item);
		}
	})
 }