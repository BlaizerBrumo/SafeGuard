gamerule mobgriefing false
execute at @s run summon minecraft:lightning_bolt ~ ~3~
execute as @s run playsound random.levelup @s
execute at @s run particle minecraft:totem_particle ~~1~
gamerule mobgriefing true