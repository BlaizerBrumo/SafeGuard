#bridge-file-version: #2
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
scoreboard objectives add softhour dummy
scoreboard players add @a[tag=softban_hour] softhour 1
scoreboard players add @a[scores={softhour=1..71999}] softhour 1
scoreboard players add @a[scores={softhour=71999}] softhour 1
tag @a[scores={softhour=72000}] add softunban
tag @a[scores={softhour=71999..}] remove softban_hour
tag @a[scores={softhour=1..71999}] add softban
execute @a[scores={softhour=1..2}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"selector":"@a[scores={softhour=1..2}]"},{"text":" §bwas softbanned for 60 minutes! §r"}]}