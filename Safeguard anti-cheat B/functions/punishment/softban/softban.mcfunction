#bridge-file-version: #6
title @a[tag=softban] times 1 1 1
gamemode adventure @a[tag=softban]
effect @a[tag=softban] slowness 1000 10 true
effect @a[tag=softban] blindness 1000 10 true
title @a[tag=softban] title §4You have been softbanned!§r
scoreboard players add @a[tag=softban] softban 0
execute  @a[tag=softban] ~~~ tp @p[tag=softban,c=1] ~ 1000 ~