tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 0 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 1 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 2 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 3 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 4 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 5 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 6 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 7 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 8 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 9 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 10 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 11 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 12 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 13 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 14 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 15 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 16 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 17 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 18 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 19 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 20 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 21 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 22 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 23 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 24 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 25 air
replaceitem entity @a[tag=!admin,tag=echest_wipe] slot.enderchest 26 air
tellraw @a[tag=!admin,tag=echest_wipe] {"rawtext":[{"text":"§4"},{"text":"§6[§eSafeGuard§6]§4 Your enderchest was wiped by admin"}]}
execute as @a[tag=echest_wipe] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[tag=echest_wipe]"},{"text":"'s §benderchest was wiped! §r"}]}
tag @a[tag=echest_wipe] remove echest_wipe