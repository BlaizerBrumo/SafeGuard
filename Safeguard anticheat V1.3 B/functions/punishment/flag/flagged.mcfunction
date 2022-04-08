#bridge-file-version: #14
title @a[tag=flagged] times 1 1 1
gamemode adventure @a[tag=flagged]
effect @a[tag=flagged] slowness 1000 10 true
effect @a[tag=flagged] blindness 1000 10 true
title @a[tag=flagged] title §4You have been flagged!§r
title @a[tag=flagged] subtitle §4Contact your admin for appeal.§r
scoreboard players add @a[tag=flagged] flagged 0
execute  @a[tag=flagged] ~~~ tp @p[tag=flagged,c=1] ~ 1000 ~