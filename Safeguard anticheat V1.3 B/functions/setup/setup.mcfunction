#bridge-file-version: #45
#scoreboard
scoreboard objectives add vanish dummy
scoreboard objectives add welcomer dummy
scoreboard objectives add endnether_toggle dummy
scoreboard objectives add shulkBarrel_lock dummy
scoreboard objectives add auto_mod_toggle dummy
scoreboard objectives add death_toggle dummy
scoreboard objectives add notify dummy
scoreboard objectives add anti_cbe_toggle dummy
scoreboard objectives add banned dummy
scoreboard objectives add death_coord dummy
scoreboard objectives add gmc_toggle dummy
scoreboard objectives add grief_toggle dummy
scoreboard objectives add item_toggle dummy
#other
tag @s add admin
title @a times 100 100 100
gamerule sendcommandfeedback false
gamerule commandblockoutput false
#message
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r Add tag §eadmin§r to all the staff §o/tag NAME add admin§r"}]}
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §aSuccessfully setup the anti-cheat!§r"}]}
playsound beacon.activate @s ~~~ 100