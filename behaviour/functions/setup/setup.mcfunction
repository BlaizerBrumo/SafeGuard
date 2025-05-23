# Add necessary scoreboard objectives
scoreboard objectives add safeguard:vanish dummy
scoreboard objectives add safeguard:notify dummy
scoreboard objectives add safeguard:setup_success dummy

# Ensure players have a default value in safeguard:setup_success
scoreboard players add @a safeguard:setup_success 0

scoreboard players set @a[scores={safeguard:setup_success=0..}] safeguard:gametest_on 0
scoreboard players set @a[scores={safeguard:setup_success=0,safeguard:gametest_on=0}] safeguard:setup_success 2

# Add necessary tags and disable command feedback
tag @s add admin
gamerule sendcommandfeedback false
gamerule commandblockoutput false

# Add tag to NPCs (for future use)
tag @e[type=npc] add safeguard:friend

tellraw @s[scores={safeguard:setup_success=3..}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"SETUP ERROR: §r§4AntiCheat already setup!§r"}]}

playsound random.levelup @s[scores={safeguard:setup_success=2}]
execute as @s[scores={safeguard:setup_success=2}] run function credit
tellraw @s[scores={safeguard:setup_success=2}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r Add tag §eadmin§r to all the staff §o/tag NAME add admin§r"}]}
tellraw @s[scores={safeguard:setup_success=2}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §aSuccessfully setup the anti-cheat!§r"}]}
execute as @s[scores={safeguard:setup_success=2}] run scoreboard players set @s safeguard:setup_success 3
#errors
tellraw @s[scores={safeguard:setup_success=0..1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"SETUP ERROR: §r§4Experiments Required, turn on §7Beta APIs§r"}]}


playsound random.anvil_land @s[scores={safeguard:setup_success=0..1}]

