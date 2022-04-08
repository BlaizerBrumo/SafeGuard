#bridge-file-version: #75
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
scoreboard players add @a anti_cbe_off 0
scoreboard players add @a anti_cbe_on 0
scoreboard players add @a death_coord_off 0
scoreboard players add @a death_coord_on 0
scoreboard players add @a gmc_on 0
scoreboard players add @a gmc_off 0
scoreboard players add @a grief_on 0
scoreboard players add @a grief_off 0
scoreboard players add @a item_on 0
scoreboard players add @a item_off 0
#admin things(end lock)
execute @a[scores={end_lock=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] endnether_toggle 1
execute @a[scores={end_yes=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] endnether_toggle 0
#anti cbe(admin stuff)
execute @a[scores={anti_cbe_off=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] anti_cbe_toggle 1
execute @a[scores={anti_cbe_on=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] anti_cbe_toggle 0
#Shulker and barrel(still admin)
execute @a[scores={shulkbarrel_yes=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] shulkBarrel_lock 0
execute @a[scores={barrel_lock=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] shulkBarrel_lock 1
execute @a[scores={shulk_lock=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] shulkBarrel_lock 2
execute @a[scores={Shulkbarrel_ban=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] shulkBarrel_lock 3
#Auto mod admin thing
execute @a[scores={auto_mod_off=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] auto_mod_toggle 0
execute @a[scores={auto_mod_on=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] auto_mod_toggle 1
#Anti GMC admin thing
execute @a[scores={gmc_off=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] gmc_toggle 0
execute @a[scores={gmc_on=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] gmc_toggle 1
#Anti Grief admin thing
execute @a[scores={grief_off=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] grief_toggle 0
execute @a[scores={grief_on=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] grief_toggle 1
#Anti Grief admin thing
execute @a[scores={item_off=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] item_toggle 0
execute @a[scores={item_on=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] item_toggle 1
#Death coords admin thing
execute @a[scores={death_coord_off=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] death_coord 0
execute @a[scores={death_coord_on=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] death_coord 1
#Death effect (still admin thing :)
execute @a[scores={death_effect_off=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] death_toggle 0
execute @a[scores={death_effect=0},tag=admin] ~~~ scoreboard players set @a[tag=admin] death_toggle 1
#Function execute
tag @a[tag=ban1] add Ban
execute @a[scores={death_effect=0}] ~~~ execute @e[type=lightning_bolt] ~ ~ ~ fill ~-2~-2~-2 ~2~2~2 air 0 replace fire
#End lock
execute @a[scores={end_lock=0}] ~ ~ ~ detect ~~-2~ end_portal 0 tp @p ~-1~1~
execute @a[scores={end_lock=0}] ~ ~ ~ detect ~~-0.1~ end_portal 0 tp @p ~-1~1~
execute @a[scores={end_lock=0}] ~ ~ ~ detect ~~-0.01~ end_portal 0 tp @p ~-1~1~
execute @a[scores={end_lock=0}] ~~~ kill @e[type=eye_of_ender_signal]
#Shulker box/barrel ban(for anti kit)
clear @a[scores={barrel_lock=0}] barrel
clear @a[scores={shulk_lock=0}] shulker_box
clear @a[scores={Shulkbarrel_ban=0}] barrel
clear @a[scores={Shulkbarrel_ban=0}] shulker_box
#Ban asset
execute @a[scores={banned=100..}] ~~~ tag @s add Ban
#Telling player "you are vanished"
title @a[scores={vanish=1},tag=admin] actionbar §l§7You are vanished.
#anti lag
scoreboard players add @a[scores={anti_lag=1..199}] anti_lag 1
execute @a[scores={anti_lag=100}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 5 seconds..."}]}
execute @a[scores={anti_lag=120}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 4 seconds..."}]}
execute @a[scores={anti_lag=140}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 3 seconds..."}]}
execute @a[scores={anti_lag=160}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 2 seconds..."}]}
execute @a[scores={anti_lag=180}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 1 seconds..."}]}
execute @a[scores={anti_lag=200}] ~~~ kill @e[type=!wolf,type=!cat,type=!parrot,type=!pig,type=!cow,type=!sheep,type=!horse,family=!player,tag=!friend]
execute @a[scores={anti_lag=200}] ~~~ kill @e[type=xp_orb]
execute @a[scores={anti_lag=200}] ~~~ kill @e[type=item]
execute @a[scores={anti_lag=200}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Lag cleared!"}]}
execute @a[scores={anti_lag=200}] ~~~ gamerule domobloot true
execute @a[scores={anti_lag=200..}] ~~~ scoreboard players reset @a anti_lag
#I'M MAKING THINGS SO MUCH HARDER THAN THEY SHOULD BE AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH