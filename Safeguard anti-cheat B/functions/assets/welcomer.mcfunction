#bridge-file-version: #27
#Tag 
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
execute as @a[scores={welcome_on=0}] run scoreboard players set @a[scores={welcomer=3..}] welcomer 2
execute as @a[scores={welcome_on=0}] run execute as @a[scores={welcomer=..1}] run tellraw @a {"rawtext":[{"text":"§e"},{"selector":"@s"},{"text":" §bIs joining for the first time! This realm is protected by §eSafeGuard§b, enjoy your stay!§r"}]}
execute as @a[scores={welcome_on=0}] run scoreboard players add @a welcomer 1
execute as @a[scores={welcome_on=0}] run title @a[scores={welcomer=..1}] title §e§lSafe§6Guard
execute as @a[scores={welcome_on=0}] run title @a[scores={welcomer=..1}] subtitle §l§fProtecting §a24§f/§a7
execute as @a[scores={welcome_on=0}] run title @a[scores={welcomer=..1}] times 20 80 20