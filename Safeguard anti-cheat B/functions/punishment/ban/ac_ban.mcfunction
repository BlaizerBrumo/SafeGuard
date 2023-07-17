#bridge-file-version: #28
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
tag @a[tag=ban,tag=!admin] add Ban
scoreboard players add @a[tag=ac_ban,tag=!admin] ac_banned 1
tag @a[scores={ac_banned=100..},tag=!admin] add Ban
execute as @a[scores={ac_banned=99},tag=!admin] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":"§r was banned by §7SafeGuard§r for reaching a warning limit!"}]}
execute as @a[scores={ac_banned=20},tag=!admin] run function assets/boom
execute as @a[scores={ac_banned=0..},tag=!admin] run tp @s ~ 1000 ~
execute as @a[scores={ac_banned=0..},tag=!admin] run title @s times 1 1 1
execute as @a[scores={ac_banned=0..},tag=!admin] run title @s title §l§4Warning Limit Reached!§r
execute as @a[scores={ac_banned=0..},tag=!admin] run title @s subtitle §lPermanent ban imminent!
tag @a[tag=admin,tag=ac_ban] remove ac_ban