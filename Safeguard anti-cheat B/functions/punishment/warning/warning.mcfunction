#bridge-file-version: #19
execute @a[scores={cbe_warning=6}] ~~~ tag @s add ac_ban
execute @a[scores={gmc_warning=4}] ~~~ tag @s add ac_ban
execute @a[scores={grief_warning=4}] ~~~ tag @s add ac_ban
execute @a[scores={ill_warning=6}] ~~~ tag @s add ac_ban
execute @a[scores={warning=3}] ~~~ tag @s add ac_ban
#Warning
execute @a[tag=warning] ~~~ scoreboard players add @s warning 1
execute @a[tag=warning] ~~~ tag @s add ac_stats
execute @a[tag=warning] ~~~ tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"text": "§4You were warned!"}]}
execute @a[tag=warning,scores={warning=2}] ~~~ tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"text": "§4Next warning will result in a permanent ban!"}]}
execute @a[tag=warning] ~~~ tag @s remove warning
#Warning Reset
execute @a[tag=warning_reset] ~~~ scoreboard players reset @s warning
execute @a[tag=warning_reset] ~~~ scoreboard players reset @s ill_warning
execute @a[tag=warning_reset] ~~~ scoreboard players reset @s cbe_warning
execute @a[tag=warning_reset] ~~~ scoreboard players reset @s gmc_warning
execute @a[tag=warning_reset] ~~~ scoreboard players reset @s grief_warning
execute @a[tag=warning_reset] ~~~ tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"text": "§aWarnings reset by admin!"}]}
tag @a[tag=warning_reset] remove warning_reset