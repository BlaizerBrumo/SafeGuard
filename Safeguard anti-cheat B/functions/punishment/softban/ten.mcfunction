#bridge-file-version: #1
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
scoreboard objectives add softten dummy
scoreboard players add @a[tag=softban_ten] softten 1
scoreboard players add @a[scores={softten=1..11999}] softten 1
scoreboard players add @a[scores={softten=11999}] softten 1
tag @a[scores={softten=12000}] add softunban
tag @a[scores={softten=11999..}] remove softban_ten
tag @a[scores={softten=1..11999}] add softban
execute @a[scores={softten=1..2}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"selector":"@a[scores={softten=1..2}]"},{"text":" §bwas softbanned for 10 minutes! §r"}]}