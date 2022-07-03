#bridge-file-version: #2
scoreboard objectives add softtwen dummy
scoreboard players add @a[tag=softban_twen] softtwen 1
scoreboard players add @a[scores={softtwen=1..23999}] softtwen 1
scoreboard players add @a[scores={softtwen=23999}] softtwen 1
tag @a[scores={softtwen=24000}] add softunban
tag @a[scores={softtwen=23999..}] remove softban_twen
tag @a[scores={softtwen=1..23999}] add softban
execute @a[scores={softtwen=1..2}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"selector":"@a[scores={softtwen=1..2}]"},{"text":" §bwas softbanned for 20 minutes! §r"}]}