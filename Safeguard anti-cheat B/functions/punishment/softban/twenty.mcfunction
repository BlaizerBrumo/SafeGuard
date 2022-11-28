#bridge-file-version: #4
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
scoreboard objectives add softtwen dummy
scoreboard players add @a[tag=softban_twen] softtwen 1
scoreboard players add @a[scores={softtwen=1..23999}] softtwen 1
scoreboard players add @a[scores={softtwen=23999}] softtwen 1
tag @a[scores={softtwen=24000}] add softunban
tag @a[scores={softtwen=23999..}] remove softban_twen
tag @a[scores={softtwen=1..23999}] add softban
execute as @a[scores={softtwen=1..2}] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"selector":"@a[scores={softtwen=1..2}]"},{"text":" §bwas softbanned for 20 minutes! §r"}]}