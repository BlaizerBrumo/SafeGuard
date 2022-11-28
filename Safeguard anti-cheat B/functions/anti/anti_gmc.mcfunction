tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
#Anti Gamemode creative
execute as @a[scores={gmc_on=0}] run execute as @a [tag=!admin,m=creative] run tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@s[m=creative]"},{"text":" §r§4Was detected being in §l§ccreative!§r"}]}
execute as @a[scores={gmc_on=0}] run execute as @a[tag=!admin,m=creative] run function punishment/warning/gmc_warning
execute as @a[scores={gmc_on=0}] run gamemode survival @a[tag=!admin,m=creative]