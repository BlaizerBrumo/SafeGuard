#Toggle the Death Coords
scoreboard players add @s[tag=admin] death_coord 1
scoreboard players set @s[tag=admin,scores={death_coord=2..}] death_coord 0
tellraw @s[tag=admin,scores={death_coord=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Death Coords §l§5turned off! §r"}]}
execute as @s[tag=admin,scores={death_coord=0}] run scoreboard objectives remove death_coord_on
execute as @s[tag=admin,scores={death_coord=0}] run scoreboard objectives add death_coord_off dummy
tellraw @s[tag=admin,scores={death_coord=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Death Coords §l§5turned on! §r"}]}
execute as @s[tag=admin,scores={death_coord=1}] run scoreboard objectives add death_coord_on dummy
execute as @s[tag=admin,scores={death_coord=1}] run scoreboard objectives remove death_coord_off
playsound note.bass @s[tag=admin] ~~~
#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]
#Notify people who turned it on
execute as @s[scores={death_coord=1}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={death_coord=1}]"},{"text":" §bturned on§l§5 Death Coords! §r"}]}
execute as @s[scores={death_coord=0}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={death_coord=0}]"},{"text":" §bturned off§l§5 Death Coords! §r"}]}