#bridge-file-version: #6
#Toggle the auto mod
scoreboard players add @s[tag=admin] death_toggle 1
scoreboard players set @s[tag=admin,scores={death_toggle=2..}] death_toggle 0
tellraw @s[tag=admin,scores={death_toggle=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Death Effects §l§5turned off! §r"}]}
execute @s[tag=admin,scores={death_toggle=0}] ~~~ scoreboard objectives remove death_effect
execute @s[tag=admin,scores={death_toggle=0}] ~~~ scoreboard objectives add death_effect_off dummy
tellraw @s[tag=admin,scores={death_toggle=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Death Effects §l§5turned on! §r"}]}
execute @s[tag=admin,scores={death_toggle=1}] ~~~ scoreboard objectives add death_effect dummy
execute @s[tag=admin,scores={death_toggle=1}] ~~~ scoreboard objectives remove death_effect_off
playsound note.bass @s[tag=admin] ~~~
#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]
#Notify
execute @s[scores={death_toggle=1}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={death_toggle=1}]"},{"text":" §bturned on§l§5 Death Effects! §r"}]}
execute @s[scores={death_toggle=0}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={death_toggle=0}]"},{"text":" §bturned off§l§5 Death Effects §r"}]}