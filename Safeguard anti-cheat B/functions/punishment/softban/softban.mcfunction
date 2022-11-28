#bridge-file-version: #8
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
title @a[tag=softban] times 1 1 1
gamemode adventure @a[tag=softban]
effect @a[tag=softban] slowness 1000 10 true
effect @a[tag=softban] blindness 1000 10 true
title @a[tag=softban] title §4You have been softbanned!§r
scoreboard players add @a[tag=softban] softban 0
execute as @a[tag=softban] run tp @p[tag=softban,c=1] ~ 1000 ~