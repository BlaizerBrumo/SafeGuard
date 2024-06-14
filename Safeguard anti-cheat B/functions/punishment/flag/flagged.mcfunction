title @a[tag=flagged] times 1 1 1
gamemode adventure @a[tag=flagged]
inputpermission set @a[tag=flagged] movement disabled
inputpermission set @a[tag=flagged] camera disabled 
effect @a[tag=flagged] blindness 1000 10 true
title @a[tag=flagged] title §4You have been flagged!§r
title @a[tag=flagged] subtitle §4Contact your admin for appeal.§r
scoreboard players add @a[tag=flagged] flagged 0
execute as @a[tag=flagged] run tp @p[tag=flagged,c=1] ~ 1000 ~
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}