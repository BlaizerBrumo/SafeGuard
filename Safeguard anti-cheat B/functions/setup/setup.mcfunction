#bridge-file-version: #75
#scoreboard
scoreboard objectives add vanish dummy
scoreboard objectives add welcomer dummy
scoreboard objectives add endnether_toggle dummy
scoreboard objectives add shulkBarrel_lock dummy
scoreboard objectives add auto_mod_toggle dummy
scoreboard objectives add death_toggle dummy
scoreboard objectives add notify dummy
scoreboard objectives add anti_cbe_toggle dummy
scoreboard objectives add death_coord dummy
scoreboard objectives add gmc_toggle dummy
scoreboard objectives add grief_toggle dummy
scoreboard objectives add item_toggle dummy
scoreboard objectives add welcome dummy
scoreboard objectives add setup_success dummy
scoreboard players add @a setup_success 0
#other
function assets/asset
event entity @s safeguard:setup
function assets/asset
tag @s add admin
title @a times 100 100 100
gamerule sendcommandfeedback false
gamerule commandblockoutput false
tag @e[type=npc] add friend
#message
execute @s[scores={setup_success=2}] ~~~ function credit
tellraw @s[scores={setup_success=2}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r Add tag §eadmin§r to all the staff §o/tag NAME add admin§r"}]}
tellraw @s[scores={setup_success=2}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §aSuccessfully setup the anti-cheat!§r"}]}
#errors
tellraw @s[scores={setup_success=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"FATAL ERROR:§r§4 Function §aassets/asset§4 didn't respond, contact §aBlazer#9677§4 or join the discord server for help! §adiscord.gg/JP65Fhk9f6§r"}]}
tellraw @s[scores={setup_success=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"SETUP ERROR: §r§4File §aplayer.json§4 isn't responding, do you have other mods above safeguard?§r"}]}
playsound random.levelup @s[scores={setup_success=2}]
playsound random.anvil_land @s[scores={setup_success=0..1}]
 