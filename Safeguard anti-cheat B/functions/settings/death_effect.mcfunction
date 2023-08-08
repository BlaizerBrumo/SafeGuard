#Toggle the auto mod
scoreboard players add @s[tag=admin] death_toggle 1
scoreboard players set @s[tag=admin,scores={death_toggle=2..}] death_toggle 0
tellraw @s[tag=admin,scores={death_toggle=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Death Effects §l§5turned off! §r"}]}
execute as @s[tag=admin,scores={death_toggle=0}] run scoreboard objectives remove death_effect
execute as @s[tag=admin,scores={death_toggle=0}] run scoreboard objectives add death_effect_off dummy
tellraw @s[tag=admin,scores={death_toggle=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Death Effects §l§5turned on! §r"}]}
execute as @s[tag=admin,scores={death_toggle=1}] run scoreboard objectives add death_effect dummy
execute as @s[tag=admin,scores={death_toggle=1}] run scoreboard objectives remove death_effect_off
playsound note.bass @s[tag=admin] ~~~
#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]
#Notify
execute as @s[scores={death_toggle=1}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={death_toggle=1}]"},{"text":" §bturned on§l§5 Death Effects! §r"}]}
execute as @s[scores={death_toggle=0}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={death_toggle=0}]"},{"text":" §bturned off§l§5 Death Effects §r"}]}