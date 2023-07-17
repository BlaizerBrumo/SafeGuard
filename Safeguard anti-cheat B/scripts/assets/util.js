import * as Minecraft from "@minecraft/server";

const world = Minecraft.world;

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