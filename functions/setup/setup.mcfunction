# Add necessary scoreboard objectives
scoreboard objectives add safeguard:vanish dummy
scoreboard objectives add safeguard:notify dummy
scoreboard objectives add safeguard:setup_success dummy

# Ensure players have a default value in safeguard:setup_success
scoreboard players add @a safeguard:setup_success 0

# Add necessary tags and disable command feedback
tag @s add admin
gamerule sendcommandfeedback false
gamerule commandblockoutput false

# SUCCESSFUL SETUP
execute if score @s safeguard:gametest_on matches 0 run execute if score @s safeguard:setup_success matches 0 run function credit
execute if score @s safeguard:gametest_on matches 0 run execute if score @s safeguard:setup_success matches 0 run tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r Add tag §eadmin§r to all the staff §o/tag NAME add admin§r"}]}
execute if score @s safeguard:gametest_on matches 0 run execute if score @s safeguard:setup_success matches 0 run tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §aSuccessfully setup the anti-cheat!§r"}]}
execute if score @s safeguard:gametest_on matches 0 run execute if score @s safeguard:setup_success matches 0 run give @s safeguard:admin_panel
execute if score @s safeguard:gametest_on matches 0 run execute if score @s safeguard:setup_success matches 0 run playsound random.levelup @s
execute if score @s safeguard:gametest_on matches 0 run execute if score @s safeguard:setup_success matches 0 run scoreboard players set @s safeguard:setup_success 1

# Add tag to NPCs (for future use)
tag @e[type=npc] add safeguard:friend

# ERRORS
execute if score @s safeguard:setup_success matches 0 run tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"SETUP ERROR: §r§4Experiments Required, turn on §7Beta APIs§r"}]}
execute if score @s safeguard:setup_success matches 0 run playsound random.anvil_land @s

execute if score @s safeguard:setup_success matches 2.. run tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"SETUP ERROR: §r§4AntiCheat already setup!§r"}]}
execute if score @s safeguard:setup_success matches 2.. run playsound random.anvil_land @s

# Set the success score to prevent re-running setup
execute if score @s safeguard:setup_success matches 1 run scoreboard players set @s safeguard:setup_success 2
