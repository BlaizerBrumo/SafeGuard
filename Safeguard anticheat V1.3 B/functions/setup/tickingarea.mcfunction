#bridge-file-version: #3
#setup
tickingarea add ~-10 ~-10 ~-10 ~10 ~10 ~10
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §aSuccessfully setup the tickingarea!§r"}]}
#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]