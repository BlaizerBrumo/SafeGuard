#bridge-file-version: #8
tellraw @a[tag=echest_unban] {"rawtext":[{"text":"§6[§eSafeGuard§6] §aEchest ban was removed!!"}]}
execute @a[tag=echest_unban] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@a[tag=echest_unban]"},{"text":"'s §benderchest ban was removed! §r"}]}
tag @a[tag=echest_unban] remove echest_ban
tag @a[tag=echest_unban] remove echest_unban