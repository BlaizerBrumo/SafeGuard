tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
tellraw @a[tag=echest_unban] {"rawtext":[{"text":"§6[§eSafeGuard§6] §aEchest ban was removed!!"}]}
execute as @a[tag=echest_unban] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@a[tag=echest_unban]"},{"text":"'s §benderchest ban was removed! §r"}]}
tag @a[tag=echest_unban] remove echest_ban
tag @a[tag=echest_unban] remove echest_unban