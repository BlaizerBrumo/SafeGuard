#bridge-file-version: #14
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
tag @a[tag=unflag] remove flagged
gamemode survival @a[tag=unflag]
effect @a[tag=unflag] clear
tellraw @a[tag=unflag] {"rawtext":[{"text":"§6[§eSafeGuard§6] §aFlag was removed!!"}]}
execute  @a[tag=unflag] ~~~ tp @p[tag=unflag] ~ 140 ~
effect @a[tag=unflag] slow_falling 60 0 true
execute @a[tag=unflag] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@a[tag=unflag]"},{"text":" §bwas unflagged! §r"}]}
tag @a[tag=unflag] remove unflag