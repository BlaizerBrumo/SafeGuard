#unfreezes person
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
tag @a[tag=unfreeze] remove freeze
inputpermission set @a[tag=unfreeze] movement enabled
tellraw @a[tag=unfreeze] {"rawtext":[{"text":"§6[§eSafeGuard§6] §aFreeze was removed!!"}]}
execute as @a[tag=unfreeze] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@a[tag=unfreeze]"},{"text":" §bwas unfreezed! §r"}]}
tag @a[tag=unfreeze] remove unfreeze