#bridge-file-version: #22
execute as @a[scores={warning=3..},tag=!admin] run tag @s add ac_ban
#Warning
execute as @a[tag=warning,tag=!admin] run scoreboard players add @s warning 1
execute as @a[tag=warning,tag=!admin] run tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"text": "§4You were warned!§r"}]}
execute as @a[tag=warning,scores={warning=2},tag=!admin] run tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"text": "§4Next warning will result in a permanent ban!§r"}]}
execute as @a[tag=warning,tag=!admin] run tag @s remove warning
#Warning Reset
execute as @a[tag=warning_reset] run scoreboard players reset @s warning
execute as @a[tag=warning_reset] run scoreboard players reset @s ill_warning
execute as @a[tag=warning_reset] run scoreboard players reset @s cbe_warning
execute as @a[tag=warning_reset] run scoreboard players reset @s gmc_warning
execute as @a[tag=warning_reset] run scoreboard players reset @s grief_warning
execute as @a[tag=warning_reset] run scoreboard players reset @s safeguard:cps_check
execute as @a[tag=warning_reset] run scoreboard players reset @s safeguard:fly_check
execute as @a[tag=warning_reset] run scoreboard players reset @s safeguard:nuker_check
execute as @a[tag=warning_reset] run scoreboard players reset @s safeguard:killaura_check
execute as @a[tag=warning_reset] run tellraw @s {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§l§c "},{"text": "§aWarnings reset by admin!§r"}]}
tag @a[tag=warning_reset] remove warning_reset
#other warnings
execute as @a[scores={safeguard:cps_check=5,auto_mod_on=0}] run tag @s add softban_five
execute as @a[scores={safeguard:cps_check=5,auto_mod_on=0}] run scoreboard players add @s safeguard:cps_check 1

execute as @a[scores={safeguard:fly_check=5,auto_mod_on=0}] run tag @s add softban_five
execute as @a[scores={safeguard:fly_check=5,auto_mod_on=0}] run scoreboard players add @s safeguard:fly_check 1

execute as @a[scores={safeguard:nuker_check=5,auto_mod_on=0}] run tag @s add softban_five
execute as @a[scores={safeguard:nuker_check=5,auto_mod_on=0}] run scoreboard players add @s safeguard:nuker_check 1

execute as @a[scores={safeguard:killaura_check=5,auto_mod_on=0}] run tag @s add softban_five
execute as @a[scores={safeguard:killaura_check=5,auto_mod_on=0}] run scoreboard players add @s safeguard:killaura_check 1