#bridge-file-version: #8
##execute @s[scores={death_coord_on=0}] ~~~ tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §eYou died at the Coordinates on the next line"}]}
execute as @a[scores={death_coord_on=0}] run gamerule doimmediaterespawn true
execute as @a[scores={death_coord_off=0}] run gamerule doimmediaterespawn false
execute as @s[scores={death_coord_on=0}] run tag @s add death_coord