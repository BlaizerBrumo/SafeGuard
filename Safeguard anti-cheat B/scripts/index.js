import * as Minecraft from '@minecraft/server';
import * as config from "./config.js";

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
	const args = message.substring(config.prefix.length).split(" ");
	const sender = data.sender.name;

	if(player.hasTag('muted') || player.hasTag('Ban')){
		player.sendMessage('§6[§eSafeGuard§6]§r§c You are muted!')
		data.cancel = true;
		return;
	}
	if(!player.hasTag("admin")){
		player.sendMessage('§6[§eSafeGuard§6]§r§c You need admin tag to run this!')
		data.cancel = true;
		return;
	}
	switch(args[0]){
		case "help":
			player.sendMessage(`§l§aPREFIX:§2 §r${config.prefix}\n§l§aCOMMANDS:\n§r§eban <player name> §r|| to ban a person || ban Steve\n§einvsee <player name> §r|| see inventory of a player\n§emute <player name> §r|| mute a player || mute Steve\n§eunmute <player name>§r || unmute a player || unmute Steve`);
			data.cancel = true;
		break;

		case "invsee":
			data.cancel = true;
			var setName = data.message.replace(config.prefix + "invsee ", "");
			setName = setName.replaceAll('"', "").replaceAll('@', "");
			if(getPlayerByName(setName).hasTag("admin")) return player.sendMessage(`§6[§eSafeGuard§6]§f Can't view inventory of §e${setName}§f, they're an admin.`);
			player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bviewed inventory of§l§5 ${setName.replace("@","")}! §r"}]}`);
			invsee(sender, setName);
		break;

		case "ban":
			var setName = data.message.replace(config.prefix + "ban ", "");
			setName = setName.replaceAll('"', "").replaceAll('@', "");
			data.cancel = true;
			if(!canFindPlayer(setName)) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);
			if(getPlayerByName(setName).hasTag("admin")) return player.sendMessage(`§6[§eSafeGuard§6]§f Can't ban §e${setName}§f, they're an admin.`);
			player.runCommandAsync('tag "' + setName +'" add Ban');
			player.sendMessage(`§6[§eSafeGuard§6]§f Banned §e${setName}`);
			player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bbanned§l§5 ${setName}! §r"}]}`);
		break;

		case "mute":
			var setName = data.message.replace(config.prefix + "mute ", "");
			setName = setName.replaceAll('"', "").replaceAll('@', "");
			data.cancel = true;
			if(!canFindPlayer(setName)) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);
			if(getPlayerByName(setName).hasTag("admin")) return player.sendMessage(`§6[§eSafeGuard§6]§f Can't mute §e${setName}§f, they're an admin.`);
			player.runCommandAsync('tag "' + setName +'" add muted');
			player.sendMessage(`§6[§eSafeGuard§6]§f Muted §e${setName}`);
			player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bmuted§l§5 ${setName}! §r"}]}`);
		break;

		case "unmute":
			var setName = data.message.replace(config.prefix + "unmute ", "");
			setName = setName.replaceAll('"', "").replaceAll('@', "");
			data.cancel = true;
			if(!canFindPlayer(setName)) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f was not found`);
			if(!getPlayerByName(setName).hasTag("muted")) return player.sendMessage(`§6[§eSafeGuard§6]§f Player §e${setName}§f is not muted.`);
			player.runCommandAsync('tag "' + setName +'" remove muted');
			player.sendMessage(`§6[§eSafeGuard§6]§f Unmuted §e${setName}`);
			player.runCommandAsync(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bunmuted§l§5 ${setName}! §r"}]}`);
		break;

		default:
			if(!message.startsWith(config.prefix)) return;
			var splitMsg = data.message.split(config.prefix);
			var setMsg = splitMsg[1];
			var splitCmd = setMsg.split(' ');
			var setCmd = splitCmd[0];
			if (setCmd == "") {
				data.cancel = false;
			}
			else {
				player.runCommandAsync('tellraw @s {"rawtext":[{"text":"§cUnknown command: §f' + setCmd + '"}]}');
				data.cancel = true;
			}
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
	if (player.hasTag('Ban')) {
		(async() => {
			//wait 2 seconds before kicking for chance to unban
			await new Promise(resolve => setTimeout(resolve, 2000));
			player.runCommandAsync('kick "' + plrName + '"§6[§eSafeGuard§6]§r §l§4You are banned!');
		})();
	}
	//check if gametest if on
	try { player.runCommandAsync('scoreboard players set @a[scores={setup_success=2}] setup_success 3'); } catch { }

	//end lock
	if(player.dimension.id == "minecraft:the_end" && world.scoreboard.getObjective('end_lock') !== undefined){
		player.kill();
	}

})
});


function invsee(sender, target) {
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
		senderPlayer.sendMessage(`§6[§eSafeGuard§6]§f Slot §e${i}§f: §e${item.typeId.replace('minecraft:','')}§f x§e${item.amount} §fItem Name: §r${itemName}`)
	}
}
function canFindPlayer(player){
	const target = [...world.getPlayers({
		name: player
	})][0]
	if(target == undefined) return false
	else return true;
}
function getPlayerByName(name){
	const player = [...world.getPlayers({
		name: name
	})][0]
	return player;
}



world.afterEvents.entityHurt.subscribe((data) => {
	const player = data.hurtEntity;
	
		if(player.typeId !== "minecraft:player") return;
	
			const hp = player.getComponent("health").current;
			
				if(hp <= 0) {
					player.runCommandAsync("function assets/death_effect");
					
					//death coords
					let deathCoordStatus = (world.scoreboard.getObjective('death_coord_on') === undefined) ? false : true;
					const { x, y, z } = player.location;
					if(deathCoordStatus){
						player.sendMessage(`§6[§eSafeGuard§6]§r §eYou died at ${Math.round(x)}, ${Math.round(y)}, ${Math.round(z)} (in ${player.dimension.id.replace("minecraft:","")})`);
					}
				}
	});


	Minecraft.system.events.beforeWatchdogTerminate.subscribe((beforeWatchdogTerminate) => {
		beforeWatchdogTerminate.cancel = true;
	
		world.sendMessage(`§6[§eSafeGuard§6] §f${new Date()} |§4 A Watchdog Exception has been detected and has been cancelled successfully. Reason: §c${beforeWatchdogTerminate.terminateReason}`);
	});