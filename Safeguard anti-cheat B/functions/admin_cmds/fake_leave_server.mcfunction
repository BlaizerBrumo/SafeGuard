#bridge-file-version: #1
execute as @s[tag=admin] run tellraw @a {"rawtext":[{"text":"§e"},{"selector":"@s"},{"text":" left the server"}]}
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§a Fake left success!"}]}
playsound random.levelup @s[tag=admin]
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!"}]}
playsound random.anvil_land @s[tag=!admin]
#notify
tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s"},{"text":" §bfake left!§r"}]}