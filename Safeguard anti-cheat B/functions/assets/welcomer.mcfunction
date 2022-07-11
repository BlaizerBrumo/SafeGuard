#bridge-file-version: #26
#Tag 
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
execute @a[scores={welcome_on=0}] ~~~ scoreboard players set @a[scores={welcomer=3..}] welcomer 2
execute @a[scores={welcome_on=0}] ~~~ execute @a[scores={welcomer=..1}] ~~~ tellraw @a {"rawtext":[{"text":"§e"},{"selector":"@s"},{"text":" §bIs joining for the first time! This realm is protected by §eSafeGuard§b, enjoy your stay!§r"}]}
execute @a[scores={welcome_on=0}] ~~~ scoreboard players add @a welcomer 1
execute @a[scores={welcome_on=0}] ~~~ title @a[scores={welcomer=..1}] title §e§lSafe§6Guard
execute @a[scores={welcome_on=0}] ~~~ title @a[scores={welcomer=..1}] subtitle §l§fProtecting §a24§f/§a7
execute @a[scores={welcome_on=0}] ~~~ title @a[scores={welcomer=..1}] times 20 80 20