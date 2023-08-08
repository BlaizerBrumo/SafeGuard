#Testing if the function responds
scoreboard players add @a setup_success 0
scoreboard players set @a[scores={setup_success=0}] setup_success 1
#gametest features
scoreboard players set @a[scores={setup_success=0..}] safeguard:gametest_on 0
scoreboard players set @a[scores={setup_success=1,safeguard:gametest_on=0}] setup_success 2
#Scoreboards
scoreboard players add @a end_lock 0
scoreboard players add @a barrel_lock 0
scoreboard players add @a shulk_lock 0
scoreboard players add @a Shulkbarrel_ban 0
scoreboard players add @a auto_mod_on 0
scoreboard players add @a death_effect 0
scoreboard players add @a end_yes 0
scoreboard players add @a shulkbarrel_yes 0
scoreboard players add @a auto_mod_off 0
scoreboard players add @a death_effect_off 0
scoreboard players add @a death_coord_off 0
scoreboard players add @a death_coord_on 0
scoreboard players add @a gmc_on 0
scoreboard players add @a gmc_off 0
scoreboard players add @a grief_on 0
scoreboard players add @a grief_off 0
scoreboard players add @a item_on 0
scoreboard players add @a item_off 0
scoreboard players add @a welcome_on 0
scoreboard players add @a welcome_off 0
scoreboard players add @a warning 0
scoreboard players add @a ill_warning 0
scoreboard players add @a cbe_warning 0
scoreboard players add @a gmc_warning 0
scoreboard players add @a grief_warning 0
#Welcomer toggle
execute as @a[scores={welcome_off=0}, tag=admin] run scoreboard players set @a[tag=admin] welcome 0
execute as @a[scores={welcome_on=0}, tag=admin] run scoreboard players set @a[tag=admin] welcome 1
#admin things(end lock)
execute as @a[scores={end_lock=0}, tag=admin] run scoreboard players set @a[tag=admin] endnether_toggle 1
execute as @a[scores={end_yes=0}, tag=admin] run scoreboard players set @a[tag=admin] endnether_toggle 0
#Shulker and barrel(still admin)
execute as @a[scores={shulkbarrel_yes=0}, tag=admin] run scoreboard players set @a[tag=admin] shulkBarrel_lock 0
execute as @a[scores={barrel_lock=0}, tag=admin] run scoreboard players set @a[tag=admin] shulkBarrel_lock 1
execute as @a[scores={shulk_lock=0}, tag=admin] run scoreboard players set @a[tag=admin] shulkBarrel_lock 2
execute as @a[scores={Shulkbarrel_ban=0}, tag=admin] run scoreboard players set @a[tag=admin] shulkBarrel_lock 3
#Auto mod admin thing
execute as @a[scores={auto_mod_off=0}, tag=admin] run scoreboard players set @a[tag=admin] auto_mod_toggle 0
execute as @a[scores={auto_mod_on=0}, tag=admin] run scoreboard players set @a[tag=admin] auto_mod_toggle 1
#Anti GMC admin thing
execute as @a[scores={gmc_off=0}, tag=admin] run scoreboard players set @a[tag=admin] gmc_toggle 0
execute as @a[scores={gmc_on=0}, tag=admin] run scoreboard players set @a[tag=admin] gmc_toggle 1
#Anti Grief admin thing
execute as @a[scores={grief_off=0}, tag=admin] run scoreboard players set @a[tag=admin] grief_toggle 0
execute as @a[scores={grief_on=0}, tag=admin] run scoreboard players set @a[tag=admin] grief_toggle 1
#Anti item admin thing
execute as @a[scores={item_off=0}, tag=admin] run scoreboard players set @a[tag=admin] item_toggle 0
execute as @a[scores={item_on=0}, tag=admin] run scoreboard players set @a[tag=admin] item_toggle 1
#Death coords admin thing
execute as @a[scores={death_coord_off=0}, tag=admin] run scoreboard players set @a[tag=admin] death_coord 0
execute as @a[scores={death_coord_on=0}, tag=admin] run scoreboard players set @a[tag=admin] death_coord 1
#Death effect (still admin thing :)
execute as @a[scores={death_effect_off=0}, tag=admin] run scoreboard players set @a[tag=admin] death_toggle 0
execute as @a[scores={death_effect=0}, tag=admin] run scoreboard players set @a[tag=admin] death_toggle 1
#Function execute
tag @a[tag=ban1] add Ban
execute as @a[scores={death_effect=0}] run execute as @e[type=lightning_bolt] run fill ~-2~-2~-2 ~2~2~2 air 0 replace fire
#End lock
execute at @a[scores={end_lock=0}] if block ~~-2~ end_portal 0 run tp @p ~-1~1~
execute at @a[scores={end_lock=0}] if block ~~-0.1~ end_portal 0 run tp @p ~-1~1~
execute at @a[scores={end_lock=0}] if block ~~-0.01~ end_portal 0 run tp @p ~-1~1~
execute at @a[scores={end_lock=0}] if block ~~-1~ end_portal 0 run tellraw @p {"rawtext":[{"text":"§6[§eSafeGuard§6]§r The end was locked by an admin! Entering it will §4instant kill you§f."}]}
execute as @a[scores={end_lock=0}] run kill @e[type=eye_of_ender_signal]
#Shulker box/barrel ban(for anti kit)
clear @a[scores={barrel_lock=0}] barrel
clear @a[scores={shulk_lock=0}] shulker_box
clear @a[scores={shulk_lock=0}] undyed_shulker_box
clear @a[scores={Shulkbarrel_ban=0}] barrel
clear @a[scores={Shulkbarrel_ban=0}] shulker_box
clear @a[scores={Shulkbarrel_ban=0}] undyed_shulker_box
#Telling player "you are vanished"
title @a[scores={vanish=1},tag=admin] actionbar §l§7You are vanished.§r
playanimation @a[scores={vanish=1},tag=admin] animation.creeper.swelling I 99
#anti lag
scoreboard players add @a[scores={anti_lag=1..199}] anti_lag 1
execute as @a[scores={anti_lag=100}] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 5 seconds...§r"}]}
execute as @a[scores={anti_lag=120}] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 4 seconds...§r"}]}
execute as @a[scores={anti_lag=140}] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 3 seconds...§r"}]}
execute as @a[scores={anti_lag=160}] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 2 seconds...§r"}]}
execute as @a[scores={anti_lag=180}] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 1 seconds...§r"}]}
execute as @a[scores={anti_lag=200}] run tp @e[type=arrow] ~ -1000 ~
execute as @a[scores={anti_lag=200}] run tp @e[type=polar_bear] ~ -1000 ~ 
execute as @a[scores={anti_lag=200}] run tp @e[type=minecraft:area_effect_cloud] ~ -1000 ~
execute as @a[scores={anti_lag=200}] run tp @e[type=minecraft:fox] ~ -1000 ~
execute as @a[scores={anti_lag=200}] run tp @e[type=minecraft:vex] ~ -1000 ~
execute as @a[scores={anti_lag=200}] run kill @e[type=item]
execute as @a[scores={anti_lag=200}] run tp @e[family=monster] ~ -1000 ~
execute as @a[scores={anti_lag=200}] run tp @e[type=xp_orb] ~ -1000 ~
execute as @a[scores={anti_lag=200}] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Lag cleared!§r"}]}
execute as @a[scores={anti_lag=200..}] run gamerule domobloot true
execute as @a[scores={anti_lag=200..}] run scoreboard players reset @a anti_lag
#Warning Check
scoreboard objectives add warn_check dummy
execute as @a run scoreboard players add @s warn_check 0
scoreboard players add @a[tag=warn_check] warn_check 1
scoreboard players add @a[scores={warn_check=1..}] warn_check 1
execute as @a[scores={warn_check=10..6000},tag=warn_check] run tag @s add warn_fast
scoreboard players reset @a[scores={warn_check=6001..}] warn_check
tag @a[tag=warn_check] remove warn_check
#warning check2
execute as @a[tag=warn_fast] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§c "},{"selector": "@s"},{"text":" §4is reaching warnings too fast and was softbanned!§r"}]}
execute as @a[tag=warn_fast] run tag @s add softban_five
execute as @a[tag=warn_fast] run tag @s add warning
execute as @a[tag=warn_fast] run scoreboard players reset @s warn_check
execute as @a[tag=warn_fast] run tag @s remove warn_fast
#set gamemode tags
tag @a[m=creative] add gamemode:creative
tag @a[m=!creative] remove gamemode:creative


#████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
#█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░██░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░░░███░░░░░░░░░░░░███
#█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀▄▀░░███░░▄▀▄▀▄▀▄▀░░░░█
#█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░▄▀░░███░░▄▀░░░░▄▀▄▀░░█
#█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░█████████░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░████░░▄▀░░███░░▄▀░░██░░▄▀░░█
#█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░░░░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░▄▀░░███░░▄▀░░██░░▄▀░░█
#█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░░░░░█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀▄▀░░███░░▄▀░░██░░▄▀░░█
#█░░░░░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░░░███░░▄▀░░██░░▄▀░░█
#█████████░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█████░░▄▀░░██░░▄▀░░█
#█░░░░░░░░░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░░░░░█░░▄▀░░░░▄▀▄▀░░█
#█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀░░░░█
#█░░░░░░░░░░░░░░█░░░░░░██░░░░░░█░░░░░░█████████░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░██░░░░░░█░░░░░░██░░░░░░░░░░█░░░░░░░░░░░░███
#████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████