#bridge-file-version: #23
execute @a[scores={gmc_on=0}] ~~~ execute @a [m=creative , tag=!admin] ~~~ tellraw @a {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"selector":"@p[m=creative]"},{"text":" §r§4Was detected being in §l§ccreative!§r"}]}
execute @a[scores={gmc_on=0}] ~~~ execute @a[tag=!admin, m=creative, scores={auto_mod_on=0}] ~~~ tag @s add flagged
execute @a[scores={gmc_on=0}] ~~~ gamemode survival @a[tag=!admin,m=creative]