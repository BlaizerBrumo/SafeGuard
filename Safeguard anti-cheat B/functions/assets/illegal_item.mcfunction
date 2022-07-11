#bridge-file-version: #3
execute @s[scores={auto_mod_on=0}] ~~~ tag @s add flagged
replaceitem entity @s slot.weapon.mainhand 0 air
tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having an §l§cILLEGAL ITEM!§r"}]}