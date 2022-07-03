#bridge-file-version: #22
gamerule mobgriefing false
execute @s[scores={death_effect=0}] ~~~ summon minecraft:lightning_bolt ~ ~3~
execute @s[scores={death_effect=0}] ~~~ playsound random.levelup @s
execute @s[scores={death_effect=0}] ~~~ particle minecraft:totem_particle ~~1~
gamerule mobgriefing true