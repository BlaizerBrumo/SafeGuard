#bridge-file-version: #9
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
scoreboard objectives add softfive dummy
scoreboard players add @a[tag=softban_five] softfive 1
scoreboard players add @a[scores={softfive=1..5999}] softfive 1
scoreboard players add @a[scores={softfive=5999}] softfive 1
tag @a[scores={softfive=6000}] add softunban
tag @a[scores={softfive=5999..}] remove softban_five
tag @a[scores={softfive=1..5999}] add softban
execute @a[scores={softfive=1..2}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§5§l "},{"selector":"@a[scores={softfive=1..2}]"},{"text":" §bwas softbanned for 5 minutes! §r"}]}