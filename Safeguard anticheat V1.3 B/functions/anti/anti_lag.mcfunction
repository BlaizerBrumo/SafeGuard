#bridge-file-version: #35
#PUT THIS IN A REPEATING COMMAND BLOCK ONLY WITH A TICK PER SECOND DELAY
#Killing the entities and stuff idk
gamerule domobloot false
scoreboard objectives add anti_lag dummy
scoreboard players add @r[tag=admin] anti_lag 1
execute @a[scores={anti_lag=1}] ~~~ tellraw @a[scores={anti_lag=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§a Ground items cleared in 10 seconds..."}]}