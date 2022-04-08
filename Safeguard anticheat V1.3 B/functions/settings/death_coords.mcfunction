#bridge-file-version: #2
#Toggle the Death Coords
scoreboard players add @s[tag=admin] death_coord 1
scoreboard players set @s[tag=admin,scores={death_coord=2..}] death_coord 0
tellraw @s[tag=admin,scores={death_coord=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Death Coords §l§5turned off! §r"}]}
execute @s[tag=admin,scores={death_coord=0}] ~~~ scoreboard objectives remove death_coord_on
execute @s[tag=admin,scores={death_coord=0}] ~~~ scoreboard objectives add death_coord_off dummy
tellraw @s[tag=admin,scores={death_coord=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Death Coords §l§5turned on! §r"}]}
execute @s[tag=admin,scores={death_coord=1}] ~~~ scoreboard objectives add death_coord_on dummy
execute @s[tag=admin,scores={death_coord=1}] ~~~ scoreboard objectives remove death_coord_off
playsound note.bass @s[tag=admin] ~~~
#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]
#Notify people who turned it on
execute @s[scores={death_coord=1}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={death_coord=1}]"},{"text":" §bturned on§l§5 Death Coords! §r"}]}
execute @s[scores={death_coord=0}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={death_coord=0}]"},{"text":" §bturned off§l§5 Death Coords! §r"}]}