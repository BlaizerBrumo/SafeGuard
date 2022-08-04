#bridge-file-version: #82
# Stops players from using CBE(command block exploit)
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
#Detect and warn
execute @a[scores={anti_cbe_on=0}] ~~~ execute @e[type=command_block_minecart , tag=!admin] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@a[r=10,tag=!admin]"},{"text":" §r§4Were detected summoning a §l§ccommand block minecart!§r"}]}
execute @a[scores={anti_cbe_on=0}] ~~~ execute @e[type=npc , tag=!admin , tag=!friend] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@a[r=10,tag=!admin]"},{"text":" §r§4Were detected summoning a §l§cNPC!§r"}]}
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
#Warning
execute @a[scores={anti_cbe_on=0}] ~~~ execute @e[type=command_block_minecart , tag=!admin] ~~~ execute @a[r=10,tag=!admin] ~~~ function punishment/warning/cbe_warning
execute @a[scores={anti_cbe_on=0}] ~~~ execute @e[type=npc , tag=!admin, tag=!friend] ~~~ execute @a[r=10,tag=!admin] ~~~ function punishment/warning/cbe_warning
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin,hasitem={item=beehive}] ~~~ function punishment/warning/cbe_warning
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin,hasitem={item=bee_nest}] ~~~ function punishment/warning/cbe_warning
#Killing entities
execute @a[scores={anti_cbe_on=0}] ~~~ kill @e[type=command_block_minecart]
execute @a[scores={anti_cbe_on=0}] ~~~ kill @e[type=npc,tag=!friend]
execute @a[scores={anti_cbe_on=0}] ~~~ kill @e[type=bee]
execute @a[scores={anti_cbe_on=0}] ~~~ kill @e[type=leash_knot]
execute @a[scores={anti_cbe_on=0}] ~~~ kill @e[type=armor_stand]
#replacing
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace bee_nest
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace beehive
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin] ~ ~ ~ fill ~10 ~3 ~10 ~-10 ~-3 ~-10 air 0 replace unknown -1
#Clearing and alerting
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin,hasitem={item=bee_nest}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cBEE NEST!§r"}]}
execute @a[scores={anti_cbe_on=0}] ~~~ execute @a[tag=!admin,hasitem={item=beehive}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having illegal item: §l§cBEEHIVE!§r"}]}
execute @a[scores={anti_cbe_on=0}] ~~~ clear @a[tag=!admin] bee_nest
execute @a[scores={anti_cbe_on=0}] ~~~ clear @a[tag=!admin] beehive