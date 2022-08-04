#bridge-file-version: #26
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
#Anti Gamemode creative
execute @a[scores={gmc_on=0}] ~~~ execute @a [m=creative , tag=!admin] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@p[m=creative]"},{"text":" §r§4Was detected being in §l§ccreative!§r"}]}
execute @a[scores={gmc_on=0}] ~~~ execute @a[tag=!admin, m=creative] ~~~ function punishment/warning/gmc_warning
execute @a[scores={gmc_on=0}] ~~~ gamemode survival @a[tag=!admin,m=creative]