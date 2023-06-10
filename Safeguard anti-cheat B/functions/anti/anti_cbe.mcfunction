#bridge-file-version: #97
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
# Stops players from using CBE(command block exploit)
#Detect and warn
execute as @a[scores={anti_cbe_on=0}] run execute as @e[type=command_block_minecart,tag=!admin] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@a[r=10,tag=!admin]"},{"text":" §r§4Were detected summoning a §l§ccommand block minecart!§r"}]}
execute as @a[scores={anti_cbe_on=0}] run execute as @e[type=npc,tag=!admin,tag=!friend] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@a[r=10,tag=!admin]"},{"text":" §r§4Were detected summoning a §l§cNPC!§r"}]}
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run kill @e[type=item,name="tile.movingblock.name"]
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run kill @e[type=item,name="§g§lMovingBlock BeeNest Command"]
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run kill @e[type=item,name="§g§lBeeNest Command"]
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run kill @e[type=item,name="§g§lBeehive Command"]
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run kill @e[type=item,name="§g§lSpoofed BeeNest Command"]
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run kill @e[type=item,name="§g§lInvisible Beehive Command"]
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run kill @e[type=item,name="§g§lBeehive NPC Command"]
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run kill @e[type=item,name="§g§lBee Nest NPC Command"]
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run kill @e[type=item,name="§g§lMovingBlock BeeNest NPC Command"]
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run kill @e[type=item,name="§g§lInvisible Beehive NPC Command"]
#Warning
execute as @a[scores={anti_cbe_on=0}] run execute as @e[type=command_block_minecart,tag=!admin] run execute as @a[r=10,tag=!admin] run function punishment/warning/cbe_warning
execute as @a[scores={anti_cbe_on=0}] run execute as @e[type=npc,tag=!admin,tag=!friend] run execute as @a[r=10,tag=!admin] run function punishment/warning/cbe_warning
#Killing entities
execute as @a[scores={anti_cbe_on=0}] run kill @e[type=command_block_minecart]
execute as @a[scores={anti_cbe_on=0}] run kill @e[type=npc,tag=!friend]
execute as @a[scores={anti_cbe_on=0}] run kill @e[type=bee]
execute as @a[scores={anti_cbe_on=0}] run kill @e[type=leash_knot]
execute as @a[scores={anti_cbe_on=0}] run kill @e[type=armor_stand]
#replacing
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace bee_nest
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace beehive
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace dispenser
execute as @a[scores={anti_cbe_on=0}] run execute as @a[tag=!admin] run fill ~10 ~3 ~10 ~-10 ~-3 ~-10 air 0 replace unknown -1