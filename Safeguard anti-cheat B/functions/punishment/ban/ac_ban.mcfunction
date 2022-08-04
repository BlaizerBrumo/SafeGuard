#bridge-file-version: #23
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
scoreboard players add @a[tag=ac_ban,tag=!admin] ac_banned 1
tag @a[scores={ac_banned=90}] add stats
tag @a[scores={ac_banned=100..}] add Ban
execute @a[scores={ac_banned=99}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":"§r was banned by §7SafeGuard§r for reaching a warning limit!"}]}
execute @a[scores={ac_banned=1}] ~~~ tag @s remove admin
execute @a[tag=Ban] ~~~ tag @s remove admin
execute @a[scores={ac_banned=20}] ~~~ function assets/boom
execute @a[scores={ac_banned=0..}] ~~~ tp @s ~ 1000 ~
execute @a[scores={ac_banned=0..}] ~~~ title @s times 1 1 1
execute @a[scores={ac_banned=0..}] ~~~ title @s title §l§4Warning Limit Reached!§r
execute @a[scores={ac_banned=0..}] ~~~ title @s subtitle §lPermanent ban imminent!