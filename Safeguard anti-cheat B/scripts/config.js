//Edit items in this file if you want customization:

//items flagged by anti-items add an item:
export const bannedItems = ['minecraft:allow', 'minecraft:command_block', 'minecraft:repeating_command_block', 'minecraft:chain_command_block', 'minecraft:border_block', 'minecraft:mob_spawner', 'minecraft:command_block_minecart','minecraft:flowing_lava', 'minecraft:lava', 'minecraft:flowing_water', 'minecraft:water', 'minecraft:lit_redstone_lamp', 'minecraft:pistonarmcollision', 'minecraft:tripwire', 'minecraft:unpowered_comparator', 'minecraft:powered_comparator', 'minecraft:fire', 'minecraft:lit_furnace', 'minecraft:lit_redstone_ore', 'minecraft:unlit_redstone_torch', 'minecraft:portal','minecraft:structure_block', 'minecraft:powered_repeater', 'minecraft:invisiblebedrock','minecraft:bedrock', 'minecraft:wgateway', 'minecraft:end_portal', 'minecraft:end_portal_frame', 'minecraft:structure_void', 'minecraft:chalkboard', 'minecraft:bubble_column', 'minecraft:lit_smoker', 'minecraft:lava_cauldron', 'minecraft:jigsaw', 'minecraft:lit_blast_furnace', 'minecraft:light_block', 'minecraft:stickypistonarmcollision', 'minecraft:soul_fire', 'minecraft:lit_deepslate_redstone_ore', 'minecraft:camera', 'minecraft:deny', 'minecraft:barrier', 'minecraft:glowingobsidian', 'minecraft:glow_stick', 'minecraft:netherreactor', 'minecraft:info_update']

//items flagged by cbe (do not change unless you know what you're doing)
export const cbeItems = ["minecraft:dispenser","minecraft:movingblock", "minecraft:moving_block", "minecraft:beehive", "minecraft:bee_nest", 'minecraft:cod_bucket', 'minecraft:salmon_bucket', 'minecraft:tropical_fish_bucket', 'minecraft:pufferfish_bucket', 'minecraft:axolotl_bucket', 'minecraft:tadpole_bucket'];

//items that were found with these words in the name or lore will get cleared and player will get flagged (you can also include symbols)
//you can also remove all keywords if you don't want custom keyword detection
export const bannedKeyWords = ["horion","32k","nbt","hack","nested","cbe","nuker","illegal"];

//change prefix of chat commands
export const prefix = "!";

