#bridge-file-version: #10
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
title @a[tag=freeze] times 1 1 1
execute as @a[tag=freeze] run tp @s[tag=freeze] ~ ~ ~ facing @s
effect @a[tag=freeze] slowness 100 100 true
title @a[tag=freeze] actionbar §b§lYou are freezed.§r