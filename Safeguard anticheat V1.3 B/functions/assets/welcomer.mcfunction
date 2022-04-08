#bridge-file-version: #10
#Tag 
scoreboard players set @a[scores={welcomer=3..}] welcomer 2
execute @a[scores={welcomer=..1}] ~~~ tellraw @a {"rawtext":[{"text":"§e"},{"selector":"@s"},{"text":" §bIs joining for the first time! This realm is protected by §eSafeGuard§b, enjoy your stay!§r"}]}
scoreboard players add @a welcomer 1