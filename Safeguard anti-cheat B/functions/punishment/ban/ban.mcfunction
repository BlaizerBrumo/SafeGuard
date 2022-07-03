#bridge-file-version: #12
scoreboard players add @a[tag=ban,tag=!admin] banned 1
tag @a[scores={banned=100..}] add Ban
execute @a[scores={banned=99}] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":"§r got banned!"}]}
execute @a[scores={banned=1}] ~~~ tag @s remove admin
execute @a[tag=Ban] ~~~ tag @s remove admin