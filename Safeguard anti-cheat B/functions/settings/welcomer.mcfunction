#Toggle the Welcomer
scoreboard players add @s[tag=admin] welcome 1
scoreboard players set @s[tag=admin,scores={welcome=2..}] welcome 0
tellraw @s[tag=admin,scores={welcome=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Welcomer §l§5turned off! §r"}]}
execute as @s[tag=admin,scores={welcome=0}] run scoreboard objectives remove welcome_on
execute as @s[tag=admin,scores={welcome=0}] run scoreboard objectives add welcome_off dummy
tellraw @s[tag=admin,scores={welcome=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Welcomer §l§5turned on! §r"}]}
execute as @s[tag=admin,scores={welcome=1}] run scoreboard objectives add welcome_on dummy
execute as @s[tag=admin,scores={welcome=1}] run scoreboard objectives remove welcome_off
playsound note.bass @s[tag=admin] ~~~
#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]
#Notify people who turned it on
execute as @s[scores={welcome=1}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={welcome=1}]"},{"text":" §bturned on§l§5 Welcomer! §r"}]}
execute as @s[scores={welcome=0}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={welcome=0}]"},{"text":" §bturned off§l§5 Welcomer! §r"}]}