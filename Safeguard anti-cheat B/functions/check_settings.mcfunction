tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§6§l "},{"text":"WARNING: §r§4This function is deprecated and is no longer updated, expect broken behavior and outdated information§r"}]}

#deny
tellraw @s[tag=!admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§r §4You need admin tag to run this!§r"}]}
playsound random.anvil_land @s[tag=!admin]
#list all modules nyah
tellraw @s[tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§5Below are listed modules which are on§r"}]}
tellraw @s[scores={anti_cbe_on=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bAnti CBE§r"}]}
tellraw @s[scores={gmc_on=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bAnti GMC§r"}]}
tellraw @s[scores={grief_on=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bAnti Greif§r"}]}
tellraw @s[scores={items_on=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bAnti Items§r"}]}
tellraw @s[scores={auto_mod_on=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bAuto Mod§r"}]}
tellraw @s[scores={nocrash_on=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bAnti Crasher§r"}]}
tellraw @s[scores={32k_on=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bAnti 32k§r"}]}
tellraw @s[scores={namespoof_on=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bAnti Namespoof§r"}]}
tellraw @s[scores={death_coord_on=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bDeath Coords§r"}]}
tellraw @s[scores={death_effect=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bDeath Effects§r"}]}
tellraw @s[scores={end_lock=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bEnd Lock§r"}]}
tellraw @s[scores={shulk_lock=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bShulker Box Ban§r"}]}
tellraw @s[scores={barrel_lock=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bBarrel Ban§r"}]}
tellraw @s[scores={Shulkbarrel_ban=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bShulk/Barrel ban§r"}]}
tellraw @s[scores={welcome_on=0},tag=admin] {"rawtext":[{"text":"§6[§eSafeGuard§6]§l "},{"text":"§bWelcomer§r"}]}
#notify ig
execute as @s[tag=admin] run tellraw @a[tag=admin,scores={notify=1}] {"rawtext":[{"text":"§6[§eSafeGuard Notify§6]§5§l "},{"selector":"@s[tag=admin]"},{"text":" §bChecked turned on modules! §r"}]}