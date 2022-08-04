#bridge-file-version: #5
replaceitem entity @s slot.weapon.mainhand 0 air
tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s"},{"text":" §r§4Was detected having an §l§cILLEGAL ITEM!§r"}]}