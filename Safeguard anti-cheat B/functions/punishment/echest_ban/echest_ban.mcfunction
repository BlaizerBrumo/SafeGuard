#bridge-file-version: #2
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
title @a[tag=echest_ban] times 1 1 1
title @a[tag=echest_ban] actionbar §l§4You are echest banned.
execute @a[tag=echest_ban] ~~~ fill ~7 ~7 ~7 ~-7 ~-7 ~-7 air 0 replace ender_chest
clear @a[tag=echest_ban] ender_chest