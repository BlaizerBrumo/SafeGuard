tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
#gamerule
execute as @a[scores={grief_on=0}] run gamerule tntexplodes false
execute as @a[scores={grief_on=0}] run gamerule respawnblocksexplode false
#detect
execute as @a[scores={grief_on=0}] run execute as @e[type=tnt,tag=!admin] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@p[tag=!admin]"},{"text":" §r§4Was detected summoning a §l§cTNT!§r"}]}
execute as @a[scores={grief_on=0}] run execute as @e[type=tnt,tag=!admin] run execute as @p run function punishment/warning/grief_warning
#clear inventory
execute as @a[scores={grief_on=0}] run clear @a[tag=!admin] tnt 0
execute as @a[scores={grief_on=0}] run clear @a[tag=!admin] tnt_minecart 0
execute as @a[scores={grief_on=0}] run clear @a[tag=!admin] end_crystal 0
execute as @a[scores={grief_on=0}] run clear @a[tag=!admin] respawn_anchor 0
#Kill tnt
execute as @a[scores={grief_on=0}] run execute as @a run kill @e[type=tnt]
execute as @a[scores={grief_on=0}] run execute as @a run kill @e[type=tnt_minecart]
#Replace tnt and other explosive blocks as a security measure
execute as @a[scores={grief_on=0}] run execute as @a[tag=!admin] run fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace tnt
execute as @a[scores={grief_on=0}] run execute as @a[tag=!admin] run fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace fire