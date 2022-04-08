#bridge-file-version: #52
# Stops players from using CBE(command block exploit)
#Detect and warn
execute @a[scores={anti_cbe_on=0}] ~~~ execute @e[type=command_block_minecart , tag=!admin] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@a[r=10,tag=!admin]"},{"text":" §r§4Was detected summoning a §l§ccommand block minecart!§r"}]}
execute @a[scores={anti_cbe_on=0}] ~~~ execute @e[type=npc , tag=!admin , tag=!friend] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@a[r=10,tag=!admin]"},{"text":" §r§4Was detected summoning a §l§cNPC!§r"}]}
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[type=item,name="tile.movingblock.name"]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[type=item,name="§g§lMovingBlock BeeNest Command"]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[type=item,name="§g§lBeeNest Command"]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[type=item,name="§g§lBeehive Command"]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[type=item,name="§g§lSpoofed BeeNest Command"]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[type=item,name="§g§lInvisible Beehive Command"]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[type=item,name="§g§lBeehive NPC Command"]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[type=item,name="§g§lBee Nest NPC Command"]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[type=item,name="§g§lMovingBlock BeeNest NPC Command"]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[type=item,name="§g§lInvisible Beehive NPC Command"]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~~~ kill @e[r=10,type=moving_block]
execute @a[scores={anti_cbe_on=0}] ~~~ execute @e[type=moving_block] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@a[r=10,tag=!admin]"},{"text":" §r§4Was detected placing a §l§cMoving Block!§r"}]}
#Flag
execute @a[scores={anti_cbe_on=0}] ~~~ execute @e[type=command_block_minecart , tag=!admin] ~~~ execute @p[tag=!admin,scores={auto_mod_on=0}] ~~~ tag @s[tag=!admin] add flagged
execute @a[scores={anti_cbe_on=0}] ~~~ execute @e[type=npc , tag=!admin, tag=!friend] ~~~ execute @p[tag=!admin,scores={auto_mod_on=0}] ~~~ tag @s[tag=!admin] add flagged
#Inventory wipe
execute @a[scores={anti_cbe_on=0}] ~~~ clear @a[tag=!admin] bee_nest 0
execute @a[scores={anti_cbe_on=0}] ~~~ clear @a[tag=!admin] beehive 0
#Killing entities
execute @a[scores={anti_cbe_on=0}] ~~~ kill @e[type=command_block_minecart]
execute @a[scores={anti_cbe_on=0}] ~~~ kill @e[type=npc,tag=!friend]
execute @a[scores={anti_cbe_on=0}] ~~~ kill @e[type=bee]
execute @a[scores={anti_cbe_on=0}] ~~~ kill @e[type=leash_knot]
#replacing
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace bee_nest
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace beehive
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~ ~ ~ fill ~10 ~3 ~10 ~-10 ~-3 ~-10 air 0 replace unknown -1