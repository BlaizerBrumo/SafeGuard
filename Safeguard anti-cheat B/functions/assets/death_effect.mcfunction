#bridge-file-version: #25
gamerule mobgriefing false
execute as @s[scores={death_effect=0}] run summon minecraft:lightning_bolt ~ ~3~
execute as @s[scores={death_effect=0}] run playsound random.levelup @s
execute as @s[scores={death_effect=0}] run particle minecraft:totem_particle ~~1~
gamerule mobgriefing true