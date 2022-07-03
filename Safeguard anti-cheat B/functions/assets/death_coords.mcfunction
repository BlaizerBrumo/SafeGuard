#bridge-file-version: #2
execute @s[scores={death_coord_on=0}] ~~~ tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §eYou died at the Coordinates on the next line"}]}
execute @s[scores={death_coord_on=0}] ~~~ gamerule sendcommandfeedback true
execute @s[scores={death_coord_on=0}] ~~~ execute @s ~ ~ ~ tp ~ ~ ~
execute @s[scores={death_coord_on=0}] ~~~ gamerule sendcommandfeedback false