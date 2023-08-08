tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}

scoreboard objectives add safeguard:cps dummy
scoreboard objectives add safeguard:cpstimer dummy
scoreboard objectives add safeguard:finalcps dummy
scoreboard players add @a[scores={safeguard:cps=1..}] safeguard:cpstimer 1