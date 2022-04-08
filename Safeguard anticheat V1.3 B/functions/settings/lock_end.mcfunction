#bridge-file-version: #27
#Toggle the end lock
scoreboard players add @s[tag=admin] endnether_toggle 1
scoreboard players set @s[tag=admin,scores={endnether_toggle=2..}] endnether_toggle 0
tellraw @s[tag=admin,scores={endnether_toggle=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b End lock §l§5turned off! §r"}]}
execute @s[tag=admin,scores={endnether_toggle=0}] ~~~ scoreboard objectives remove end_lock
execute @s[tag=admin,scores={endnether_toggle=0}] ~~~ scoreboard objectives add end_yes dummy
tellraw @s[tag=admin,scores={endnether_toggle=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b End lock §l§5turned on! §r"}]}
execute @s[tag=admin,scores={endnether_toggle=1}] ~~~ scoreboard objectives add end_lock dummy
execute @s[tag=admin,scores={endnether_toggle=1}] ~~~ scoreboard objectives remove end_yes
playsound note.bass @s[tag=admin] ~~~
#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]
#Notify
execute @s[scores={endnether_toggle=0}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={endnether_toggle=1}]"},{"text":" §bturned on§l§5 End Lock! §r"}]}
execute @s[scores={endnether_toggle=1}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={endnether_toggle=0}]"},{"text":" §bturned off§l§5 End Lock! §r"}]}