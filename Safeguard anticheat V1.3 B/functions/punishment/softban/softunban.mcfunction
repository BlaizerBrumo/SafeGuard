#bridge-file-version: #13
tag @a[tag=softunban] remove softban
tag @a[tag=softunban] remove softban_five
tag @a[tag=softunban] remove softban_ten
tag @a[tag=softunban] remove softban_twen
tag @a[tag=softunban] remove softban_hour
gamemode survival @a[tag=softunban]
effect @a[tag=softunban] clear
tellraw @a[tag=softunban] {"rawtext":[{"text":"§6[§eSafeGuard§6] §aSoftban was removed!!"}]}
execute  @a[tag=softunban] ~~~ tp @p[tag=softunban] ~ 140 ~
effect @a[tag=softunban] slow_falling 60 0 true
execute @a[tag=softunban] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@a[tag=softunban]"},{"text":" §bwas softunbanned! §r"}]}
scoreboard players reset @a[tag=softunban,scores={softfive=1..}] softfive
scoreboard players reset @a[tag=softunban,scores={softten=1..}] softten
scoreboard players reset @a[tag=softunban,scores={softtwen=1..}] softtwen
scoreboard players reset @a[tag=softunban,scores={softhour=1..}] softhour
tag @a[tag=softunban] remove softunban
tag @a[tag=admin,tag=softban] add softunban