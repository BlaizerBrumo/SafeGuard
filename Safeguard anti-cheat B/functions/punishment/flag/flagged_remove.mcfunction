tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
tag @a[tag=unflag] remove flagged
gamemode survival @a[tag=unflag]
inputpermission set @a[tag=unflag] movement enabled
inputpermission set @a[tag=unflag] camera enabled
tellraw @a[tag=unflag] {"rawtext":[{"text":"§6[§eSafeGuard§6] §aFlag was removed!!"}]}
execute as @a[tag=unflag] run tp @p[tag=unflag] ~ 140 ~
effect @a[tag=unflag] slow_falling 60 0 true
execute as @a[tag=unflag] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@a[tag=unflag]"},{"text":" §bwas unflagged! §r"}]}
tag @a[tag=unflag] remove unflag