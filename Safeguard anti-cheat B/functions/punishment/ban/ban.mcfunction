#bridge-file-version: #13
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
scoreboard players add @a[tag=ban,tag=!admin] banned 1
tag @a[scores={banned=100..}] add Ban
execute @a[scores={banned=99}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":"§r got banned!"}]}
execute @a[scores={banned=1}] ~~~ tag @s remove admin
execute @a[tag=Ban] ~~~ tag @s remove admin