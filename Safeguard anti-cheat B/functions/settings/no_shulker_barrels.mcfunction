#bridge-file-version: #0
#14
#Toggle the shulker and barrel ban
scoreboard players add @s[tag=admin] shulkBarrel_lock 1
scoreboard players set @s[tag=admin,scores={shulkBarrel_lock=4..}] shulkBarrel_lock 0
tellraw @s[tag=admin,scores={shulkBarrel_lock=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Shulker box/Barrel ban §l§5turned off!§r"}]}
execute as @s[tag=admin,scores={shulkBarrel_lock=0}] run scoreboard objectives remove Shulkbarrel_ban
execute as @s[tag=admin,scores={shulkBarrel_lock=0}] run scoreboard objectives add shulkbarrel_yes dummy
tellraw @s[tag=admin,scores={shulkBarrel_lock=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Barrel Ban §l§5turned on!§r"}]}
execute as @s[tag=admin,scores={shulkBarrel_lock=1}] run scoreboard objectives add barrel_lock dummy
execute as @s[tag=admin,scores={shulkBarrel_lock=1}] run scoreboard objectives remove shulkbarrel_yes
tellraw @s[tag=admin,scores={shulkBarrel_lock=2}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Shulker box Ban §l§5turned on!§r"}]}
execute as @s[tag=admin,scores={shulkBarrel_lock=2}] run scoreboard objectives add shulk_lock dummy
execute as @s[tag=admin,scores={shulkBarrel_lock=2}] run scoreboard objectives remove barrel_lock
tellraw @s[tag=admin,scores={shulkBarrel_lock=3}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§b Shulker box/Barrel Ban §l§5turned on!§r"}]}
execute as @s[tag=admin,scores={shulkBarrel_lock=3}] run scoreboard objectives add Shulkbarrel_ban dummy
execute as @s[tag=admin,scores={shulkBarrel_lock=3}] run scoreboard objectives remove shulk_lock
 
playsound note.bass @s[tag=admin] ~~~
#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]
#Notify
execute as @s[scores={shulkBarrel_lock=3}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={shulkBarrel_lock=3}]"},{"text":" §bturned on§l§5 Shulker box/Barrel Ban! §r"}]}
execute as @s[scores={shulkBarrel_lock=2}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={shulkBarrel_lock=2}]"},{"text":" §bturned on§l§5 Shulker box Ban! §r"}]}
execute as @s[scores={shulkBarrel_lock=1}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={shulkBarrel_lock=1}]"},{"text":" §bturned on§l§5 Barrel Ban! §r"}]}
execute as @s[scores={shulkBarrel_lock=0}] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={shulkBarrel_lock=0}]"},{"text":" §bturned off§l§5 Shulker/Barrel ban §r"}]}