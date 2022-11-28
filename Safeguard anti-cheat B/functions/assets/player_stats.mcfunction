#bridge-file-version: #77
tellraw @s {"rawtext":[{"text":"§6[§eSafeGuard§6]§r§c§l "},{"text":"ERROR: §r§4This function shouldn't be ran manually§r"}]}
execute as @a[tag=stats] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Admin §brequested stats of§5 "}, {"selector": "@s"}]}
execute as @a[tag=stats] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§e§l "}, {"text": "--------§6Warnings§e---------"}]}
execute as @a[tag=stats] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Warnings: §b§e"},{"score":{"name": "@s","objective": "warning"}}]}
execute as @a[tag=stats] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Illegal Item Warnings: §b§e"},{"score":{"name": "@s","objective": "ill_warning"}}]}
execute as @a[tag=stats] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "CBE Warnings: §b§e"},{"score":{"name": "@s","objective": "cbe_warning"}}]}
execute as @a[tag=stats] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode Warnings: §b§e"},{"score":{"name": "@s","objective": "gmc_warning"}}]}
execute as @a[tag=stats] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Grief Warnings: §b§e"},{"score":{"name": "@s","objective": "grief_warning"}}]}
execute as @a[tag=stats] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§e§l "}, {"text": "--------§6Permissions§e---------"}]}
execute as @a[tag=stats,m=creative] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode: §aCREATIVE"}]}
execute as @a[tag=stats,m=survival] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode: §aSURVIVAL"}]}
execute as @a[tag=stats,m=adventure] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode: §aADVENTURE"}]}
#execute as @a[tag=stats,m=spectator] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Gamemode: §aSPECTATOR"}]}
execute as @a[tag=stats,tag=admin] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Admin Tag: §aTRUE"}]}
execute as @a[tag=stats,tag=!admin] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Admin Tag: §4FALSE"}]}
execute as @a[tag=stats,tag=!freeze] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Frozen: §4FALSE"}]}
execute as @a[tag=stats,tag=freeze] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Frozen: §aTRUE"}]}
execute as @a[tag=stats,tag=!inv_lock] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "INV Lock: §4FALSE"}]}
execute as @a[tag=stats,tag=inv_lock] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "INV Lock: §aTRUE"}]}
execute as @a[tag=stats,tag=!echest_ban] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Echest Ban: §4FALSE"}]}
execute as @a[tag=stats,tag=echest_ban] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Echest Ban: §aTRUE"}]}
execute as @a[tag=stats,tag=!flagged] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Flagged: §4FALSE"}]}
execute as @a[tag=stats,tag=flagged] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Flagged: §aTRUE"}]}
execute as @a[tag=stats] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§e§l "}, {"text": "--------§6Equipment§e---------"}]}
#Helmet
execute as @a[tag=stats,hasitem={location=slot.armor.head,item=chainmail_helmet,quantity=!1}] run execute as @s[hasitem={location=slot.armor.head,item=diamond_helmet,quantity=!1}] run execute as @s[hasitem={location=slot.armor.head,item=leather_helmet,quantity=!1}] run execute as @s[hasitem={location=slot.armor.head,item=golden_helmet,quantity=!1}] run execute as @s[hasitem={location=slot.armor.head,item=turtle_helmet,quantity=!1}] run execute as @s[hasitem={location=slot.armor.head,item=netherite_helmet,quantity=!1}] run execute as @s[hasitem={location=slot.armor.head,item=iron_helmet,quantity=!1}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §4NONE"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.head,item=chainmail_helmet}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aCHAINMAIL"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.head,item=diamond_helmet}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aDIAMOND"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.head,item=golden_helmet}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aGOLDEN"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.head,item=iron_helmet}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aIRON"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.head,item=turtle_helmet}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aTURTLE"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.head,item=leather_helmet}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aLEATHER"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.head,item=netherite_helmet}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Helmet: §aNETHERITE"}]}
#Chesplate
execute as @a[tag=stats,hasitem={location=slot.armor.chest,item=chainmail_chestplate,quantity=!1}] run execute as @s[hasitem={location=slot.armor.chest,item=elytra,quantity=!1}] run execute as @s[hasitem={location=slot.armor.chest,item=diamond_chestplate,quantity=!1}] run execute as @s[hasitem={location=slot.armor.chest,item=leather_chestplate,quantity=!1}] run execute as @s[hasitem={location=slot.armor.chest,item=golden_chestplate,quantity=!1}] run execute as @s[hasitem={location=slot.armor.chest,item=netherite_chestplate,quantity=!1}] run execute as @s[hasitem={location=slot.armor.chest,item=iron_chestplate,quantity=!1}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §4NONE"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.chest,item=chainmail_chestplate}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aCHAINMAIL"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.chest,item=golden_chestplate}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aGOLDEN"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.chest,item=netherite_chestplate}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aNETHERITE"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.chest,item=diamond_chestplate}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aDIAMOND"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.chest,item=leather_chestplate}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aLEATHER"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.chest,item=iron_chestplate}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aIRON"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.chest,item=elytra}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Chestplate: §aELYTRA"}]}
#Leggings
execute as @a[tag=stats,hasitem={location=slot.armor.legs,item=chainmail_leggings,quantity=!1}] run execute as @s[hasitem={location=slot.armor.legs,item=diamond_leggings,quantity=!1}] run execute as @s[hasitem={location=slot.armor.legs,item=leather_leggings,quantity=!1}] run execute as @s[hasitem={location=slot.armor.legs,item=golden_leggings,quantity=!1}] run execute as @s[hasitem={location=slot.armor.legs,item=netherite_leggings,quantity=!1}] run execute as @s[hasitem={location=slot.armor.legs,item=iron_leggings,quantity=!1}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §4NONE"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.legs,item=chainmail_leggings}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aCHAINMAIL"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.legs,item=golden_leggings}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aGOLDEN"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.legs,item=netherite_leggings}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aNETHERITE"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.legs,item=diamond_leggings}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aDIAMOND"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.legs,item=leather_leggings}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aLEATHER"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.legs,item=iron_leggings}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Leggings: §aIRON"}]}
#Feet
execute as @a[tag=stats,hasitem={location=slot.armor.feet,item=chainmail_boots,quantity=!1}] run execute as @s[hasitem={location=slot.armor.feet,item=diamond_boots,quantity=!1}] run execute as @s[hasitem={location=slot.armor.feet,item=leather_boots,quantity=!1}] run execute as @s[hasitem={location=slot.armor.feet,item=golden_boots,quantity=!1}] run execute as @s[hasitem={location=slot.armor.feet,item=netherite_boots,quantity=!1}] run execute as @s[hasitem={location=slot.armor.feet,item=iron_boots,quantity=!1}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §4NONE"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.feet,item=chainmail_boots}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aCHAINMAIL"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.feet,item=golden_boots}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aGOLDEN"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.feet,item=netherite_boots}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aNETHERITE"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.feet,item=diamond_boots}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aDIAMOND"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.feet,item=leather_boots}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aLEATHER"}]}
execute as @a[tag=stats,hasitem={location=slot.armor.feet,item=iron_boots}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Boots: §aIRON"}]}
execute as @a[tag=stats,hasitem={item=shulker_box,data=-1}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Shulker Box Present: §aTRUE"}]}
execute as @a[tag=stats,hasitem={item=undyed_shulker_box,data=-1}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Shulker Box Present: §aTRUE"}]}
execute as @a[tag=stats,hasitem={item=shulker_box,data=-1,quantity=!1}] run execute as @s[tag=stats,hasitem={item=undyed_shulker_box,data=-1,quantity=!1}] run tellraw @a[tag=admin] {"rawtext": [{"text": "§6[§eSafeGuard§6]§r§5§l "}, {"text": "Shulker Box Present: §4FALSE"}]}
#remove tag
tag @a[tag=stats] remove stats