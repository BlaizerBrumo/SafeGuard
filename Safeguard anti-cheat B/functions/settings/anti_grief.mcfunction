#Toggle the Anti grief
scoreboard players add @s[tag=admin] grief_toggle 1
scoreboard players set @s[tag=admin,scores={grief_toggle=2..}] grief_toggle 0
tellraw @s[tag=admin,scores={grief_toggle=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Anti grief §l§5turned off! §r"}]}
execute as @s[tag=admin,scores={grief_toggle=0}] run scoreboard objectives remove grief_on
execute as @s[tag=admin,scores={grief_toggle=0}] run scoreboard objectives add grief_off dummy
execute as @s[tag=admin,scores={grief_toggle=0}] run gamerule tntexplodes true
execute as @s[tag=admin,scores={grief_toggle=0}] run gamerule respawnblocksexplode true
tellraw @s[tag=admin,scores={grief_toggle=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Anti grief §l§5turned on! §r"}]}
execute as @s[tag=admin,scores={grief_toggle=1}] run scoreboard objectives add grief_on dummy
execute as @s[tag=admin,scores={grief_toggle=1}] run scoreboard objectives remove grief_off
playsound note.bass @s[tag=admin] ~~~
#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]
#Notify people who turned it on
execute as @s[scores={grief_toggle=1}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={grief_toggle=1}]"},{"text":" §bturned on§l§5 Anti grief! §r"}]}
execute as @s[scores={grief_toggle=0}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={grief_toggle=0}]"},{"text":" §bturned off§l§5 Anti grief! §r"}]}