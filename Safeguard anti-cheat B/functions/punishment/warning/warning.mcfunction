#bridge-file-version: #22
execute as @a[scores={warning=3..}] run tag @s add ac_ban
#Warning
execute as @a[tag=warning] run scoreboard players add @s warning 1
execute as @a[tag=warning] run tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"text": "§4You were warned!§r"}]}
execute as @a[tag=warning,scores={warning=2}] run tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"text": "§4Next warning will result in a permanent ban!§r"}]}
execute as @a[tag=warning] run tag @s remove warning
#Warning Reset
execute as @a[tag=warning_reset] run scoreboard players reset @s warning
execute as @a[tag=warning_reset] run scoreboard players reset @s ill_warning
execute as @a[tag=warning_reset] run scoreboard players reset @s cbe_warning
execute as @a[tag=warning_reset] run scoreboard players reset @s gmc_warning
execute as @a[tag=warning_reset] run scoreboard players reset @s grief_warning
execute as @a[tag=warning_reset] run tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"text": "§aWarnings reset by admin!§r"}]}
tag @a[tag=warning_reset] remove warning_reset