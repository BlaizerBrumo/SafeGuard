import { MinecraftEnchantmentTypes, EnchantmentList, world, EntityInventoryComponent , Player, ItemStack, MinecraftItemTypes, Items  } from '@minecraft/server';
world.events.beforeChat.subscribe((data) => {
	const player = data.sender;
	const sender = data.sender.name;
	//change prefix of commands
	const prefix = "?";
//muted
if(player.hasTag('muted') || player.hasTag('Ban')){
	player.tell('§6[§eSafeGuard§6]§r§c You are muted!')
	data.cancel = true;
}
//info command
else if (data.message.startsWith(prefix + "help", 0) == true || data.message.startsWith("!help", 0) == true) {
	if(player.hasTag('admin')){
	player.tell(`§l§aPREFIX:§2 §r${prefix}\n§l§aCOMMANDS:\n§r§eban <player name> §r|| to ban a person || ban Steve\n§einvsee <player name> §r|| see inventory of a player\n§emute <player name> §r|| mute a player || mute Steve\n§eunmute <player name>§r || unmute a player || unmute Steve`);
	data.cancel = true;}
	else{
		player.tell('§6[§eSafeGuard§6]§r§c§l You need admin tag to run this!')
		data.cancel = true;}
}
//ban cmd
	else if (data.message.startsWith(prefix + "ban", 0) == true) {
		if(player.hasTag('admin')){
		var setName = data.message.replace(prefix + "ban ", "");
		setName.replaceAll(/'"'/g, "");
		player.runCommand('tag "' + setName +'" add Ban');
		player.runCommand(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bbanned§l§5 ${setName}! §r"}]}`);
		data.cancel = true;}
		else{
			player.tell('§6[§eSafeGuard§6]§r§c§l You need admin tag to run this!')
			data.cancel = true;}
	}

//mute cmd
else if (data.message.startsWith(prefix + "mute", 0) == true) {
	if(player.hasTag('admin')){
	var setName = data.message.replace(prefix + "mute ", "");
	setName.replaceAll(/'"'/g, "");
	player.runCommand('tag "' + setName +'" add muted');
	player.runCommand(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bmuted§l§5 ${setName}! §r"}]}`);
	data.cancel = true;}
	else{
		player.tell('§6[§eSafeGuard§6]§r§c§l You need admin tag to run this!')
		data.cancel = true;}
}

//unmute cmd
else if (data.message.startsWith(prefix + "unmute", 0) == true) {
	if(player.hasTag('admin')){
	var setName = data.message.replace(prefix + "unmute ", "");
	setName.replaceAll(/'"'/g, "");
	player.runCommand('tag "' + setName +'" remove unmuted');
	player.runCommand(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bunmuted§l§5 ${setName}! §r"}]}`);
	data.cancel = true;}
	else{
		player.tell('§6[§eSafeGuard§6]§r§c§l You need admin tag to run this!')
		data.cancel = true;}
}

//invsee cmd
	else if (data.message.startsWith(prefix + "invsee", 0) == true) {
		if(player.hasTag('admin')){
		data.cancel = true;
		var setName=data.message.replace(prefix + "invsee ", "");
		player.runCommand(`tag @s add invseerequested`)
		player.runCommand(`tag "${setName}" add invsee`);
		player.runCommand(`tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"text":"${sender} §bviewed inventory of§l§5 ${setName}! §r"}]}`);
		return invsee();}
		else{
			player.tell('§6[§eSafeGuard§6]§r§c§l You need admin tag to run this!')
			data.cancel = true;}
	}
//Unknown command
	else if (data.message.startsWith(prefix) == true)
	{
		var splitMsg = data.message.split(prefix);
		 var setMsg = splitMsg[1];
		 var splitCmd = setMsg.split(' ');
		var setCmd = splitCmd[0];
		if (setCmd == "") {
			data.cancel = false;
		}
		else {
			player.runCommand('tellraw @s {"rawtext":[{"text":"§cUnknown command: §f' + setCmd + '"}]}');
			data.cancel = true;
		}
    }

});


world.events.tick.subscribe(() => {
	[...world.getPlayers()].forEach(player => {
		let plrName = player.name;
		let Chars = /[^A-Za-z0-9_\-() ]/;
		let Chars2 = /("|\\)/;
		const inv = player.getComponent("minecraft:inventory").container;
		const bannedItems = ['minecraft:allow', 'minecraft:command_block', 'minecraft:repeating_command_block', 'minecraft:chain_command_block', 'minecraft:border_block', 'minecraft:mob_spawner', 'minecraft:command_block_minecart','minecraft:flowing_lava', 'minecraft:lava', 'minecraft:flowing_water', 'minecraft:water', 'minecraft:lit_redstone_lamp', 'minecraft:pistonarmcollision', 'minecraft:tripwire', 'minecraft:unpowered_comparator', 'minecraft:powered_comparator', 'minecraft:fire', 'minecraft:lit_furnace', 'minecraft:lit_redstone_ore', 'minecraft:unlit_redstone_torch', 'minecraft:portal','minecraft:structure_block', 'minecraft:powered_repeater', 'minecraft:invisiblebedrock','minecraft:bedrock', 'minecraft:end_gateway', 'minecraft:end_portal', 'minecraft:end_portal_frame', 'minecraft:structure_void', 'minecraft:chalkboard', 'minecraft:bubble_column', 'minecraft:lit_smoker', 'minecraft:lava_cauldron', 'minecraft:jigsaw', 'minecraft:lit_blast_furnace', 'minecraft:light_block', 'minecraft:stickypistonarmcollision', 'minecraft:soul_fire', 'minecraft:lit_deepslate_redstone_ore', 'minecraft:camera', 'minecraft:deny', 'minecraft:barrier', 'minecraft:glowingobsidian', 'minecraft:glow_stick', 'minecraft:netherreactor', 'minecraft:info_update', 'minecraft:npc_spawn_egg', 'minecraft:glow_squid_spawn_egg', 'minecraft:axolotl_spawn_egg', 'minecraft:goat_spawn_egg', 'minecraft:strider_spawn_egg', 'minecraft:bee_spawn_egg', 'minecraft:fox_spawn_egg', 'minecraft:wandering_trader_spawn_egg', 'minecraft:panda_spawn_egg', 'minecraft:cod_spawn_egg', 'minecraft:tropical_fish_spawn_egg', 'minecraft:salmon_spawn_egg', 'minecraft:pufferfish_spawn_egg', 'minecraft:cat_spawn_egg', 'minecraft:turtle_spawn_egg', 'minecraft:parrot_spawn_egg', 'minecraft:dolphin_spawn_egg', 'minecraft:llama_spawn_egg', 'minecraft:polar_bear_spawn_egg', 'minecraft:zombie_horse_spawn_egg', 'minecraft:skeleton_horse_spawn_egg', 'minecraft:mule_spawn_egg', 'minecraft:donkey_spawn_egg', 'minecraft:horse_spawn_egg', 'minecraft:ocelot_spawn_egg', 'minecraft:bat_spawn_egg', 'minecraft:rabbit_spawn_egg', 'minecraft:squid_spawn_egg', 'minecraft:mooshroom_spawn_egg', 'minecraft:villager_spawn_egg', 'minecraft:wolf_spawn_egg', 'minecraft:sheep_spawn_egg', 'minecraft:pig_spawn_egg', 'minecraft:cow_spawn_egg', 'minecraft:chicken_spawn_egg', 'minecraft:piglin_brute_spawn_egg', 'minecraft:zoglin_spawn_egg', 'minecraft:hoglin_spawn_egg', 'minecraft:piglin_spawn_egg', 'minecraft:drowned_spawn_egg', 'minecraft:vex_spawn_egg', 'minecraft:evoker_spawn_egg', 'minecraft:ravager_spawn_egg', 'minecraft:phantom_spawn_egg', 'minecraft:vindicator_spawn_egg', 'minecraft:endermite_spawn_egg', 'minecraft:shulker_spawn_egg', 'minecraft:elder_guardian_spawn_egg', 'minecraft:guardian_spawn_egg', 'minecraft:wither_skeleton_spawn_egg', 'minecraft:husk_spawn_egg', 'minecraft:stray_spawn_egg', 'minecraft:witch_spawn_egg', 'minecraft:zombie_villager_spawn_egg', 'minecraft:blaze_spawn_egg', 'minecraft:magma_cube_spawn_egg', 'minecraft:ghast_spawn_egg', 'minecraft:cave_spider_spawn_egg', 'minecraft:silverfish_spawn_egg', 'minecraft:enderman_spawn_egg', 'minecraft:slime_spawn_egg', 'minecraft:spider_spawn_egg', 'minecraft:zombie_pigman_spawn_egg', 'minecraft:skeleton_spawn_egg', 'minecraft:creeper_spawn_egg', 'minecraft:zombie_spawn_egg']
		const cbeItems = ["minecraft:dispenser","minecraft:movingblock", "minecraft:moving_block", "minecraft:beehive", "minecraft:bee_nest", 'minecraft:cod_bucket', 'minecraft:salmon_bucket', 'minecraft:tropical_fish_bucket', 'minecraft:pufferfish_bucket', 'minecraft:axolotl_bucket', 'minecraft:tadpole_bucket']
		if (player.hasTag('Ban')) {
			player.runCommand('kick "' + plrName + '"§6[§eSafeGuard§6]§r §l§4You are banned!');
		}
		//check if gametest if on
		try { player.runCommand('scoreboard players set @a[scores={setup_success=2}] setup_success 3'); } catch { }

		//item checks
		for (let i = 0; i < 36; i++) {
			const item = inv.getItem(i)
			if (!item) continue;
			const itemName = item.nameTag ?? ''
		//illegal name check
			if (itemName.length > 30) {
				if (player.hasTag('admin')) return;
				else {
					inv.setItem(i, new ItemStack(Items.get('coal'), 0))
					world.say('§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Has illegal item: §l§c' +item.typeId.replace('minecraft:','') +'§l§4(chr limit exceeded§c ' + itemName.length + '§4/30)§4!§r')
					player.runCommand('function punishment/warning/ill_warning');
				}
			}
			else if (item.getLore().length > 0) { //items in surivial usually don't have lore in them so it is banned(note to make this a setting)
				if (player.hasTag('admin')) return;
				else {
					inv.setItem(i, new ItemStack(Items.get('coal'), 0))
					world.say('§6[§eSafeGuard§6]§r§c§l ' + plrName + '§r §4Has illegal item: §c§l' +item.typeId.replace('minecraft:','') +'§4§l(lore chr limit exceeded§c ' + item.getLore().length + '§4/0)§4!§r')
					player.runCommand('function punishment/warning/ill_warning');
				}
            }
		//banned item list check
		for (let x = 0; x < cbeItems.length; x++) {
			if (item.typeId == cbeItems[x]) {
				if (player.hasTag('admin')) return;
				else {
					try{
					player.runCommand('execute as @s[scores={anti_cbe_on=0}] run function punishment/warning/ill_warning');
					player.runCommand('execute as @s[scores={anti_cbe_on=0}] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Was detected having banned item: §l§c' + cbeItems[x].replace('minecraft:','') + '§4!§r"}]}')
					inv.setItem(i, new ItemStack(Items.get('coal'), 0));
					player.runCommand('execute as @s[scores={anti_cbe_on=0,auto_mod_on=0}] run kick "' + plrName + '" §l§4kicked by §eSafe§6Guard §4AntiCheat\n For obtaining banned item: §c' + cbeItems[x].replace('minecraft:',''));
					}catch{}
				}
			}
			}

			//cbe item list check
			for (let x = 0; x < bannedItems.length; x++) {
				if (item.typeId == bannedItems[x]) {
					if (player.hasTag('admin')) return;
					else {
						try{
						player.runCommand('execute as @s[scores={item_on=0}] run function punishment/warning/cbe_warning');
						player.runCommand('execute as @s[scores={item_on=0}] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Was detected having banned item: §l§c' + bannedItems[x].replace('minecraft:','') + '§4!§r"}]}');
						inv.setItem(i, new ItemStack(Items.get('coal'), 0))
						player.runCommand('execute as @s[scores={item_on=0,auto_mod_on=0}] run kick "' + plrName + '" §l§4kicked by §eSafe§6Guard §4AntiCheat\n For obtaining banned item: §c' + bannedItems[x].replace('minecraft:',''));
						}catch{}
				}
			}
		}
			//ill enchant check
			let illEnchantStatus = world.scoreboard.getObjective('32k_on').getScore(player.scoreboard);
			const enchantments = item.getComponent("enchantments").enchantments;
			let change = false;
			for (const Enchantment in MinecraftEnchantmentTypes) {
				const ItemEnchantment = enchantments.getEnchantment(
					MinecraftEnchantmentTypes[Enchantment]
				);
				if (!ItemEnchantment) continue;
				const remove = () => {
					enchantments.removeEnchantment(ItemEnchantment.type);
					change = true;
				};
				if (enchantments.slot == 0) {
					if (!enchantments.canAddEnchantment(ItemEnchantment) && illEnchantStatus == 0) {
						player.runCommand('tellraw @a[tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Has illegal item: §l§c' + item.typeId.replace('minecraft:', '') + '§r§4 with unobtainable enchant §l§c' + ItemEnchantment.type.id + '§r§4!§r"}]}');
						remove();
						player.runCommand('function punishment/warning/ill_warning');
					}
				} else {
					if (ItemEnchantment.level > ItemEnchantment.type.maxLevel/*change this to a number for custom max enchant level*/ || ItemEnchantment.level <= 0 && illEnchantStatus == 0) {
						player.runCommand('tellraw @a[tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l ' + plrName + ' §r§4Has illegal item: §l§c' + item.typeId.replace('minecraft:', '') + '§4 with §c' + ItemEnchantment.type.id + '§4 lvl §c' + ItemEnchantment.level + '§4/' + ItemEnchantment.type.maxLevel + '!§r"}]}');
						remove();
						player.runCommand('function punishment/warning/ill_warning');
					}
				}
			}
			if (!change) continue;
			item.getComponent("enchantments").enchantments = enchantments;
			inv.setItem(i, item);
			}




//Namespoof Checker
let namespoofStatus = world.scoreboard.getObjective('nmspf_on').getScore(player.scoreboard);
if (player.nameTag.length > 16 && namespoofStatus == 0) {
	//world.say(`${player.nameTag} §l§4was kicked by §eSafe§6Guard §4AntiCheat For detected §cNameSpoof/A`);
	player.runCommand(`tag @s add kick`);
}
else if(Chars.test(player.nameTag) && namespoofStatus == 0) {
	//world.say(`${player.nameTag} §l§4was kicked by §eSafe§6Guard §4AntiCheat For detected §cNameSpoof/B`);
	player.runCommand(`tag @s add kick`);
}
else if (Chars2.test(player.nameTag) && namespoofStatus == 0) {
	//world.say(`${player.nameTag} §l§4was kicked by §eSafe§6Guard §4AntiCheat For detected §cNameSpoof/B`);
	player.runCommand(`tag @s add kick`);
}


		//Anti crasher
		const { x, y, z } = player.location
		if (Math.abs(x) >= 30000000 || Math.abs(y) >= 30000000 || Math.abs(z) >= 30000000) {
			if (player.hasTag('admin')) player.runCommand('tp @s[scores={nocrash_on=0}] 69 100000 69');
			else {
				player.runCommand('tp @s[scores={nocrash_on=0}] 69 100000 69');
				player.runCommand('execute as @s[scores={nocrash_on=0}] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§4§l §c' + plrName + ' §4Was detected using§c Crasher§4! "}]}');
				player.runCommand(`kick @s[name="${plrName}",scores={nocrash_on=0}] §l§4kicked by §eSafe§6Guard §4AntiCheat\n For §cCrasher Attempt`);
			}
		}
		//death coords
		else if(player.hasTag('death_coord')) {
			player.runCommand(`tellraw @a[tag=death_coord] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §eYou died at ${Math.round(x)}, ${Math.round(y)}, ${Math.round(z)}"}]}`);	
			player.removeTag('death_coord')
		}
})
	});
	function invsee(){
		[...world.getPlayers()].forEach(player => {
		const inv = player.getComponent("minecraft:inventory").container;
		player.runCommand(`tellraw @a[tag=invseerequested] {"rawtext":[{"text":"§6[§eSafeGuard§6]§f ${player.nameTag}'s inventory:\n\n"}]}`);
	for (let i = 0; i < inv.size; i++) {
	const item = inv.getItem(i)
	if (!item) continue;
	const itemName = item.nameTag ?? ''
	const { amount, data } = item;
	const plrName = player.name;
	if(player.hasTag('invsee')){
		if(item.typeId=="undefined") continue;
		player.runCommand(`tellraw @a[tag=invseerequested] {"rawtext":[{"text":"§6[§eSafeGuard§6]§f Slot §e${i}§f: §e${item.typeId.replace('minecraft:','')}§f | §e${item.data}§f x§e${item.amount} §fItem Name: §r${itemName}"}]}`)
		
		}
	}
	player.removeTag('invsee');
	player.runCommand('tag @a remove invseerequested');
			}
		)
	}