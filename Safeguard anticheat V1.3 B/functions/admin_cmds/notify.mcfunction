#bridge-file-version: #6
scoreboard players add @s notify 1
scoreboard players set @s[tag=admin,scores={notify=2..}] notify 0
tellraw @s[tag=admin,scores={notify=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§b You will §5no longer§b recieve anticheat notifications!§r"}]}
tellraw @s[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§l§b You will now §5get notified§b by the anticheat!§r"}]}
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin] ~~~
playsound note.bass @s[tag=admin] ~~~