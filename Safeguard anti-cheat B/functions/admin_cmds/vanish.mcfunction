#bridge-file-version: #24
scoreboard players add @s[tag=admin] vanish 1
scoreboard players set @s[tag=admin,scores={vanish=2..}] vanish 0
effect @s[tag=admin,scores={vanish=0}] invisibility 0 0
effect @s[tag=admin,scores={vanish=0}] night_vision 0 0
effect @s[tag=admin,scores={vanish=1}] invisibility 99999 0 true
effect @s[tag=admin,scores={vanish=1}] night_vision 99999 10 true
tellraw @s[tag=admin,scores={vanish=1}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §7Poof! You vanished!§r"}]}
tellraw @s[tag=admin,scores={vanish=0}] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §7Poof! You re-appeared!§r"}]}
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin] ~~~
playsound note.bass @s[tag=admin] ~~~
#notify
execute @s[scores={vanish=1}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={vanish=1}]"},{"text":" §bvanished!§r"}]}
execute @s[scores={vanish=0}] ~~~ tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[scores={vanish=0}]"},{"text":" §bre-appeared from vanish!§r"}]}