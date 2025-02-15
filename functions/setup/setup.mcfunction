scoreboard objectives add safeguard:vanish dummy
scoreboard objectives add safeguard:notify dummy
scoreboard objectives add safeguard:setup_success dummy
scoreboard players add @a safeguard:setup_success 0
#other
function assets/asset
function assets/asset
tag @s add admin
title @a times 100 100 100
gamerule sendcommandfeedback false
gamerule commandblockoutput false
#this isn't really necessary, but if CBE ever is to come back this can be useful.
tag @e[type=npc] add safeguard:friend
#message
execute as @s[scores={safeguard:setup_success=2}] run function credit
tellraw @s[scores={safeguard:setup_success=2}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r Add tag §eadmin§r to all the staff §o/tag NAME add admin§r"}]}
tellraw @s[scores={safeguard:setup_success=2}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §aSuccessfully setup the anti-cheat!§r"}]}
give @s[scores={safeguard:setup_success=2}] safeguard:admin_panel
#errors
tellraw @s[scores={safeguard:setup_success=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"FATAL ERROR:§r§4 Function §aassets/asset§4 didn't respond, contact §aBlazer#9677§4 or join the discord server for help! §adiscord.gg/JP65Fhk9f6§r"}]}

tellraw @s[scores={safeguard:setup_success=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"SETUP ERROR: §r§4Experiments Required, turn on §7Beta APIs§r"}]}
playsound random.levelup @s[scores={safeguard:setup_success=2}]
playsound random.anvil_land @s[scores={safeguard:setup_success=0..1}]
tellraw @s[scores={safeguard:setup_success=3..}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"SETUP ERROR: §r§4AntiCheat already setup!§r"}]}
scoreboard players set @s[scores={safeguard:setup_success=2}] safeguard:setup_success 3