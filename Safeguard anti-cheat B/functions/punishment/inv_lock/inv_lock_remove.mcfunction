#bridge-file-version: #5
tellraw @a[tag=inv_unlock] {"rawtext":[{"text":"§6[§eSafeGuard§6] §aInventory lock was removed!!"}]}
clear @a[tag=inv_unlock]
execute @a[tag=inv_unlock] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@a[tag=inv_unlock]"},{"text":"'s §binventory was unlocked! §r"}]}
tag @a[tag=inv_unlock] remove inv_lock
tag @a[tag=inv_unlock] remove inv_unlock