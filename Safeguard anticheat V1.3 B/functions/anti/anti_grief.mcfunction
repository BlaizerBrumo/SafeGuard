#bridge-file-version: #27
#gamerule
execute @a[scores={grief_on=0}] ~~~ gamerule tntexplodes false
execute @a[scores={grief_on=0}] ~~~ gamerule respawnblocksexplode false
#detect
execute @a[scores={grief_on=0}] ~~~ execute @e[type=tnt , tag=!admin] ~~~tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@p[tag=!admin]"},{"text":" §r§4Was detected summoning a §l§cTNT!§r"}]}
#clear inventory
execute @a[scores={grief_on=0}] ~~~ clear @a[tag=!admin] tnt 0
execute @a[scores={grief_on=0}] ~~~ clear @a[tag=!admin] tnt_minecart 0
execute @a[scores={grief_on=0}] ~~~ clear @a[tag=!admin] end_crystal 0
#Kill tnt
execute @a[scores={grief_on=0}] ~~~ execute @a ~ ~ ~ kill @e[type=tnt]
execute @a[scores={grief_on=0}] ~~~ execute @a ~ ~ ~ kill @e[type=tnt_minecart]
#Replace tnt and other explosive blocks as a security measure
execute @a[scores={grief_on=0}] ~~~ execute @a[tag=!admin] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace tnt
execute @a[scores={grief_on=0}] ~~~ execute @a[tag=!admin] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace fire