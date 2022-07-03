#bridge-file-version: #9
#Toggle the auto mod
scoreboard players add @s[tag=admin] anti_cbe_toggle 1
scoreboard players set @s[tag=admin,scores={anti_cbe_toggle=2..}] anti_cbe_toggle 0
tellraw @s[tag=admin,scores={anti_cbe_toggle=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Anti CBE §l§5turned on! §r"}]}
execute @s[tag=admin,scores={anti_cbe_toggle=0}] ~~~ scoreboard objectives remove anti_cbe_off
execute @s[tag=admin,scores={anti_cbe_toggle=0}] ~~~ scoreboard objectives add anti_cbe_on dummy
tellraw @s[tag=admin,scores={anti_cbe_toggle=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Anti CBE §l§5turned off! §r"}]}
execute @s[tag=admin,scores={anti_cbe_toggle=1}] ~~~ scoreboard objectives add anti_cbe_off dummy
execute @s[tag=admin,scores={anti_cbe_toggle=1}] ~~~ scoreboard objectives remove anti_cbe_on
playsound note.bass @s[tag=admin] ~~~
#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]
#Notify people who turned it on
execute @s[scores={anti_cbe_toggle=0}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={anti_cbe_toggle=0}]"},{"text":" §bturned on§l§5 Anti CBE! §r"}]}
execute @s[scores={anti_cbe_toggle=1}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={anti_cbe_toggle=1}]"},{"text":" §bturned off§l§5 Anti CBE! §r"}]}