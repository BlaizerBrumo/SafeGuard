#bridge-file-version: #1
tag @s add warn_check
scoreboard players add @s cbe_warning 1
function assets/boom
execute @s[scores={auto_mod_on=0}] ~~~ clear @s
tag @s add ac_stats
function assets/player_stats
execute @s[scores={auto_mod_on=0}] ~~~ tellraw @a {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"selector": "@s"},{"text": "§4's was warned and inventory was cleared!"}]}
execute @s[scores={auto_mod_off=0}] ~~~ tellraw @a {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"selector": "@s"},{"text": "§4's was warned!"}]}
execute @s[scores={cbe_warning=5}] ~~~ tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"text": "§4Next warning will result in a permanent ban!"}]}